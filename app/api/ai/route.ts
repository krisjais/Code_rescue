import { NextResponse } from "next/server";
import { createAiWorkflowResponse, type AiRequest } from "@/features/ai/services/server";

export async function POST(request: Request) {
  const body = (await request.json()) as AiRequest;

  try {
    return NextResponse.json(createAiWorkflowResponse(body));
  } catch {
    return NextResponse.json({ error: "Missing AI mode" }, { status: 400 });
  }
}
