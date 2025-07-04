import { FC, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  MenuProps,
  Space,
  Table,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";

interface ProductionLine {
  id: string;
  name: string;
}

const ProductionPage: FC = () => {
  const [productionLines, setProductionLines] = useState<ProductionLine[]>([]);
  const [selectedProductionLineId, setSelectedProductionLineId] = useState<
    string | null
  >(null);

  useEffect(() => {}, []);

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    setSelectedProductionLineId(info.key);
  };

  const menuItems: MenuProps["items"] = productionLines.map(
    (productionLine) => ({
      key: productionLine.id, // this is the customer ID
      label: productionLine.name,
    }),
  );

  const selectedProductionLine = productionLines.find(
    (productionLine) => productionLine.id === selectedProductionLineId,
  );

  return (
    <Content style={{ padding: 24 }}>
      <Dropdown
        menu={{
          items: menuItems,
          onClick: handleMenuClick,
        }}
      >
        <Button>
          {selectedProductionLine
            ? selectedProductionLine.name
            : "Kies de productielijn waarin u werkt ↓"}
        </Button>
      </Dropdown>
      {selectedProductionLineId && (
        <>
          <Divider />
          <ProductionLineView
            selectedProductionLineId={selectedProductionLineId}
          />
        </>
      )}
    </Content>
  );
};

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
  };
}

interface ProductionLineViewProps {
  selectedProductionLineId: string;
}

const ProductionLineView: FC<ProductionLineViewProps> = ({
  selectedProductionLineId,
}) => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  useEffect(() => {}, [selectedProductionLineId]);

  const dataSource = workOrders.map((workOrder) => {
    const quantity = workOrder.Orders.productQuantity;
    const blueBlocks = workOrder.Orders.Products.blueBlocks;
    const blueBlocksTotal = blueBlocks * quantity;
    const redBlocks = workOrder.Orders.Products.redBlocks;
    const redBlocksTotal = redBlocks * quantity;
    const greyBlocks = workOrder.Orders.Products.greyBlocks;
    const greyBlocksTotal = greyBlocks * quantity;

    return {
      key: workOrder.id,
      productName: workOrder.Orders.Products.productName,
      productQuantity: quantity,
      blueBlocks: `P.P.: ${blueBlocks} | T: ${blueBlocksTotal}`,
      redBlocks: `P.P.: ${redBlocks} | T: ${redBlocksTotal}`,
      greyBlocks: `P.P.: ${greyBlocks} | T: ${greyBlocksTotal}`,
      orderId: workOrder.Orders.id,
    };
  });

  const handleStatusUpdate = async (
    orderId: string,
    currentStatus: string,
    selectedStatus: string,
  ) => {
    /*const { error } = await supabase
      .from("Orders")
      .update({ status: selectedStatus })
      .eq("id", orderId);

    if (error) {
      console.error("Failed to update status:", error);
      return;
    }*/
  };

  const columns = [
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
      title: "Acties",
      key: "actions",
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button
              type={"default"}
              onClick={() =>
                handleStatusUpdate(
                  record.orderId,
                  record.status,
                  "ReadyForDelivery",
                )
              }
            >
              Klaar
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

export default ProductionPage;
