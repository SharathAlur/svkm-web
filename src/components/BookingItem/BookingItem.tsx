import React, { useCallback, useMemo } from "react";
import {
  Card,
  Empty,
  Button,
  Typography,
  Space,
  Popconfirm,
  notification,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { fireStoreDb } from "../../firebase/config";
import { BookingItemType } from "../../types/BookingType";
import "./BookingItem.scss";
import { useCreateEditBookingContext } from "../../contexts/CreateEditBookingContext";
import { deleteDoc, doc } from "firebase/firestore";

const { Text } = Typography;

const BookingItem = ({
  info,
  selectedDate,
}: {
  info?: BookingItemType;
  selectedDate: Dayjs;
}) => {
  const { openDetails } = useCreateEditBookingContext();
  const [api, contextHolder] = notification.useNotification();

  const deleteItem = useCallback(
    (id: string) => {
      deleteDoc(doc(fireStoreDb, "booking", id))
        .then(() =>
          api.success({
            message: "Delete successful",
            description: `Successfully deleted the record with id: ${id}`,
          })
        )
        .catch((e) =>
          api.error({
            message: "Delete successful",
            description: `Successfully deleted the record with id: ${id}`,
          })
        );
    },
    [fireStoreDb]
  );

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
          <>
            <Button
              icon={<EditOutlined />}
              type="text"
              shape="circle"
              onClick={() => openDetails(info)}
            />
            {/* <Popconfirm
              title="Delete"
              description="Are you sure to delete this booking?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => deleteItem(info.id)}
            >
              <Button
                icon={<DeleteOutlined style={{ color: "red" }} />}
                type="text"
                shape="circle"
              />
            </Popconfirm> */}
          </>
        }
      >
        <Space direction="vertical">
          {contextHolder}
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
