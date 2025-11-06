'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface TeamMember {
  id: string
  auth_id: string
  email: string
  role: 'owner' | 'manager' | 'staff'
  can_manage_team: boolean
  can_view_financials: boolean
  can_post_shifts: boolean
  can_manage_applicants: boolean
  can_edit_restaurant: boolean
  last_active: string | null
  created_at: string
}

interface Invitation {
  id: string
  email: string
  role: string
  status: string
  created_at: string
  expires_at: string
}

interface CurrentUserAccess {
  restaurant_id: string
  restaurant_name: string
  role: string
  can_manage_team: boolean
  can_view_financials: boolean
  can_post_shifts: boolean
  can_manage_applicants: boolean
  can_edit_restaurant: boolean
}

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [restaurants, setRestaurants] = useState<CurrentUserAccess[]>([])
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('')
  const [currentAccess, setCurrentAccess] = useState<CurrentUserAccess | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Invite modal state
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'manager' | 'staff'>('manager')
  const [invitePermissions, setInvitePermissions] = useState({
    can_manage_team: false,
    can_view_financials: false,
    can_post_shifts: true,
    can_manage_applicants: true,
    can_edit_restaurant: false,
  })
  const [isInviting, setIsInviting] = useState(false)

  const router = useRouter()

  useEffect(() => {
    loadRestaurants()
  }, [])

  useEffect(() => {
    if (selectedRestaurant) {
      loadTeamData()
    }
  }, [selectedRestaurant])

  const loadRestaurants = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Get all restaurants user has access to
      const { data: access, error: accessError } = await supabase
        .from('restaurant_users')
        .select(`
          restaurant_id,
          role,
          can_manage_team,
          can_view_financials,
          can_post_shifts,
          can_manage_applicants,
          can_edit_restaurant,
          restaurant:restaurants (
            name
          )
        `)
        .eq('auth_id', user.id)

      if (accessError) throw accessError

      const formattedAccess: CurrentUserAccess[] = (access || []).map((a: any) => ({
        restaurant_id: a.restaurant_id,
        restaurant_name: a.restaurant.name,
        role: a.role,
        can_manage_team: a.can_manage_team,
        can_view_financials: a.can_view_financials,
        can_post_shifts: a.can_post_shifts,
        can_manage_applicants: a.can_manage_applicants,
        can_edit_restaurant: a.can_edit_restaurant,
      }))

      setRestaurants(formattedAccess)

      // Select first restaurant that user can manage team for
      const canManage = formattedAccess.find(r => r.can_manage_team)
      if (canManage) {
        setSelectedRestaurant(canManage.restaurant_id)
        setCurrentAccess(canManage)
      } else if (formattedAccess.length > 0) {
        setSelectedRestaurant(formattedAccess[0].restaurant_id)
        setCurrentAccess(formattedAccess[0])
      }

    } catch (err: any) {
      console.error('Error loading restaurants:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const loadTeamData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Load team members
      const { data: members, error: membersError } = await supabase
        .from('restaurant_users')
        .select(`
          id,
          auth_id,
          role,
          can_manage_team,
          can_view_financials,
          can_post_shifts,
          can_manage_applicants,
          can_edit_restaurant,
          last_active,
          created_at
        `)
        .eq('restaurant_id', selectedRestaurant)

      if (membersError) throw membersError

      // Get emails for each member
      const membersWithEmails = await Promise.all(
        (members || []).map(async (member: any) => {
          const { data: userData } = await supabase.auth.admin.getUserById(member.auth_id)
          return {
            ...member,
            email: userData.user?.email || 'Unknown'
          }
        })
      )

      setTeamMembers(membersWithEmails)

      // Load pending invitations
      if (currentAccess?.can_manage_team) {
        const { data: invites, error: invitesError } = await supabase
          .from('team_invitations')
          .select('*')
          .eq('restaurant_id', selectedRestaurant)
          .eq('status', 'pending')
          .order('created_at', { ascending: false })

        if (invitesError) throw invitesError
        setInvitations(invites || [])
      }

    } catch (err: any) {
      console.error('Error loading team data:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInviteMember = async () => {
    if (!inviteEmail || !currentAccess?.can_manage_team) return

    setIsInviting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Create invitation
      const { error: inviteError } = await supabase
        .from('team_invitations')
        .insert([{
          restaurant_id: selectedRestaurant,
          invited_by: user.id,
          email: inviteEmail,
          role: inviteRole,
          ...invitePermissions
        }])

      if (inviteError) throw inviteError

      // Log audit event
      await supabase.rpc('log_audit_event', {
        p_restaurant_id: selectedRestaurant,
        p_user_id: user.id,
        p_action: 'invite_sent',
        p_details: { email: inviteEmail, role: inviteRole }
      })

      // TODO: Send email invitation
      alert(`Invitation sent to ${inviteEmail}! (Email integration coming soon)`)

      // Reset form and reload
      setShowInviteModal(false)
      setInviteEmail('')
      setInviteRole('manager')
      setInvitePermissions({
        can_manage_team: false,
        can_view_financials: false,
        can_post_shifts: true,
        can_manage_applicants: true,
        can_edit_restaurant: false,
      })
      loadTeamData()

    } catch (err: any) {
      console.error('Error inviting member:', err)
      alert(`Error: ${err.message}`)
    } finally {
      setIsInviting(false)
    }
  }

  const handleRemoveMember = async (memberId: string, memberEmail: string) => {
    if (!currentAccess?.can_manage_team) return
    if (!confirm(`Are you sure you want to remove ${memberEmail} from the team?`)) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Get member's auth_id for audit log
      const member = teamMembers.find(m => m.id === memberId)

      // Remove member
      const { error } = await supabase
        .from('restaurant_users')
        .delete()
        .eq('id', memberId)

      if (error) throw error

      // Log audit event
      await supabase.rpc('log_audit_event', {
        p_restaurant_id: selectedRestaurant,
        p_user_id: user.id,
        p_action: 'member_removed',
        p_target_user_id: member?.auth_id,
        p_details: { email: memberEmail }
      })

      alert(`${memberEmail} has been removed from the team.`)
      loadTeamData()

    } catch (err: any) {
      console.error('Error removing member:', err)
      alert(`Error: ${err.message}`)
    }
  }

  const handleRevokeInvitation = async (invitationId: string) => {
    if (!currentAccess?.can_manage_team) return

    try {
      const { error } = await supabase
        .from('team_invitations')
        .update({ status: 'revoked' })
        .eq('id', invitationId)

      if (error) throw error

      alert('Invitation revoked.')
      loadTeamData()

    } catch (err: any) {
      console.error('Error revoking invitation:', err)
      alert(`Error: ${err.message}`)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'staff': return 'bg-gray-100 text-gray-800 border-gray-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (isLoading && restaurants.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading team...</p>
        </div>
      </div>
    )
  }

  if (!currentAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-gray-400 text-5xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Restaurant Access</h2>
          <p className="text-gray-600">You don't have access to any restaurants yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                👥 Team Management
              </h1>
              <p className="text-gray-600 mt-1">Manage your restaurant staff and permissions</p>
            </div>
            {currentAccess.can_manage_team && (
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
              >
                + Invite Team Member
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Restaurant Selector */}
        {restaurants.length > 1 && (
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Restaurant
            </label>
            <select
              value={selectedRestaurant}
              onChange={(e) => {
                setSelectedRestaurant(e.target.value)
                const access = restaurants.find(r => r.restaurant_id === e.target.value)
                setCurrentAccess(access || null)
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              {restaurants.map((r) => (
                <option key={r.restaurant_id} value={r.restaurant_id}>
                  {r.restaurant_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Your Access Level */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Your Access Level</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full border-2 font-medium text-sm ${getRoleBadgeColor(currentAccess.role)}`}>
              {currentAccess.role.toUpperCase()}
            </span>
            <span className="text-blue-800 text-sm">at {currentAccess.restaurant_name}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-3">
            <PermissionBadge label="Manage Team" allowed={currentAccess.can_manage_team} />
            <PermissionBadge label="View Financials" allowed={currentAccess.can_view_financials} />
            <PermissionBadge label="Post Shifts" allowed={currentAccess.can_post_shifts} />
            <PermissionBadge label="Manage Applicants" allowed={currentAccess.can_manage_applicants} />
            <PermissionBadge label="Edit Restaurant" allowed={currentAccess.can_edit_restaurant} />
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Team Members ({teamMembers.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {teamMembers.map((member) => (
              <div key={member.id} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {member.email}
                      </h3>
                      <span className={`px-3 py-1 rounded-full border-2 font-medium text-xs ${getRoleBadgeColor(member.role)}`}>
                        {member.role.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                      <PermissionBadge label="Manage Team" allowed={member.can_manage_team} small />
                      <PermissionBadge label="Financials" allowed={member.can_view_financials} small />
                      <PermissionBadge label="Post Shifts" allowed={member.can_post_shifts} small />
                      <PermissionBadge label="Applicants" allowed={member.can_manage_applicants} small />
                      <PermissionBadge label="Edit Restaurant" allowed={member.can_edit_restaurant} small />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Joined {formatDate(member.created_at)}
                      {member.last_active && ` • Last active ${formatDate(member.last_active)}`}
                    </div>
                  </div>
                  {currentAccess.can_manage_team && member.role !== 'owner' && (
                    <button
                      onClick={() => handleRemoveMember(member.id, member.email)}
                      className="ml-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Invitations */}
        {currentAccess.can_manage_team && invitations.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Pending Invitations ({invitations.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {invitations.map((invite) => (
                <div key={invite.id} className="px-6 py-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {invite.email}
                        </h3>
                        <span className={`px-3 py-1 rounded-full border-2 font-medium text-xs ${getRoleBadgeColor(invite.role)}`}>
                          {invite.role.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          PENDING
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Sent {formatDate(invite.created_at)} • Expires {formatDate(invite.expires_at)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRevokeInvitation(invite.id)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm font-medium"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!currentAccess.can_manage_team && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <div className="text-yellow-600 text-4xl mb-3">🔒</div>
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              Limited Access
            </h3>
            <p className="text-yellow-800">
              You don't have permission to manage the team. Contact your restaurant owner to change your permissions.
            </p>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Invite Team Member</h2>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="teammate@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'manager' | 'staff')}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions
                </label>
                <div className="space-y-2">
                  <PermissionCheckbox
                    label="Can manage team members"
                    checked={invitePermissions.can_manage_team}
                    onChange={(checked) => setInvitePermissions({...invitePermissions, can_manage_team: checked})}
                  />
                  <PermissionCheckbox
                    label="Can view financials & payouts"
                    checked={invitePermissions.can_view_financials}
                    onChange={(checked) => setInvitePermissions({...invitePermissions, can_view_financials: checked})}
                  />
                  <PermissionCheckbox
                    label="Can post shifts"
                    checked={invitePermissions.can_post_shifts}
                    onChange={(checked) => setInvitePermissions({...invitePermissions, can_post_shifts: checked})}
                  />
                  <PermissionCheckbox
                    label="Can manage applicants (accept/reject)"
                    checked={invitePermissions.can_manage_applicants}
                    onChange={(checked) => setInvitePermissions({...invitePermissions, can_manage_applicants: checked})}
                  />
                  <PermissionCheckbox
                    label="Can edit restaurant details"
                    checked={invitePermissions.can_edit_restaurant}
                    onChange={(checked) => setInvitePermissions({...invitePermissions, can_edit_restaurant: checked})}
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                disabled={isInviting}
              >
                Cancel
              </button>
              <button
                onClick={handleInviteMember}
                disabled={!inviteEmail || isInviting}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInviting ? 'Sending...' : 'Send Invitation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper Components
function PermissionBadge({ label, allowed, small = false }: { label: string; allowed: boolean; small?: boolean }) {
  return (
    <div className={`flex items-center gap-1 ${small ? 'text-xs' : 'text-sm'}`}>
      <span className={allowed ? 'text-green-600' : 'text-gray-400'}>
        {allowed ? '✓' : '✗'}
      </span>
      <span className={allowed ? 'text-gray-700' : 'text-gray-400'}>
        {label}
      </span>
    </div>
  )
}

function PermissionCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}
