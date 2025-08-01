import React from 'react';
import type { BookingDetails } from '../../types/hotel';
interface BookingConfirmationProps {
    bookingDetails: BookingDetails;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}
declare const BookingConfirmation: React.FC<BookingConfirmationProps>;
export default BookingConfirmation;
