import { FC, useEffect, useState } from "react";
import { Button, Form, Input, Skeleton, Space, Table, Typography } from "antd";
import { Order } from "../models/order.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderController } from "../controllers/order.controller";
import { queryClient } from "./_app";

interface OrderDataDTO {
  key: number;
  orderId: number;
  productName: string;
  productQuantity: number;
  blueBlocks: number;
  redBlocks: number;
  greyBlocks: number;
  customerName: string;
}

const ExpeditionPage: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["expedition_orders"],
    queryFn: OrderController.readAll,
  });
  useEffect(() => setOrders(data || []), [data]);

  const mutation = useMutation({
    mutationFn: OrderController.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expedition_orders"] });
    },
  });

  const dataSource: OrderDataDTO[] = orders
    .filter((order) => order.status === "ReadyForDelivery")
    .map(
      (order): OrderDataDTO => ({
        key: order.id,
        orderId: order.id,
        productName: order.product.name,
        productQuantity: order.quantity,
        blueBlocks: order.product.blueBlocks,
        redBlocks: order.product.redBlocks,
        greyBlocks: order.product.greyBlocks,
        customerName: order.customer.name,
      }),
    );

  const handleDelivered = async (orderId: number) => {
    const order = orders.find((order) => order.id === orderId);

    if (order === undefined) return;

    order.status = "Delivered";

    mutation.mutate(order);
  };

  const handleRejected = async (orderId: number, rejectedReason: string) => {
    const order = orders.find((order) => order.id === orderId);

    if (order === undefined) return;

    order.status = "Rejected";
    order.rejectedDate = new Date();
    order.rejectionReason = rejectedReason;

    mutation.mutate(order);
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
      render: (_: any, record: OrderDataDTO) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => handleDelivered(record.orderId)}
            >
              Geleverd
            </Button>
            <Form
              onFinish={(values) =>
                handleRejected(record.orderId, values["rejectedReason"])
              }
            >
              <Form.Item
                label="Rede voor afwijzing"
                name="rejectedReason"
                rules={[
                  {
                    required: true,
                    message: "Vul a.u.b de rede voor afwijzing in.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="default" danger htmlType="submit">
                  Afwijzen
                </Button>
              </Form.Item>
            </Form>
          </Space>
        );
      },
    },
  ];

  if (isPending) return <Skeleton />;
  if (error)
    return (
      <Typography>Er was een fout bij het ophalen van de gegevens.</Typography>
    );

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default ExpeditionPage;
