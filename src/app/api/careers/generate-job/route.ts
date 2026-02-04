import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, keywords } = await request.json();

    if (!title && !keywords) {
      return NextResponse.json(
        { error: "Please provide a title or keywords" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const prompt = `Generate a job posting for Curanova AI (healthcare AI company) as JSON:

Title: ${title || "Not specified"}
Keywords: ${keywords || "Not specified"}

Return ONLY this JSON (no markdown):
{
  "title": "Job title",
  "department": "Department name",
  "description": "2 short paragraphs about the role (max 150 words total)",
  "requirements": ["req1", "req2", "req3", "req4", "req5"]
}

Keep description concise. Include 5 requirements.`;

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    let response: Response;
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            },
          }),
          signal: controller.signal,
        }
      );
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timed out. Please try again." },
          { status: 504 }
        );
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);

      // Check for rate limit error
      if (errorData.error?.code === 429) {
        return NextResponse.json(
          { error: "API rate limit exceeded. Please wait a moment and try again." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Failed to generate content" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return NextResponse.json(
        { error: "No content generated" },
        { status: 500 }
      );
    }

    // Parse the JSON from the response
    try {
      // Remove any markdown code blocks if present
      const cleanedText = generatedText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      const jobData = JSON.parse(cleanedText);
      return NextResponse.json({ job: jobData });
    } catch {
      console.error("Failed to parse generated content:", generatedText);
      return NextResponse.json(
        { error: "Failed to parse generated content" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Generate job error:", error);
    return NextResponse.json(
      { error: "Failed to generate job" },
      { status: 500 }
    );
  }
}
