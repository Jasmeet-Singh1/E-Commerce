import connectToDb from '@/database';
import User from '@/models/user';
import { compare } from 'bcryptjs';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export async function POST(req) {
  await connectToDb();

  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: email.details[0].message,
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: 'No Account Found',
      });
    }
    const checkPassword = await compare(password, checkUser.password);

    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: 'Incorrect Password',
      });
    }
    const token = jwt.sign(
      {
        id: checkUser?._id,
        email: checkUser?.email,
        role: checkUser?.role,
      },
      'default_secret_key',
      { expiresIn: '1d' }
    );

    const finalData = {
      token,
      user: {
        email: checkUser?.email,
        name: checkUser?.name,
        _id: checkUser?._id,
        role: checkUser?.role,
      },
    };

    return NextResponse.json({
      success: true,
      message: 'Login Successfully',
      finalData,
    });
  } catch (e) {
    console.log(e, 'Error while logging in !');

    return NextResponse.json({
      success: false,
      message: 'Something Went Wrong ! ',
    });
  }
}
