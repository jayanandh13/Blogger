import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel"; 
import { NextResponse } from "next/server"; 

// POST: Add a new email subscription
export async function POST(request) {
  try {
    await ConnectDB(); 

    const formData = await request.formData();
    const email = formData.get('email');

    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ success: false, msg: "Invalid email address" }, { status: 400 });
    }

    const emailData = { email };
    await EmailModel.create(emailData);

    return NextResponse.json({ success: true, msg: "Email subscribed successfully" });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ success: false, msg: "Failed to subscribe email", error: error.message }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    await ConnectDB(); 
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
  } catch (error) {
    return NextResponse.json({ success: false, msg: 'Error fetching emails', error: error.message }, { status: 500 });
  }
}

// DELETE: Delete an email by ID
export async function DELETE(request) {
  try {
    await ConnectDB(); 
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, msg: 'ID is required' }, { status: 400 });
    }

    const deletedEmail = await EmailModel.findByIdAndDelete(id);
    if (!deletedEmail) {
      return NextResponse.json({ success: false, msg: 'Email not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, msg: 'Email deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, msg: 'Error deleting email', error: error.message }, { status: 500 });
  }
}
