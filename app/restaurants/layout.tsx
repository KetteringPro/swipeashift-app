export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#edf9fa] to-[#0891b2] flex items-center justify-center">
      {children}
    </div>
  );
}