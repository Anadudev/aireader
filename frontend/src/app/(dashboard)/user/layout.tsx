import DashboardAction from "@/components/DashboardAction";
import ProtectedRoute from "@/lib/protectedRoute";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={``}>
      <ProtectedRoute />
      <DashboardAction />
      {children}
    </div>
  );
}
