import React from "react";
import ProtectedRoute from "@/lib/protectedRoute";

const DashboardPage = async ({
  params,
}: {
  params: Promise<{ userName: string }>;
}) => {
  const { userName } = await params;
  return (
    <div>
      <ProtectedRoute />
      <div>DashboardPage {userName}</div>
    </div>
  );
};

export default DashboardPage;
