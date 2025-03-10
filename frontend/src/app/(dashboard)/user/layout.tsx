import DashboardAction from "@/components/DashboardAction";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={``}>
      <DashboardAction />
      {children}
    </div>
  );
}
