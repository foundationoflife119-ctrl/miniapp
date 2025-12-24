export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: body.prompt || "Write a motivational book chapter." }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    return {
      statusCode: 200,
      body: JSON.stringify({ text })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
                  }
