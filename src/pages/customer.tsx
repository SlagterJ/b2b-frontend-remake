import { FC, useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Dropdown, Spin } from "antd";
import { supabase } from "../global/initSupabase";

const CustomerPage: FC = () => {
  const [customers, setCustomers] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("Customers").select();
      const customerData: any[] = [];

      data!.forEach((item) => {
        customerData.push({ key: item.id, label: item.name });
      });

      setCustomers(customerData);
    })();
  }, []);

  return (
    <Content>
      <Dropdown menu={{ items: customers ? customers : [<Spin />] }}>
        Kies uw naam V
      </Dropdown>
    </Content>
  );
};

export default CustomerPage;
