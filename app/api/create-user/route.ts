import { connectToDatabase } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await connectToDatabase();

    const newUser = await User.create({
      email: 'abhi@example.com',
      username: 'abhi26',
      firstName: 'Abhilasha',
      lastName: 'Khangar',
      photo: 'https://link-to-your-photo.jpg',
    });

    return NextResponse.json({
      success: true,
      user: newUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'This is the create-user route. Use POST to create a user.',
  });
}