import {Provider} from "react-redux";
import store from "../state/store";
import {FC} from "react";
import {AppProps} from "next/app";
import {App, Layout, Menu} from "antd";
import {Content} from "antd/lib/layout/layout";
import Sider from "antd/es/layout/Sider";
import {AuditOutlined, BuildOutlined, CalendarOutlined, EuroCircleOutlined, HomeOutlined} from "@ant-design/icons";

/**
 * Default app component. This component renders and wraps around every page.
 */
const MyApp: FC<AppProps> = ({Component, pageProps}: AppProps) => {
  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined/>,
      label: "Home",
    },
    {
      key: "production",
      icon: <BuildOutlined/>,
      label: "Productie",
    },
    {
      key: "accountmanagement",
      icon: <AuditOutlined/>,
      label: "Account management",
    },
    {
      key: "planning",
      icon: <CalendarOutlined/>,
      label: "Planning",
    },
    {
      key: "purchasing",
      icon: <EuroCircleOutlined/>,
      label: "Inkoop",
    }
  ]


  return (
    <Provider store={store}>
      <App>
        <Layout>
          <Sider>
            <Menu items={menuItems}/>
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
