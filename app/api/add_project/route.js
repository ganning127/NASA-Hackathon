import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import OpenAI from "openai";

/**
 *
 * @param {title, description, url, sponsor} request in JSON format in body
 * @returns the project added
 *
 */
export async function POST(request) {
  try {
    const { title, description, url, sponsor } = await request.json();
    const supabase = createRouteHandlerClient({ cookies: () => cookies() });
    // create embedding here
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: params.get("description"),
    });
    const project = {
      title: title,
      descrip: description,
      url: url,
      sponsor: sponsor,
      embedding: embedding.data[0].embedding,
    };
    console.log(project);
    const { data, error } = await supabase
      .from("nasa_db")
      .insert(project)
      .select();
    if (error) {
      throw new Error(error);
    }
    console.log(data);
    return new NextResponse({ status: 200, body: data });
  } catch (error) {
    return new NextResponse.error(error);
  }
}
