import React, { useMemo } from "react";
import { Card, Empty, Button, Typography, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { BookingItemType } from "../../types/BookingType";
import "./BookingItem.scss";
import { useCreateEditBookingContext } from "../../contexts/CreateEditBookingContext";

const { Text } = Typography;

const BookingItem = ({
  info,
  selectedDate,
}: {
  info?: BookingItemType;
  selectedDate: Dayjs;
}) => {
  const { openDetails } = useCreateEditBookingContext();
  const title = useMemo(
    () => (info?.phone ? `${info.name}, ${info.phone}` : info?.name),
    [info]
  );
  if (info)
    return (
      <Card
        title={title}
        className="cardStyle"
        extra={
          <Button
            icon={<EditOutlined />}
            type="text"
            shape="circle"
            onClick={() => openDetails(info)}
          />
        }
      >
        <Space direction="vertical">
          <Text>Date: {info.date}</Text>
          <Text>
            Address: {info.address} {info.place}
          </Text>
          {info.updatedAt && (
            <Text type="secondary">{`Last updated: ${dayjs
              .unix(info.updatedAt)
              .format("DD-MMM-YYYY")}`}</Text>
          )}
        </Space>
      </Card>
    );
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description={`${selectedDate.format("DD MMM YYYY, dddd")} is available.`}
    >
      <Button type="primary" onClick={() => openDetails(info, selectedDate)}>
        Book Now
      </Button>
    </Empty>
  );
};

export default BookingItem;
