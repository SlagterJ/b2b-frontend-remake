import { FC, useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Button, Dropdown, MenuProps, Typography } from "antd";
import { supabase } from "../global/initSupabase";

interface Customer {
  id: string;
  name: string;
}

const CustomerPage: FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null,
  );
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("Customers").select();

      if (error) {
        console.error("Failed to load customers", error);
        return;
      }

      // Store full customer objects
      setCustomers(data as Customer[]);
    })();
  }, []);

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    setSelectedCustomerId(info.key);
  };

  const menuItems: MenuProps["items"] = customers.map((customer) => ({
    key: customer.id, // this is the customer ID
    label: customer.name,
  }));

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
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
          {selectedCustomer ? selectedCustomer.name : "Kies uw naam ↓"}
        </Button>
      </Dropdown>

      {selectedCustomerId && (
        <Typography style={{ marginTop: 16 }}>
          Geselecteerde klant ID: <strong>{selectedCustomerId}</strong>
        </Typography>
      )}
    </Content>
  );
};

export default CustomerPage;
