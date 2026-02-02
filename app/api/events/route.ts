import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import { v2 as cloudinary } from 'cloudinary';
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        
        let event;
        let formData: FormData | null = null;

        try {
            const contentType = req.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                event = await req.json();
            } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
                formData = await req.formData();
                event = Object.fromEntries(formData.entries());
            } else {
                return NextResponse.json({ message: 'Unsupported Content-Type'}, { status: 400})
            }
        } catch (e) {
            return NextResponse.json({ message: 'Invalid data format'}, { status: 400})
        }

        // Normalize mode to lowercase to match enum
        if (event.mode && typeof event.mode === 'string') {
            event.mode = event.mode.toLowerCase();
        }

        const file = formData?.get('image') as File | null;

        if(!file) return NextResponse.json({ message: 'Image file is required'}, { status: 400})

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (error, results) => {
                if(error) return reject(error);

                resolve(results);
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;

        const createdEvent = await Event.create(event);

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201});
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'Unknown' }, { status: 500})
    }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: 'Event fetching failed', error: e }, { status: 500 });
    }
}