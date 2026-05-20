import { NextResponse } from "next/server";
import { createAiWorkflowResponse, type AiRequest } from "@/features/ai/services/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AiRequest;
    const response = await createAiWorkflowResponse(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "AI request failed" },
      { status: 500 }
    );
  }
}

