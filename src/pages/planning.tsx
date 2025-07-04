import { FC, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  InputNumber,
  MenuProps,
  Modal,
  Space,
  Table,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";

interface WorkOrder {
  id: number;
  productionLineId: string;
  Orders: {
    id: number;
    productQuantity: number;
    status: string;
  };
}

const PlanningPage: FC = () => {
  const [form] = Form.useForm();
  const [orders, setOrders] = useState<any[] | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>("Planning");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [productionLines, setProductionLines] = useState<any[]>([]);
  const [selectedProductionLineId, setSelectedProductionLineId] = useState<
    string | null
  >();
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  useEffect(() => {}, []);

  const filteredOrders = orders?.filter((order) => {
    if (statusFilter === "All") return true;
    return order.status === statusFilter;
  });

  const showModal = async (order: any) => {
    setSelectedOrder(order);
    setIsModalVisible(true);

    /*const { data, error } = await supabase
      .from("ProductionLines")
      .select("id, name");
    if (error) console.error(error);
    else setProductionLines(data);*/
  };

  const handleSubmit = (values: any) => {
    (async () => {
      /*const { error: updateOrderError } = await supabase
        .from("Orders")
        .update({
          status: "WaitingForPurchasing",
        })
        .eq("id", selectedOrder.key);

      const { data, error: workOrderError } = await supabase
        .from("WorkOrders")
        .insert([
          {
            orderId: selectedOrder.key,
            plannedPeriod: values.period,
            productionLineId: selectedProductionLineId,
          },
        ])
        .select();*/
      /*if (!data || data.length <= 0) {
        console.error("Data length is", data.length);
        return;
      }*/
    })();

    console.table(values);
    form.resetFields();
    setSelectedProductionLineId(null);
    handleModalClose();
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalClose = () => {
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

  const getProductionBacklog = (productionLineId: string): number => {
    let total = 0;
    const filteredWorkOrders = workOrders.filter(
      (workOrder) => workOrder.productionLineId === productionLineId,
    );

    filteredWorkOrders.forEach((workOrder) => {
      total += workOrder.Orders.productQuantity;
    });

    return total;
  };

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    setSelectedProductionLineId(info.key);
    form.setFieldsValue({ productionLine: info.key });
  };

  const menuItems: MenuProps["items"] = productionLines.map(
    (productionLine) => ({
      key: productionLine.id,
      label:
        productionLine.name +
        " Backlog: " +
        getProductionBacklog(productionLine.id),
    }),
  );

  const selectedProductionLine = productionLines.find(
    (productionLine) => productionLine.id === selectedProductionLineId,
  );

  return (
    <Content>
      <Table dataSource={filteredOrders} columns={columns} />
      <Modal
        title="Order plannen"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalClose}
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
                <strong>Verder benodigde informatie:</strong>
              </p>
              <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                  label="Productielijn"
                  name="productionLine"
                  rules={[
                    {
                      required: true,
                      message: "Kies a.u.b. een productielijn",
                    },
                  ]}
                >
                  <Dropdown
                    menu={{
                      items: menuItems,
                      onClick: handleMenuClick,
                    }}
                  >
                    <Button>
                      {selectedProductionLine
                        ? selectedProductionLine.name
                        : "Kies uw gewenste productielijn ↓"}
                    </Button>
                  </Dropdown>
                </Form.Item>
                <Form.Item
                  label="Geplande periode"
                  name="period"
                  rules={[
                    {
                      required: true,
                      message: "Vul a.u.b. de huidige periode in",
                    },
                  ]}
                >
                  <InputNumber min={1} max={80} />
                </Form.Item>
              </Form>
            </div>
          </>
        )}
      </Modal>
    </Content>
  );
};

export default PlanningPage;
