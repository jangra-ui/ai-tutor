// Import OpenAI library to talk to ChatGPT
import OpenAI from "openai";

// Create OpenAI client. It uses the secret key from Vercel
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // We will add this key in Vercel later
});

// This function runs when frontend calls "/api/tutor"
export async function POST(request) {
  // Get the question that user sent from frontend
  const { question } = await request.json();

  // Ask OpenAI to answer like a tutor for kids
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // This is a cheap + fast AI model
    messages: [
      { role: "system", content: "You are a friendly tutor for school students. Explain simply and give 3 practice questions at the end." },
      { role: "user", content: question } // The student's question
    ],
  });

  // Get the AI's answer text
  const answer = completion.choices[0].message.content;

  // Send the answer back to the frontend as JSON
  return Response.json({ answer });
}
