import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEMail = async ({ email, emailType, userId }: any) => {
    try {
        console.log(email, emailType, userId,"IN EMAIL HELPER");
        
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        // console.log("work till here 1");
        
        // TODO configuration mail for usage
        if (emailType === 'VERIFY') {
            // console.log("work till here 2");
            await User.findByIdAndUpdate(userId, {
                $set:{
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                }
            }
        )
            // console.log("work till here 3");
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set:{
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            }
        )
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ce4de35f481e04",
                pass: "f06cd155cac2ae"
            }
        });
        // console.log("work till here 4");
        const mailOptions = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password', // Subject line
            html: `<p>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password'}
            or copy paste the link below in your browser
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
        }

        const mailresponse = await transport.sendMail(mailOptions)
        return mailresponse;



    } catch (error: any) {
        throw new Error(error.message);
    }
}