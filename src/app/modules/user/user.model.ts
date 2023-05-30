import { Model, Schema, model } from 'mongoose';
import IUser from './user.interface';

type UserModal = Model<IUser, object>;

const userSchema = new Schema<IUser>(
   {
      id: {
         type: String,
         unique: true,
         required: true
      },
      role: {
         type: String,
         required: true
      },
      password: {
         type: String,
         required: true
      }
   },
   {
      timestamps: true
   }
);

export const User = model<UserModal>('Users', userSchema);
