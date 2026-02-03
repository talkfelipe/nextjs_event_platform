import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Compound index for preventing duplicate bookings (optional but recommended)
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Pre-save hook to validate that the referenced event exists
BookingSchema.pre('save', async function () {
  const booking = this as IBooking;

  // Only validate eventId if it's modified or new
  if (booking.isModified('eventId')) {
    const eventExists = await Event.findById(booking.eventId);

    if (!eventExists) {
      throw new Error('Referenced event does not exist');
    }
  }
});

// Prevent model recompilation in development (Next.js hot reload)
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
