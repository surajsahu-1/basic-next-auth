import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEMail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        // Validation
        console.log(reqBody);
        const user = await User.findOne({ email: email });
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({ username, email, password: hashedPassword })
        const SavedUser = await newUser.save();
        console.log(SavedUser);

        // Send Verifacation email
        await sendEMail({ email, emailType: 'VERIFY', userId: SavedUser._id })

        return NextResponse.json({
            message: "User Registered",
            success: true,
            SavedUser
        });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const body = await req.json();
    const user = new User(body);
    await user.save();
    return NextResponse.json({ user });
}