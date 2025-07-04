import { FC, useEffect, useState } from "react";
import { Button, Form, InputNumber, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";

interface PurchaseOrder {
  id: string;
  WorkOrders: {
    Orders: {
      id: string;
      productQuantity: number;
      Products: {
        blueBlocks: number;
        redBlocks: number;
        greyBlocks: number;
      };
    };
    ProductionLines: {
      name: string;
    };
  };
}

const SupplierPage: FC = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  useEffect(() => {});

  const dataSource = purchaseOrders.map((purchaseOrder) => {
    const quantity = purchaseOrder.WorkOrders.Orders.productQuantity;

    return {
      key: purchaseOrder.id,
      blueBlocks:
        purchaseOrder.WorkOrders.Orders.Products.blueBlocks * quantity,
      redBlocks: purchaseOrder.WorkOrders.Orders.Products.redBlocks * quantity,
      greyBlocks:
        purchaseOrder.WorkOrders.Orders.Products.greyBlocks * quantity,
      productionLineName: purchaseOrder.WorkOrders.ProductionLines.name,
    };
  });

  const columns = [
    {
      title: "Blauwe blokken",
      dataIndex: "blueBlocks",
      key: "blueBlocks",
    },
    {
      title: "Rode blokken",
      dataIndex: "redBlocks",
      key: "redBlocks",
    },
    {
      title: "Grijze blokken",
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
            const { error: purchaseOrderError } = await supabase
              .from("PurchaseOrders")
              .update({ deliveredPeriod: values.period })
              .eq("id", record.key);

            if (purchaseOrderError) {
              console.error(
                "There was an error updating the purchase order",
                purchaseOrderError,
              );
              return;
            }

            const { data, error: getOrderError } = await supabase
              .from("PurchaseOrders")
              .select(
                `
            *,
            WorkOrders(
              *,
              Orders(
                *,
                Products(
                  *
                )
              ),
              ProductionLines(
                *
              )
            )
          `,
              )
              .eq("id", record.key);

            if (getOrderError) {
              console.error(
                "There was an error getting the order",
                getOrderError,
              );
              return;
            }

            const purchaseOrderData = data[0] as PurchaseOrder;

            const { error: updateOrderError } = await supabase
              .from("Orders")
              .update({
                status: "InProduction",
              })
              .eq("id", purchaseOrderData.WorkOrders.Orders.id);

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
                  Geleverd
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

export default SupplierPage;
