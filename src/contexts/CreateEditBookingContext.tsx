import React, {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
} from "react";
import { Dayjs } from "dayjs";
import { BookingItemType } from "../types/BookingType";

interface createEditBookingContextData {
  isOpen: boolean;
  data?: BookingItemType;
  selectedDate?: Dayjs;
}

interface createEditBookingContextProps extends createEditBookingContextData {
  openDetails: (data?: BookingItemType, selectedDate?: Dayjs) => void;
  closeDetails: () => void;
}

export const CreateEditBookingContext =
  createContext<createEditBookingContextProps>({
    isOpen: false,
  } as createEditBookingContextProps);

export const useCreateEditBookingContext = (): createEditBookingContextProps =>
  useContext(CreateEditBookingContext);

const CreateEditBookingContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<BookingItemType | undefined>();
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>();

  const openDetails = (data?: BookingItemType, selectedDate?: Dayjs) => {
    setData(data);
    setSelectedDate(selectedDate);
    setIsOpen(true);
  };
  const closeDetails = () => {
    setIsOpen(false);
  };
  return (
    <CreateEditBookingContext.Provider
      value={{ isOpen, data, openDetails, closeDetails, selectedDate }}
    >
      {children}
    </CreateEditBookingContext.Provider>
  );
};

export default CreateEditBookingContextProvider;
