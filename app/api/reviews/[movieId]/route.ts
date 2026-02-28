import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/lib/cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6050";

async function authHeaders() {
  const token = await getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// GET /api/reviews/[movieId]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ movieId: string }> }
) {
  const { movieId } = await params;
  try {
    const res = await fetch(`${API_BASE}/api/reviews/${movieId}`, {
      headers: await authHeaders(),
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to reach API" }, { status: 502 });
  }
}

// POST /api/reviews/[movieId]
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ movieId: string }> }
) {
  const { movieId } = await params;
  try {
    const body = await req.json();
    const res = await fetch(`${API_BASE}/api/reviews/${movieId}`, {
      method: "POST",
      headers: await authHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to reach API" }, { status: 502 });
  }
}

// DELETE /api/reviews/[movieId]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ movieId: string }> }
) {
  const { movieId } = await params;
  try {
    const res = await fetch(`${API_BASE}/api/reviews/${movieId}`, {
      method: "DELETE",
      headers: await authHeaders(),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to reach API" }, { status: 502 });
  }
}