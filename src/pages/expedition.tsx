import { FC, useEffect, useState } from "react";
import { Button, Space, Table, Typography } from "antd";
import { supabase } from "../global/initSupabase";

interface WorkOrder {
  id: number;
  Orders: {
    id: number;
    productQuantity: number;
    Products: {
      productName: string;
      blueBlocks: number;
      redBlocks: number;
      greyBlocks: number;
    };
    Customers: {
      name: string;
    };
  };
}

const ExpeditionPage: FC = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  useEffect(() => {
    let subscription: any;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("WorkOrders")
        .select(
          `
        *,
        Orders(
          *,
          Products (
            *
          ),
          Customers (
            *
          )
        )
      `,
        )
        .filter("Orders.status", "eq", "ReadyForDelivery");

      if (error) {
        console.error("Could not retrieve orders", error);
        return;
      }

      const filteredData = (data as WorkOrder[]).filter(
        (workOrder) => workOrder.Orders !== null,
      );

      setWorkOrders(filteredData);
    };

    fetchData();

    subscription = supabase
      .channel("workorders-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Orders",
        },
        (payload) => {
          console.log("Realtime payload:", payload);
          fetchData(); // refresh the list
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  });

  const dataSource = workOrders.map((workOrder) => ({
    key: workOrder.id,
    productName: workOrder.Orders.Products.productName,
    productQuantity: workOrder.Orders.productQuantity,
    blueBlocks: workOrder.Orders.Products.blueBlocks,
    redBlocks: workOrder.Orders.Products.redBlocks,
    greyBlocks: workOrder.Orders.Products.greyBlocks,
    orderId: workOrder.Orders.id,
    customerName: workOrder.Orders.Customers.name,
  }));

  const handleStatusUpdate = async (
    orderId: string,
    currentStatus: string,
    selectedStatus: string,
  ) => {
    const { error } = await supabase
      .from("Orders")
      .update({ status: selectedStatus })
      .eq("id", orderId);

    if (error) {
      console.error("Failed to update status:", error);
      return;
    }
  };

  const columns = [
    {
      title: "Klantnaam",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Type",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Aantal",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Acties",
      key: "actions",
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button
              type={"default"}
              onClick={() =>
                handleStatusUpdate(record.orderId, record.status, "Delivered")
              }
            >
              Bezorgd
            </Button>
            <Button
              type={"default"}
              danger
              onClick={() =>
                handleStatusUpdate(record.orderId, record.status, "Planning")
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
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default ExpeditionPage;
