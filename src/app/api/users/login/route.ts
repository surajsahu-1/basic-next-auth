import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEMail } from "@/helpers/mailer";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        console.log(user);
        

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{
            expiresIn: '1d'
        });

        const response = NextResponse.json({
            message:"Logged in successfully",
            success:true
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 });
    }
}