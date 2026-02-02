export type EventItem = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

export const events: EventItem[] = [
    {
        image: '/images/event1.png',
        title: 'Next.js Conf 2026',
        slug: 'nextjs-conf-2026',
        location: 'San Francisco, CA',
        date: 'Oct 25, 2026',
        time: '09:00 AM',
    },
    {
        image: '/images/event2.png',
        title: 'React Summit',
        slug: 'react-summit',
        location: 'Amsterdam, NL',
        date: 'Jun 14, 2026',
        time: '10:00 AM',
    },
    {
        image: '/images/event3.png',
        title: 'Web Summit 2026',
        slug: 'web-summit-2026',
        location: 'Lisbon, PT',
        date: 'Nov 11, 2026',
        time: '08:30 AM',
    },
    {
        image: '/images/event4.png',
        title: 'JSWorld Conference',
        slug: 'jsworld-conference',
        location: 'Amsterdam, NL',
        date: 'Feb 12, 2026',
        time: '09:00 AM',
    },
    {
        image: '/images/event5.png',
        title: 'Node Congress',
        slug: 'node-congress',
        location: 'Berlin, DE',
        date: 'Apr 17, 2026',
        time: '10:00 AM',
    },
    {
        image: '/images/event6.png',
        title: 'Vue.js Forge',
        slug: 'vuejs-forge',
        location: 'Online',
        date: 'May 20, 2026',
        time: '01:00 PM',
    },
];
