import {Suspense} from "react";
import {notFound} from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import {IEvent} from "@/database";
import {getSimilarEventsBySlug} from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({icon, alt, label}: { icon: string; alt: string; label: string }) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17}/>
        <p>{label}</p>
    </div>
)

const parseArrayField = (field: string[]): string[] => {
    if (field.length !== 1) return field;
    try {
        const parsed = JSON.parse(`[${field[0]}]`);
        return Array.isArray(parsed) ? parsed : field;
    } catch {
        return field;
    }
};

const EventAgenda = ({agendaItems}: { agendaItems: string[] }) => {
    const items = parseArrayField(agendaItems);
    return (
        <div className="agenda">
            <h2>Agenda</h2>
            <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

const EventTags = ({tags}: { tags: string[] }) => {
    const items = parseArrayField(tags);
    return (
        <div className="flex flex-row gap-1.5 flex-wrap">
            {items.map((tag) => (
                <div className="pill" key={tag}>{tag}</div>
            ))}
        </div>
    );
}

// Loading skeleton for event details
const EventDetailsSkeleton = () => (
    <section id="event">
        <div className="header">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"/>
            <div className="h-4 w-full max-w-2xl bg-gray-200 rounded animate-pulse mt-2"/>
        </div>
        <div className="details">
            <div className="content">
                <div className="w-full aspect-video bg-gray-200 rounded animate-pulse"/>
                <div className="space-y-4 mt-4">
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"/>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"/>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"/>
                </div>
            </div>
            <aside className="booking">
                <div className="signup-card">
                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"/>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mt-2"/>
                </div>
            </aside>
        </div>
    </section>
);

// Async component that fetches and displays event data
const EventContent = async ({params}: { params: Promise<{ slug: string }> }) => {
    const {slug} = await params;
    const response = await fetch(`${BASE_URL}/api/events/${slug}`);

    if (!response.ok) return notFound();

    const {event} = await response.json();

    if (!event) return notFound();

    const {description, image, overview, date, time, location, organizer, mode, agenda, audience, tags} = event;

    const bookings = 10;

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>
            <div className="details">
                <div className="content">
                    <Image src={image} alt="Event Image" width={800} height={800} className="banner"/>

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>

                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date}/>
                        <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time}/>
                        <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location}/>
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode}/>
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience}/>
                    </section>

                    <EventAgenda agendaItems={agenda}/>

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags}/>
                </div>

                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">Join {bookings} people who have already booked their spot!</p>
                        ) : (
                            <p className="text-sm">Be the first to book your spot!</p>
                        )}

                        <BookEvent/>
                    </div>
                </aside>
            </div>

            <div className="flex w-full felx-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard key={similarEvent.title} {...similarEvent} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Main page component wraps content in Suspense
const EventDetailsPage = ({params}: { params: Promise<{ slug: string }> }) => {
    return (
        <Suspense fallback={<EventDetailsSkeleton/>}>
            <EventContent params={params}/>
        </Suspense>
    );
};

export default EventDetailsPage;
