import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
   try {
    console.log(request);
    console.log("work till here");
    
    
    const userId = await getDataFromToken(request)
    console.log(userId);
    
    console.log("work till here");
    
    const user =await User.findById(userId).select("-password")
    console.log(user);
     
     if(!user){
         return NextResponse.json({ error: 'User not found with current token' }, { status: 404 })
     }
     return NextResponse.json({ 
        message:"User fetched successfully",
        success:true,
        data:user
    } )
   } catch (error: any) {
     return NextResponse.json({ error: error.message }, { status: 500 })
    
   }

}