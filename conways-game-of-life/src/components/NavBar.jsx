import { Layout, Menu, theme } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Header } = Layout;

const menuItems = [
  { label: "Home", key: "/" },
  { label: "Simulation", key: "/simulation" },
  { label: "Credits", key: "/credits" },
];

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{
            flex: 2,
            minWidth: 0,
          }}
          onClick={(item) => {
            navigate(item.key);
          }}
        />
      </Header>
    </Layout>
  );
};
