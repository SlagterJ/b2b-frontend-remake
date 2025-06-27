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
  EuroCircleOutlined,
  MonitorOutlined,
  TeamOutlined,
  TruckOutlined,
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
      key: "customer",
      icon: <TeamOutlined />,
      label: "Klant",
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
      icon: <EuroCircleOutlined />,
      label: "Inkoop",
    },
    {
      key: "supplier",
      icon: <TruckOutlined />,
      label: "Leverancier",
    },
    /*
    {
      key: "inventorymanagement",
      icon: <TagsOutlined />,
      label: "Voorraadbeheer",
    },
     */
    {
      key: "production",
      icon: <BuildOutlined />,
      label: "Productie",
    },
    {
      key: "expedition",
      icon: <MonitorOutlined />,
      label: "Expeditie",
    },
    /*
    {
      key: "financialadmin",
      icon: <StockOutlined />,
      label: "Financiële administratie",
    },
     */
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
        <Layout style={{ minHeight: "100vh", margin: 0 }}>
          <Sider>
            <Menu
              style={{ height: "100%" }}
              mode="inline"
              items={menuItems}
              onClick={handleMenuClick}
            />
          </Sider>
          <Content>
            <Layout
              style={{
                margin: "10px",
                padding: "24px",
                backgroundColor: "white",
                borderRadius: "20px",
              }}
            >
              <Component {...pageProps} />
            </Layout>
          </Content>
        </Layout>
      </App>
    </Provider>
  );
};

export default MyApp;
