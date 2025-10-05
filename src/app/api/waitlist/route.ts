import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, company, companySize, challenge } = body;

    // Validate required fields
    if (!email || !company || !companySize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          email,
          company,
          company_size: companySize,
          challenge: challenge || null,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);

      // Handle duplicate email error
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist!" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Failed to submit form" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully added to waitlist", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
