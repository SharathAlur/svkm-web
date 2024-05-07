import React, { useState } from "react";
import { Button, Tooltip, Typography } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "./Header.scss";
import { useCreateEditBookingContext } from "../../contexts/CreateEditBookingContext";
import Login from "../../pages/Login/Login";
import { useLogOut } from "../../hooks/useLogOut";
import { useAuthContext } from "../../contexts/AuthContextProvider";

const { Title } = Typography;
const Header = () => {
  const { openDetails } = useCreateEditBookingContext();
  const [openLogin, setOpenLogin] = useState(false);
  const { logOut, contextHolder } = useLogOut();
  const { user } = useAuthContext();

  return (
    <div className="header">
      {contextHolder}
      <Title level={3}>Sri Venkateshwara Kalyana Mantapa</Title>
      <div>
        {user ? (
          <div
            style={{
              display: "flex",
              gap: "4px",
            }}
          >
            <Tooltip title="Add Booking">
              <Button
                type="link"
                icon={<PlusCircleOutlined color="blue" />}
                onClick={() => openDetails()}
              />
            </Tooltip>
            <Tooltip title="Logout">
              <Button
                type="text"
                danger
                icon={<LogoutOutlined />}
                onClick={logOut}
              />
            </Tooltip>
          </div>
        ) : (
          <Button
            icon={<LoginOutlined />}
            type="primary"
            ghost
            onClick={() => setOpenLogin(true)}
          >
            Login
          </Button>
        )}
      </div>
      <Login isOpen={openLogin} closeWindow={() => setOpenLogin(false)} />
    </div>
  );
};

export default Header;
