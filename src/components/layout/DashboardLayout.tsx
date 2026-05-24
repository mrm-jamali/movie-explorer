type MainLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}