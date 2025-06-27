import { FC, useEffect, useState } from "react";
import { Col, Row, Space, Statistic, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { supabase } from "../global/initSupabase";

interface Order {
  status: string;
  productQuantity: number;
  Products: {
    blueBlocks: number;
    redBlocks: number;
    greyBlocks: number;
  };
}

const HomePage: FC = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalOrdersFinished, setTotalOrdersFinished] = useState(0);
  const [totalBlocks, setTotalBlocks] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    (async () => {
      const { count: totalOrdersCount, error: totalOrdersError } =
        await supabase
          .from("Orders")
          .select("*", { count: "exact", head: true });

      if (totalOrdersError) {
        console.error(
          "There was an error getting the total amount of orders",
          totalOrdersError,
        );
        return;
      }

      setTotalOrders(totalOrdersCount as number);

      const {
        count: totalFinishedOrdersCount,
        error: totalFinishedOrdersError,
      } = await supabase
        .from("Orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "Delivered");

      if (totalFinishedOrdersError) {
        console.error(
          "There was an error getting the total amount of finished orders",
          totalFinishedOrdersError,
        );
        return;
      }

      setTotalOrdersFinished(totalFinishedOrdersCount as number);

      const { data: totalBlocks, error: totalBlocksError } = await supabase
        .from("Orders")
        .select("*, Products(*)");

      if (totalBlocksError) {
        console.error(
          "There was an error getting the total amount of blocks",
          totalBlocksError,
        );
        return;
      }

      const totalBlocksFiltered = (totalBlocks as Order[]).filter(
        (order) =>
          order.status === "InProduction" ||
          order.status === "ReadyForDelivery" ||
          order.status === "Delivered",
      );

      const totals = totalBlocksFiltered.reduce(
        (acc, order) => {
          acc.blue +=
            (order.productQuantity || 0) * (order.Products?.blueBlocks || 0);
          acc.red +=
            (order.productQuantity || 0) * (order.Products?.redBlocks || 0);
          acc.grey +=
            (order.productQuantity || 0) * (order.Products?.greyBlocks || 0);
          return acc;
        },
        { blue: 0, red: 0, grey: 0 },
      );

      setTotalBlocks(totals.blue + totals.red + totals.grey);

      const { data, error } = await supabase
        .from("Orders")
        .select("productQuantity")
        .eq("status", "Delivered");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        const total = data.reduce(
          (sum, order) => sum + (order.productQuantity || 0),
          0,
        );
        console.log("Total Delivered Quantity:", total);
        setTotalProducts(total);
      }
    })();
  }, []);

  return (
    <Content>
      <Typography.Title>Dashboard</Typography.Title>
      <Row>
        <Col span={6}>
          <Statistic title="Totaal aantal orders" value={totalOrders} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Aantal orders succesvol geleverd"
            value={totalOrdersFinished}
          />
        </Col>
        <Col span={6}>
          <Statistic title="Aantal producten geleverd" value={totalProducts} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Aantal blokjes geleverd aan ons totaal"
            value={totalBlocks}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default HomePage;
