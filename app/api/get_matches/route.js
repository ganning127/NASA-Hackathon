import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import OpenAI from "openai";

/**
 *
 * @param {numMatches, description} request in JSON format in body
 * @returns semantic search for projects based on description
 *
 */
export async function GET(request) {
  try {
    const params = await request.nextUrl.searchParams;
    const supabase = createRouteHandlerClient({ cookies: () => cookies() });

    // create embedding here
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: params.get("description"),
    });
    const { data, error } = await supabase.rpc("match_documents_1", {
      query_embedding: embedding.data[0].embedding,
      match_threshold: 0.78,
      match_count: params.get("numMatches"),
    });
    console.log(data, error);
    if (error) {
      throw new Error(error);
    }
    console.log(data);
    return new NextResponse({ status: 200, body: data });
  } catch (error) {
    console.log("errored");
    return new NextResponse({ status: 500, body: error });
  }
}
