import { FC, useEffect, useState } from "react";
import { Button, Checkbox, Modal, Space, Table, Typography } from "antd";
import { supabase } from "../global/initSupabase";

const PlanningPage: FC = () => {
  const [orders, setOrders] = useState<any[] | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>("Planning");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [productionLines, setProductionLines] = useState<any[]>([]);

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
          quantity: item.productQuantity ?? "Unknown",
          orderPeriod: item.orderPeriod ?? "Unknown",
          customerName: customerMap.get(item.customerId) ?? "Unknown",
          productName: productMap.get(item.productId) ?? "Unknown",
          status: item.status ?? "Unknown",
        });
      });

      setOrders(orderData);
    })();
  }, []);

  const filteredOrders = orders?.filter((order) => {
    if (statusFilter === "All") return true;
    return order.status === statusFilter;
  });

  const showModal = async (order: any) => {
    setSelectedOrder(order);
    setIsModalVisible(true);

    const { data, error } = await supabase
      .from("ProductionLines")
      .select("id, name");
    if (error) console.error(error);
    else setProductionLines(data);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
    setSelectedLine(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
    setSelectedLine(null);
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
      title: "Acties",
      key: "actions",
      render: (_: any, record: any) => {
        const isPlanning = record.status === "Planning";
        const isRejected = record.status === "Rejected";

        return (
          <Space>
            <Button
              type={isPlanning ? "primary" : "default"}
              onClick={() => showModal(record)}
            >
              Plannen
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Space>
      <Table dataSource={filteredOrders} columns={columns} />
      <Modal
        title="Order plannen"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {selectedOrder && (
          <>
            <p>
              <strong>Klant:</strong> {selectedOrder.customerName}
            </p>
            <p>
              <strong>Product:</strong> {selectedOrder.productName}
            </p>
            <p>
              <strong>Aantal:</strong> {selectedOrder.quantity}
            </p>
            <p>
              <strong>Periode:</strong> {selectedOrder.orderPeriod}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <div>
              <p>
                <strong>Productielijnen:</strong>
              </p>
              <Space direction="vertical">
                {productionLines.map((line) => (
                  <Checkbox
                    key={line.id}
                    checked={selectedLine === line.id}
                    onChange={() => setSelectedLine(line.id)}
                  >
                    {line.name}
                  </Checkbox>
                ))}
              </Space>
            </div>
          </>
        )}
      </Modal>
    </Space>
  );
};

export default PlanningPage;
