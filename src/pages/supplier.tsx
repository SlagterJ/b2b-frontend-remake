import { FC, useState } from "react";
import { Space, Typography } from "antd";
import { Content } from "antd/es/layout/layout";

interface PurchaseOrder {
  WorkOrders: {
    ProductionLines: {};
  };
}

const SupplierPage: FC = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  return <Content></Content>;
};

export default SupplierPage;
