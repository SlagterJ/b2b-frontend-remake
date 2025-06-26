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
import { supabase } from "../global/initSupabase";
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

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("ProductionLines").select();

      if (error) {
        console.error("Failed to load production lines", error);
        return;
      }

      setProductionLines(data as ProductionLine[]);
    })();
  }, []);

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

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("WorkOrders")
        .select(
          `
        *,
        Orders(
          *,
          Products (
            *
          )
        )
      `,
        )
        .eq("productionLineId", selectedProductionLineId)
        .filter("Orders.status", "eq", "InProduction");

      if (error) {
        console.error("Could not retrieve orders", error);
        return;
      }

      setWorkOrders(data as WorkOrder[]);
    })();
  }, [selectedProductionLineId]);

  const dataSource = workOrders.map((workOrder) => ({
    key: workOrder.id,
    productName: workOrder.Orders.Products.productName,
    productQuantity: workOrder.Orders.productQuantity,
    blueBlocks: workOrder.Orders.Products.blueBlocks,
    redBlocks: workOrder.Orders.Products.redBlocks,
    greyBlocks: workOrder.Orders.Products.greyBlocks,
  }));

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
            <Button>Gemaakt</Button>
            <Button>Afwijzen</Button>
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
