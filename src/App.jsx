import React, { useState } from 'react';
import 'animate.css';
import '@ant-design/v5-patch-for-react-19';
import {
  Card,
  Form,
  InputNumber,
  Select,
  Button,
  Tooltip,
  message,
  Empty,
} from 'antd';
import { Copy, Github } from 'lucide-react'; // Added GitHub icon
import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const App = () => {
  const [payload, setPayload] = useState('');

  const designations = [
    'manager',
    'sales executive',
    'front-end developer',
    'backend developer',
    'android developer',
    'ceo',
    'cto',
    'product manager',
  ];

  const getDesignation = () => {
    const index = Math.floor(Math.random() * designations.length);
    return designations[index];
  };

  const generateUser = () => {
    return {
      id: nanoid(),
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number({ style: 'international' }),
      gender: faker.person.gender(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      pincode: Number(faker.location.zipCode()),
      createdAt: faker.date.anytime().toISOString(),
    };
  };

  const generateProducts = () => {
    return {
      id: nanoid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price({ min: 1000, max: 20000 })),
      discount: Number(faker.commerce.price({ min: 0, max: 50 })),
      rating: Number(faker.commerce.price({ min: 1, max: 5 })),
      category: faker.commerce.productAdjective(),
      brand: faker.company.buzzNoun(),
      image: faker.image.urlLoremFlickr({ category: 'product' }),
      createdAt: faker.date.anytime().toISOString(),
    };
  };

  const generatePayments = () => {
    return {
      id: nanoid(),
      user: {
        id: nanoid(),
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        mobile: faker.phone.number({ style: 'international' }),
      },
      product: {
        id: nanoid(),
        title: faker.commerce.productName(),
      },
      amount: Number(faker.commerce.price({ min: 1000, max: 20000 })),
      orderId: `OID-${nanoid()}`,
      transactionId: `TSC-${nanoid()}`,
      method: 'UPI',
      tax: Number(faker.commerce.price({ min: 0, max: 50 })),
      createdAt: faker.date.anytime().toISOString(),
    };
  };

  const generateEmployees = () => {
    return {
      id: nanoid(),
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number({ style: 'international' }),
      gender: faker.person.gender(),
      salary: Number(faker.commerce.price({ min: 20000, max: 1000000 })),
      designation: getDesignation(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      pincode: Number(faker.location.zipCode()),
      createdAt: faker.date.anytime().toISOString(),
    };
  };

  const generateData = (values) => {
    const tmp = [];
    for (let i = 0; i < values.noOfData; i++) {
      if (values.data === 'users') {
        tmp.push(generateUser());
      } else if (values.data === 'products') {
        tmp.push(generateProducts());
      } else if (values.data === 'payments') {
        tmp.push(generatePayments());
      } else if (values.data === 'employees') {
        tmp.push(generateEmployees());
      } else {
        message.error('Match not found');
      }
    }

    const str = JSON.stringify(tmp, null, 4);
    setPayload(str);
  };

  const onCopy = () => {
    if (!payload) {
      message.warning('Nothing to copy');
      return;
    }
    navigator.clipboard.writeText(payload);
    message.success('Data copied!');
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 relative">
      {/* Floating GitHub button */}
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-800 transition"
      >
        <Github size={18} />
        <span className="hidden sm:block">GitHub</span>
      </a>

      <div className="w-9/12 mx-auto flex flex-col gap-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Dummy Data Generator</h1>
          <p className="text-gray-600 mt-2">
            Generate realistic dummy data for Users, Products, Payments, and Employees.
          </p>
        </div>

        <Card>
          <Form
            className="flex flex-col md:flex-row gap-8"
            layout="vertical"
            onFinish={generateData}
            initialValues={{ data: 'users', noOfData: 24 }}
          >
            <Form.Item
              label="Choose Data"
              name="data"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Select size="large" placeholder="Choose data">
                <Select.Option value="users">User</Select.Option>
                <Select.Option value="products">Products</Select.Option>
                <Select.Option value="payments">Payments</Select.Option>
                <Select.Option value="employees">Employees</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Number of Data"
              name="noOfData"
              rules={[{ required: true }]}
              className="w-full"
            >
              <InputNumber
                size="large"
                placeholder="Enter number of data"
                className="!w-full"
                max={100}
              />
            </Form.Item>

            <Form.Item label=" ">
              <Button htmlType="submit" size="large" type="primary">
                Generate
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {payload.length === 0 ? (
          <Empty description="Click generate button to get your first payload" />
        ) : (
          <Card
            title="Generated Data"
            extra={
              <Tooltip title="Copy data">
                <Copy onClick={onCopy} style={{ cursor: 'pointer' }} />
              </Tooltip>
            }
          >
            <SyntaxHighlighter
              language="javascript"
              style={a11yDark}
              showLineNumbers
            >
              {payload}
            </SyntaxHighlighter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;
