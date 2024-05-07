import React, { useEffect } from "react";
import { Form, DatePicker, Input, Button, Modal, Flex } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { fireStoreDb } from "../../firebase/config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useCreateEditBookingContext } from "../../contexts/CreateEditBookingContext";

const NewBooking = ({ bookedDates }: { bookedDates: number[] }) => {
  const { isOpen, data, closeDetails, selectedDate } =
    useCreateEditBookingContext();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const bookingDate = values.date as Dayjs;
    const objToSave = {
      ...values,
      date: bookingDate.format("DD MMM YYYY, dddd"),
      bookingDate: bookingDate.startOf("d").unix(),
      updatedAt: dayjs().unix(),
    };
    if (data) {
      await setDoc(doc(fireStoreDb, "booking", data.id), objToSave);
    } else {
      await addDoc(collection(fireStoreDb, "booking"), {
        ...objToSave,
        createdAt: dayjs().unix(),
      });
    }
    form.setFieldsValue({});
    closeDetails();
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, date: dayjs.unix(data.bookingDate) });
    } else {
      form.setFieldsValue({
        date: selectedDate,
        name: "",
        address: "",
        place: "",
        phone: "",
      });
    }
  }, [data, form, selectedDate]);
  return (
    <Modal
      open={isOpen}
      title={data ? "Update Booking" : "New Booking"}
      footer={null}
      closable={false}
      destroyOnClose={true}
    >
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Date"
          name="date"
          rules={[
            { required: true },
            () => ({
              validator(_, value) {
                if (
                  !(data && data.id) &&
                  value &&
                  bookedDates.includes(value.startOf("D").unix())
                ) {
                  return Promise.reject(
                    new Error("This date is not available!")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <DatePicker disabled={!!data} />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input type="tel" pattern="[0-9]{10}" />
        </Form.Item>
        <Form.Item
          label="Place"
          name="place"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: "8px",
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={() => {
                form.setFieldsValue({});
                closeDetails();
              }}
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewBooking;
