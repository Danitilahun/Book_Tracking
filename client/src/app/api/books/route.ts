import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(process.env.PATH_URL_BACKEND + "/books", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    console.log("Received result:", result);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const res = await fetch(process.env.PATH_URL_BACKEND + "/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
