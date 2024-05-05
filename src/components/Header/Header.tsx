import React from "react";
import { Button, Typography } from "antd";
import "./Header.scss";
import { useCreateEditBookingContext } from "../../contexts/CreateEditBookingContext";

const { Title } = Typography;
const Header = () => {
  const { openDetails } = useCreateEditBookingContext();
  return (
    <div className="header">
      <Title level={3}>Sri Venkateshwara Kalyana Mantapa</Title>
      <Button onClick={() => openDetails()}>New Booking</Button>
    </div>
  );
};

export default Header;
