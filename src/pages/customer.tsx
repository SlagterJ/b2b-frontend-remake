import { FC, useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  InputNumber,
  MenuProps,
  Skeleton,
  Typography,
} from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomerController } from "../controllers/customer.controller";
import { Customer } from "../models/customer.model";
import { Product } from "../models/product.model";
import { ProductController } from "../controllers/product.controller";
import { OrderController } from "../controllers/order.controller";

interface OrderFormProps {
  customerId: number;
}

const OrderForm: FC<OrderFormProps> = ({ customerId }) => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: ProductController.readAll,
  });
  useEffect(() => setProducts(data || []), [data]);

  const mutation = useMutation({
    mutationFn: OrderController.create,
  });

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    setSelectedProductId(Number(info.key));
    form.setFieldsValue({ product: info.key });
  };

  const menuItems: MenuProps["items"] = products.map((product) =>
    product.id !== undefined
      ? {
          key: product.id, // this is the customer ID
          label: product.name,
        }
      : null,
  );

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  const handleSubmit = (values: any) => {
    mutation.mutate({
      quantity: values.quantity,
      status: "PendingApproval",
      customerId: customerId,
      productId: selectedProductId!,
    });

    form.resetFields();
    setSelectedProductId(null);
  };

  if (isPending) return <Skeleton />;
  if (error)
    return (
      <Typography>
        Er was een fout bij het ophalen van de productdata.
      </Typography>
    );

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
              ? selectedProduct.name
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
  const { isPending, error, data } = useQuery({
    queryKey: ["customers"],
    queryFn: CustomerController.readAll,
  });
  useEffect(() => setCustomers(data || []), [data]);

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    setSelectedCustomerId(Number(info.key));
  };

  const menuItems: MenuProps["items"] = customers.map((customer) =>
    customer.id !== undefined
      ? {
          key: customer.id, // this is the customer ID
          label: customer.name,
        }
      : null,
  );

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  if (isPending) return <Skeleton />;
  if (error)
    return (
      <Typography>
        Er was een fout bij het ophalen van de klantendata.
      </Typography>
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
