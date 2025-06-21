import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action'; // ✅ cleaner path
import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextResponse } from 'next/server';

export async function POST(req: Request):Promise<Response> {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing WEBHOOK_SECRET in environment variables.');
  }

  // ✅ Await headers (you fixed this correctly)
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing required Svix headers.', { status: 400 });
  }

  // 📦 Parse body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // ✅ Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }

  const eventType = evt.type;

  // 🎯 Handle user.created
  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses?.[0]?.email_address ?? '',
      username: username ?? `user_${id.substring(0, 6)}`,
      firstName: first_name ?? '',
      lastName: last_name ?? '',
      photo: image_url,
    };

    const newUser = await createUser(user);

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: { userId: newUser._id },
      });
    }

    return NextResponse.json({ message: 'User created', user: newUser });
  }

  // 🎯 Handle user.updated
  if (eventType === 'user.updated') {
    const { id, image_url, first_name, last_name, username } = evt.data;

    const user = {
      firstName: first_name ?? '',
      lastName: last_name ?? '',
      username: username ?? `user_${id.substring(0, 6)}`,
      photo: image_url,
    };

    const updatedUser = await updateUser(id, user);
    return NextResponse.json({ message: 'User updated', user: updatedUser });
  }

  // 🎯 Handle user.deleted
  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    const deletedUser = await deleteUser(id!);
    return NextResponse.json({ message: 'User deleted', user: deletedUser });
  }

  console.log(`⚠️ Unhandled event type: ${eventType}`);
  return new Response(`Event ${eventType} not handled`, { status: 200 });
}
