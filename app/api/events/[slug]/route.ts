import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

// Route context type for dynamic segment
interface RouteContext {
  params: Promise<{ slug: string }>;
}

// Standard API response structure
interface ApiResponse<T = null> {
  message: string;
  event?: T;
  error?: string;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug.
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext
): Promise<NextResponse<ApiResponse<IEvent>>> {
  try {
    // Extract and validate slug parameter
    const { slug } = await context.params;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { message: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    // Sanitize slug: lowercase, trim, allow only valid slug characters
    const sanitizedSlug = slug.toLowerCase().trim();
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    if (!slugPattern.test(sanitizedSlug)) {
      return NextResponse.json(
        { message: 'Invalid slug format' },
        { status: 400 }
      );
    }

    // Establish database connection
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean<IEvent>();

    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Event fetched successfully', event },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching event by slug:', error);

    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
