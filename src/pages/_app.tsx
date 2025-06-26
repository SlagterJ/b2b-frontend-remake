import { Provider } from "react-redux";
import store from "../state/store";
import { FC, useCallback } from "react";
import { AppProps } from "next/app";
import { App, Layout, Menu } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  AppstoreOutlined,
  AuditOutlined,
  BuildOutlined,
  CalendarOutlined,
  FundViewOutlined,
  MonitorOutlined,
  StockOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import router from "next/router";

/**
 * Default app component. This component renders and wraps around every page.
 */
const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const menuItems = [
    {
      key: "/",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
    },
    {
      key: "production",
      icon: <BuildOutlined />,
      label: "Productie",
    },
    {
      key: "accountmanagement",
      icon: <AuditOutlined />,
      label: "Account management",
    },
    {
      key: "planning",
      icon: <CalendarOutlined />,
      label: "Planning",
    },
    {
      key: "purchasing",
      icon: <FundViewOutlined />,
      label: "Inkoop",
    },
    {
      key: "inventorymanagement",
      icon: <TagsOutlined />,
      label: "Voorraadbeheer",
    },
    {
      key: "expedition",
      icon: <MonitorOutlined />,
      label: "Expeditie",
    },
    {
      key: "financialadmin",
      icon: <StockOutlined />,
      label: "Financiële administratie",
    },
  ];

  const handleMenuClick = useCallback(
    ({ key }: { key: string }) => {
      router.push(key);
    },
    [router],
  );

  return (
    <Provider store={store}>
      <App>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider>
            <Menu items={menuItems} onClick={handleMenuClick} />
          </Sider>
          <Content>
            <Component {...pageProps} />
          </Content>
        </Layout>
      </App>
    </Provider>
  );
};

export default MyApp;
