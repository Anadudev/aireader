import React from "react";

const DashboardPage = async({
  params,
}: {
  params: Promise<{ userName: string }>;
}) => {
  const { userName } = await params;
  return (
    <div>
      <div>DashboardPage {userName}</div>
    </div>
  );
};

export default DashboardPage;
