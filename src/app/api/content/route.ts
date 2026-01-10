import { NextRequest, NextResponse } from 'next/server';
import { verifyHRToken } from '@/lib/hr-auth';
import { getContent, saveContent } from '@/lib/content';

// GET - Fetch all content
export async function GET() {
  try {
    const content = getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// PUT - Update content (requires authentication)
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('admin_token')?.value;
    if (!token || !verifyHRToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { page, data } = body;

    if (!page || !data) {
      return NextResponse.json(
        { error: 'Page and data are required' },
        { status: 400 }
      );
    }

    const content = getContent();

    // Type-safe update
    if (page in content) {
      (content as unknown as Record<string, unknown>)[page] = data;
      saveContent(content);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid page' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
