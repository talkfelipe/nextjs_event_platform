'use server';

import {Booking} from "@/database";
import connectDB from "@/lib/mongodb";


export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string; }) => {
    try {
        await connectDB();
        await Booking.create({ eventId, slug, email });

        return { success: true };
    } catch (e) {
        console.error('create booking failed', e);
        return { success: false, error: e instanceof Error ? e.message : 'Failed to create booking' };
    }
}