import { dummyData } from "@/contants";
import DashboardLayout from "@/components/DashboardLayout";
import Image from "next/image";
import PaymentDashboard from "@/components/PaymentDashboard";

const PaymentPage = () => {
  return (
    <>
      <DashboardLayout>
        <PaymentDashboard />
      </DashboardLayout>
    </>
  );
};

export default PaymentPage;
