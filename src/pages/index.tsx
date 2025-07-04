import { FC, useEffect, useState } from "react";
import { Col, Row, Space, Statistic, Typography } from "antd";
import { Content } from "antd/es/layout/layout";

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

  useEffect(() => {}, []);

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
