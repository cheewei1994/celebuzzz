import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const result = await db.query(
      `SELECT *
       FROM public.admins
       WHERE username = $1
       LIMIT 1`,
      [username],
    );

    const admin = result.rows[0] ?? null;

    if (!admin) {
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
