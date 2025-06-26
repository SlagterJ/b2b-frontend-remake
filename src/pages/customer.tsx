import { FC, useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  InputNumber,
  MenuProps,
  Typography,
} from "antd";
import { supabase } from "../global/initSupabase";

interface Customer {
  id: string;
  name: string;
}

interface Product {
  id: string;
  productName: string;
}

interface OrderFormProps {
  customerId: string;
}

const OrderForm: FC<OrderFormProps> = ({ customerId }) => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("Products").select();

      if (error) {
        console.error("Failed to load products", error);
        return;
      }

      // Store full customer objects
      setProducts(data as Product[]);
    })();
  }, []);

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    setSelectedProductId(info.key);
    form.setFieldsValue({ product: info.key });
  };

  const menuItems: MenuProps["items"] = products.map((product) => ({
    key: product.id, // this is the customer ID
    label: product.productName,
  }));

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  const handleSubmit = (values: any) => {
    (async () => {
      const { error } = await supabase.from("Orders").insert([
        {
          customerId: customerId,
          productId: values.product,
          productQuantity: values.quantity,
          orderPeriod: values.period,
        },
      ]);

      error && console.error(error);

      form.resetFields();
      setSelectedProductId(null);
    })();
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        label="Product"
        name="product"
        rules={[{ required: true, message: "Vul a.u.b. een product in" }]}
      >
        <Dropdown
          menu={{
            items: menuItems,
            onClick: handleMenuClick,
          }}
        >
          <Button>
            {selectedProduct
              ? selectedProduct.productName
              : "Kies uw gewenste product ↓"}
          </Button>
        </Dropdown>
      </Form.Item>
      <Form.Item
        label="Aantal"
        name="quantity"
        rules={[{ required: true, message: "Vul a.u.b. het aantal in" }]}
      >
        <InputNumber min={1} max={3} />
      </Form.Item>
      <Form.Item
        label="Periode"
        name="period"
        rules={[
          { required: true, message: "Vul a.u.b. de huidige periode in" },
        ]}
      >
        <InputNumber min={1} max={80} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Verzenden
        </Button>
      </Form.Item>
    </Form>
  );
};

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
    <>
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

        {selectedCustomer && (
          <Typography style={{ marginTop: 16 }}>
            Goedendag, <strong>{selectedCustomer.name}</strong>
          </Typography>
        )}
      </Content>
      {selectedCustomerId && (
        <>
          <Divider />
          <OrderForm customerId={selectedCustomerId} />
        </>
      )}
    </>
  );
};

export default CustomerPage;
