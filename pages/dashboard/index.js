import Link from "next/link";
import Image from "next/image";

import DashboardMain from "@/components/DashboardMain";

import { Children, useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { fetchData } from "@/service/apiCalls/Fetcher";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <DashboardLayout>
        <DashboardMain />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
