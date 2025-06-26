import { FC, useEffect, useState } from "react";
import { Space, Typography, List, Collapse, Table } from "antd";
import { supabase } from "../global/initSupabase";
import { Content } from "antd/lib/layout/layout";

const AccountManagementPage: FC = () => {
  const [orders, setOrders] = useState<any[] | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("Orders").select();
      const orderData: any[] = [];

      const { data: customersData, error: customersError } = await supabase
        .from("Customers")
        .select("id, name");
      const customerMap = new Map(customersData!.map((c) => [c.id, c.name]));

      const { data: productsData, error: productsError } = await supabase
        .from("Products")
        .select("id, productName");
      const productMap = new Map(
        productsData!.map((c) => [c.id, c.productName]),
      );

      data!.forEach((item) => {
        orderData.push({
          key: item.id,
          quantity: item.productQuantity,
          orderPediod: item.orderPeriod,
          customerName: customerMap.get(item.customerId) ?? "Unknown",
          productName: productMap.get(item.productId) ?? "Unknown",
        });
      });

      setOrders(orderData);
    })();
  }, []);

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
  ];

  return (
    <Content>
      <Table dataSource={orders} columns={columns} />;
    </Content>
  );
};

export default AccountManagementPage;
