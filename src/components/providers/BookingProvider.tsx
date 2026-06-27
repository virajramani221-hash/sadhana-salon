"use client";

import React, { createContext, useContext, useState } from "react";
import { BookingModal } from "../ui/BookingModal";

interface BookingContextType {
  openBooking: () => void;
  closeBooking: () => void;
  isBookingOpen: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, isBookingOpen }}>
      {children}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
