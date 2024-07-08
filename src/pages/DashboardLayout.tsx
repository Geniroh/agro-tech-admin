import React, { useState } from "react";
import {
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Layout, Menu, Dropdown } from "antd";
import { useAuth } from "../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";
import { IoCaretDownOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { CiViewList } from "react-icons/ci";

//eslint-disable-next-line
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: <Link to="innovations">Innovations</Link>,
    icon: <FaRegLightbulb />,
  },
  {
    key: "sub2",
    label: <Link to="posts">Featured Posts</Link>,
    icon: <FileOutlined />,
    children: [
      {
        key: "chid1",
        label: <Link to="posts/add">Add New</Link>,
        icon: <FaPlus />,
      },
      {
        key: "chid2",
        label: <Link to="posts">View all</Link>,
        icon: <CiViewList />,
      },
    ],
  },
  {
    type: "divider",
  },
];

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const settings: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type="text" onClick={logout} icon={<IoIosLogOut />}>
          {" "}
          Logout{" "}
        </Button>
      ),
    },
  ];

  return (
    <Layout className="h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-white fixed h-screen overflow-y-auto"
        theme="light"
        style={{ background: "#F5F5F5" }}
        trigger={null}
        collapsedWidth={0}
      >
        <div className="flex justify-center mt-3">
          <img src="/images/green-logo.png" alt="logo" className="h-[40px]" />
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          className="mt-10"
          style={{ background: "transparent" }}
        />
      </Sider>
      <Layout>
        <Header className="flex items-center p-0 justify-between bg-[#F5F5F5] pr-3 md:pr-5">
          <div className="flex items-center gap-6">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <div className="font-bold text-[22px] leading-[32px] tracking-wide">
              Dashboard
            </div>
          </div>

          <div>
            <Dropdown menu={{ items: settings }} placement="bottomRight" arrow>
              <div className="flex items-center gap-1 cursor-pointer">
                <Avatar size="default" className="uppercase bg-primary">
                  {user?.email[0]}
                </Avatar>
                <IoCaretDownOutline />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="bg-white p-3 md:p-5 overflow-y-auto">
          <div>
            <Outlet />
          </div>
          {/* <Footer style={{ textAlign: "center" }}>
            Stavmia ©{new Date().getFullYear()}
          </Footer> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
