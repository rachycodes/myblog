import { NextResponse } from 'next/server';
import { writeClient } from '../../../../../sanity/writeClient';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 👇 unwrap the params Promise
  const { id } = await params;

  console.log('LIKE route hit, id =', id);

  try {
    const updated = await writeClient
      .patch(id)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit();

    console.log('Updated likes to:', updated.likes);

    return NextResponse.json({ likes: updated.likes }, { status: 200 });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json(
      { error: 'Error updating likes' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
