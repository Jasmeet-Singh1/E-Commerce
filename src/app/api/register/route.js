import connectToDb from '@/database';
import Joi from 'joi';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { hash } from 'bcryptjs';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export async function POST(req) {
  await connectToDb();

  const { name, email, password, role } = await req.json();
  //Validate the Schema
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: email.details[0].message,
    });
  }
  try {
    //check if the user exist or not

    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: 'User Already Exists',
      });
    } else {
      const hashPassword = await hash(password, 12);

      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: 'Account Created Successfully',
        });
      }
    }
  } catch (error) {
    console.log(error, 'Error while new user registration');

    return NextResponse.json({
      success: false,
      message: 'Something Went Wrong ! ',
    });
  }
}
