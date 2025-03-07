import DashboardAction from "@/components/DashboardAction";
import { ProtectedRoute } from "@/lib/protectedRoute";
import useAuthStore from "@/lib/store/auth.store";

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
