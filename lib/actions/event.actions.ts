'use server';

import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();

        const event = await Event.findOne({ slug });

        if (!event) {
            return [];
        }

        // Handle missing or empty tags
        const eventTags = Array.isArray(event.tags) && event.tags.length > 0 ? event.tags : [];
        
        if (eventTags.length === 0) {
            return [];
        }

        const similarEvents = await Event.find({ _id: { $ne: event._id }, tags: { $in: eventTags } }).lean();

        return similarEvents.map((e) => ({
            ...e,
            _id: e._id.toString(),
            createdAt: e.createdAt?.toISOString?.() ?? e.createdAt,
            updatedAt: e.updatedAt?.toISOString?.() ?? e.updatedAt,
        }));
    } catch {
        return [];
    }
}