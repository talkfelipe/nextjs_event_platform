'use client';

import {useState} from "react";
import posthog from "posthog-js";
import {createBooking} from "@/lib/actions/booking.actions";

const BookEvent = ({eventId, slug}: { eventId: string; slug: string; }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {success, error} = await createBooking({eventId, slug, email})

        if (success) {
            setSubmitted(true);
            posthog.capture('event_booked', {eventId, slug, email})
        } else {
            console.error('Booking creation failed', error);
            posthog.capture('booking_error', { error });
        }

        // Track booking submission with non-PII data
        try {
            posthog.capture('book_event_submitted', {
                email_provided: Boolean(email),
                email_domain: email ? email.split('@')[1] : undefined,
            });
        } catch {
            // Fail silently to not break submission flow
        }

        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">Thank you for signing up!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <button type="submit" className="button-submit">Submit</button>
                </form>
            )}
        </div>
    )
}
export default BookEvent
