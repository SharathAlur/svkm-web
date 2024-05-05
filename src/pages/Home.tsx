import React, { useCallback, useEffect, useState } from "react";
import { Calendar, Spin, Select, Typography, Row, Col } from "antd";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { BookingItemType } from "../types/BookingType";
import { fireStore } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import "./Home.scss";
import BookingItem from "../components/BookingItem/BookingItem";
import NewBooking from "../components/NewBooking/NewBooking";

dayjs.extend(localeData);

const Home = () => {
  const [data, setData] = useState<BookingItemType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [bookedDates, setBookedDates] = useState<number[]>([]);

  useEffect(() => {
    setLoading(true);
    const citiesCol = collection(fireStore, "booking");
    onSnapshot(citiesCol, (snapshot) => {
      const bookings = snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as BookingItemType)
      );
      setData(bookings);
      setBookedDates(bookings.map((doc) => doc.bookingDate));
      setLoading(false);
    });
  }, []);

  const getData = useCallback(
    (value: Dayjs) => {
      if (data) {
        const valueUnix = value.startOf("d").unix();
        return data.find((d: BookingItemType) => d.bookingDate === valueUnix);
      }
      return undefined;
    },
    [data]
  );
  const cellRender = (current: Dayjs, info: any) => {
    if (info.type === "date") {
      const booked = bookedDates.includes(current.startOf("d").unix());
      return <div className={booked ? "selectedDate" : ""} />;
    }
    return info.originNode;
  };
  return (
    <div className="home">
      {loading && <Spin fullscreen />}
      <Calendar
        className="homeCalender"
        fullscreen={false}
        cellRender={cellRender}
        onChange={setSelectedDate}
        headerRender={({ value, onChange }) => {
          let current = value.clone();
          const localeData = value.localeData();
          const monthOptions = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {localeData.monthsShort(current)}
              </Select.Option>
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div className="header">
              <Select
                size="small"
                className="my-year-select"
                value={year}
                onChange={(newYear) => {
                  const now = value.clone().year(newYear);
                  onChange(now);
                }}
              >
                {options}
              </Select>
              <Select
                size="small"
                value={month}
                onChange={(newMonth) => {
                  const now = value.clone().month(newMonth);
                  onChange(now);
                }}
              >
                {monthOptions}
              </Select>
            </div>
          );
        }}
      />
      <BookingItem info={getData(selectedDate)} selectedDate={selectedDate} />
      <NewBooking bookedDates={bookedDates} />
    </div>
  );
};

export default Home;
