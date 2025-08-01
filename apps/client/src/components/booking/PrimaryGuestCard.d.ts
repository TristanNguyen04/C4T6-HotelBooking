import React from 'react';
import type { GuestDetails } from '../../types/hotel';
interface PrimaryGuestCardProps {
    onGuestDetailsChange: (guestDetails: GuestDetails) => void;
    initialData?: Partial<GuestDetails>;
}
declare const PrimaryGuestCard: React.FC<PrimaryGuestCardProps>;
export default PrimaryGuestCard;
