import { FC, useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Dropdown } from "antd";
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
      {customers && (
        <Dropdown menu={{ items: customers }}>Kies uw naam</Dropdown>
      )}
    </Content>
  );
};

export default CustomerPage;
