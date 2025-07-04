import { FC, useEffect, useState } from "react";
import { Button, Form, InputNumber, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";

interface WorkOrder {
  id: string;
  Orders: {
    id: string;
    productQuantity: number;
    Products: {
      productName: string;
      blueBlocks: number;
      redBlocks: number;
      greyBlocks: number;
    };
  };
  ProductionLines: {
    name: string;
  };
}

const PurchasingPage: FC = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  useEffect(() => {});

  const dataSource = workOrders.map((purchaseOrder) => {
    const quantity: number = purchaseOrder.Orders.productQuantity;

    return {
      key: purchaseOrder.id,
      quantity: quantity,
      productName: purchaseOrder.Orders.Products.productName,
      blueBlocks: purchaseOrder.Orders.Products.blueBlocks * quantity,
      redBlocks: purchaseOrder.Orders.Products.redBlocks * quantity,
      greyBlocks: purchaseOrder.Orders.Products.greyBlocks * quantity,
      productionLineName: purchaseOrder.ProductionLines.name,
    };
  });

  const columns = [
    {
      title: "Type",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Aantal",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Blauwe blokken x aantal",
      dataIndex: "blueBlocks",
      key: "blueBlocks",
    },
    {
      title: "Rode blokken x aantal",
      dataIndex: "redBlocks",
      key: "redBlocks",
    },
    {
      title: "Grijze blokken x aantal",
      dataIndex: "greyBlocks",
      key: "greyBlocks",
    },
    {
      title: "Te leveren aan",
      dataIndex: "productionLineName",
      key: "productionLineName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => {
        const handleSubmit = (values: any) => {
          /*(async () => {
            const { error } = await supabase.from("PurchaseOrders").insert({
              orderPeriod: values.period,
              workOrderId: record.key,
            });

            if (error) {
              console.error(
                "There was an error creating the purchase order",
                error,
              );
            }

            const { data } = await supabase
              .from("WorkOrders")
              .select("*, Orders(*)")
              .eq("id", record.key);

            const { error: updateOrderError } = await supabase
              .from("Orders")
              .update({
                status: "WaitingForParts",
              })
              .eq("id", data![0].Orders.id);

            if (updateOrderError) {
              console.error(
                "There was an error updating the order status",
                updateOrderError,
              );
              return;
            }
          })();*/
        };

        return (
          <Space>
            <Form onFinish={handleSubmit}>
              <Form.Item
                label="Periode"
                name="period"
                rules={[
                  { required: true, message: "Vul a.u.b de periode in." },
                ]}
              >
                <InputNumber min={1} max={80} />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Verzenden naar leverancier
                </Button>
              </Form.Item>
            </Form>
          </Space>
        );
      },
    },
  ];

  return (
    <Content>
      <Table dataSource={dataSource} columns={columns} />
    </Content>
  );
};

export default PurchasingPage;
