import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import OpenAI from "openai";

/**
 *
 * @param {numMatches, description} request in JSON format in body
 * @returns semantic search for similar projects based on current project description
 *
 */
export async function GET(request) {
  
}
