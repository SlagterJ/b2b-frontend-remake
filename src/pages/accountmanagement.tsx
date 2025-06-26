import { FC, useEffect, useState } from "react";
import { Space, Typography, List, Collapse, Table, Button } from "antd";
import { supabase } from "../global/initSupabase";
import { Content } from "antd/lib/layout/layout";

const AccountManagementPage: FC = () => {
  const [orders, setOrders] = useState<any[] | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>("PendingApproval");

  useEffect(() => {
    let subscription: any;

    const fetchOrders = async () => {
      const { data } = await supabase.from("Orders").select();
      const orderData: any[] = [];

      const { data: customersData } = await supabase
        .from("Customers")
        .select("id, name");
      const customerMap = new Map(customersData!.map((c) => [c.id, c.name]));

      const { data: productsData } = await supabase
        .from("Products")
        .select("id, productName");
      const productMap = new Map(
        productsData!.map((c) => [c.id, c.productName]),
      );

      data!.forEach((item) => {
        orderData.push({
          key: item.id,
          quantity: item.productQuantity ?? "Unknown",
          orderPeriod: item.orderPeriod ?? "Unknown",
          customerName: customerMap.get(item.customerId) ?? "Unknown",
          productName: productMap.get(item.productId) ?? "Unknown",
          status: item.status ?? "Unknown",
        });
      });

      setOrders(orderData);
    };

    fetchOrders(); // initial load

    subscription = supabase
      .channel("orders-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Orders",
        },
        (payload) => {
          console.log("Realtime update:", payload);
          fetchOrders();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const filteredOrders = orders?.filter((order) => {
    if (statusFilter === "All") return true;
    return order.status === statusFilter;
  });

  const handleStatusUpdate = async (
    orderId: string,
    currentStatus: string,
    selectedStatus: string,
  ) => {
    const newStatus =
      currentStatus === selectedStatus ? "PendingApproval" : selectedStatus;

    const { error } = await supabase
      .from("Orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      console.error("Failed to update status:", error);
      return;
    }

    // Update local state
    setOrders((prev) =>
      prev?.map((order) =>
        order.key === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const columns = [
    {
      title: "Klantnaam",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Aantal",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Orderperiode",
      dataIndex: "orderPeriod",
      key: "orderPeriod",
    },
    {
      title: "Order status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Acties",
      key: "actions",
      render: (_: any, record: any) => {
        const isPlanning = record.status === "Planning";
        const isRejected = record.status === "Rejected";

        return (
          <Space>
            <Button
              type={isPlanning ? "primary" : "default"}
              onClick={() =>
                handleStatusUpdate(record.key, record.status, "Planning")
              }
            >
              Accepteren
            </Button>
            <Button
              type={isRejected ? "primary" : "default"}
              danger
              onClick={() =>
                handleStatusUpdate(record.key, record.status, "Rejected")
              }
            >
              Afwijzen
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Content>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type={statusFilter === "All" ? "primary" : "default"}
          onClick={() => setStatusFilter("All")}
        >
          Alles
        </Button>
        <Button
          type={statusFilter === "PendingApproval" ? "primary" : "default"}
          onClick={() => setStatusFilter("PendingApproval")}
        >
          In afwachting
        </Button>
        <Button
          type={statusFilter === "Planning" ? "primary" : "default"}
          onClick={() => setStatusFilter("Planning")}
        >
          Geaccepteerd
        </Button>
        <Button
          type={statusFilter === "Rejected" ? "primary" : "default"}
          onClick={() => setStatusFilter("Rejected")}
        >
          Afgewezen
        </Button>
      </Space>
      <Table dataSource={filteredOrders} columns={columns} />
    </Content>
  );
};

export default AccountManagementPage;
