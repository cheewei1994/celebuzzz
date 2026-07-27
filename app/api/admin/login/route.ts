import { supabaseAdmin } from "@/lib/supabase-admin";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const { data: admin, error } = await supabaseAdmin
      .from("admins")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !admin) {
      return Response.json(
        {
          error: "帳號不存在",
        },
        {
          status: 401,
        },
      );
    }

    const valid = await bcrypt.compare(password, admin.password_hash);

    console.log("===== LOGIN DEBUG =====");
    console.log("username:", username);
    console.log("password:", password);
    console.log("db hash:", admin.password_hash);
    console.log("valid:", valid);

    if (!valid) {
      return Response.json(
        {
          error: "密碼錯誤",
        },
        {
          status: 401,
        },
      );
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });

    response.cookies.set("admin_token", "logged_in", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
