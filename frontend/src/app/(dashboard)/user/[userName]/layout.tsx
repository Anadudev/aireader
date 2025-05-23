import ProtectedRoute from "@/lib/protectedRoute";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={``}>
      <ProtectedRoute/>
      {children}
    </div>
  );
}
