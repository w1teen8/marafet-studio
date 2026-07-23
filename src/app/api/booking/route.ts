import { NextResponse } from "next/server";

interface BookingPayload {
  name?: string;
  phone?: string;
  instagram?: string;
  service?: string;
  master?: string;
  date?: string;
  time?: string;
  comment?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as BookingPayload;

  const required: (keyof BookingPayload)[] = ["name", "phone", "service", "date", "time"];
  const missing = required.filter((key) => !body[key]);

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Будь ласка, заповніть усі обов'язкові поля." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
