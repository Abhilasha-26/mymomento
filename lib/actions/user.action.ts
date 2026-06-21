'use server';

import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/lib/database';
import User from '../database/models/user.model';
import Order from '../database/models/order.model';
import Event from '../database/models/event.model';
import { handleError } from '../utils';

import { CreateUserParams, UpdateUserParams } from '../../types';

// CREATE USER
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// GET USER BY ID
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE USER
export async function updateUser(
  userId: string,
  userData: UpdateUserParams
) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      userData,
      { new: true }
    );

    if (!updatedUser) throw new Error('User update failed');

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE USER
export async function deleteUser(userId: string) {
  try {
    await connectToDatabase();

    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      throw new Error('User not found');
    }

    // remove user from events
    await Event.updateMany(
      { organizer: userId },
      { $unset: { organizer: 1 } }
    );

    // remove user from orders
    await Order.updateMany(
      { buyer: userId },
      { $unset: { buyer: 1 } }
    );

    const deletedUser = await User.findByIdAndDelete(userId);

    revalidatePath('/');

    return deletedUser
      ? JSON.parse(JSON.stringify(deletedUser))
      : null;
  } catch (error) {
    handleError(error);
  }
}