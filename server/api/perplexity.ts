export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.public.PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant analyzing website screenshots. Given an image of a webpage, the user's intent, and the website URL, your task is to:\n1. Identify and describe key information visible in the screenshot.\n2. Infer potential user actions based on the content and user intent.\n3. List important page elements (e.g. forms, buttons, navigation).\n4. Provide an overall assessment of how well the page meets the user's intent.\nFocus on visual elements, text content, and page structure. Do not make assumptions about non-visible parts of the website. Be concise and specific in your analysis.",
        },
        ...body.messages,
      ],
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 0.95,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("API Error:", response.status, errorBody);
    throw createError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  }

  const data = await response.json();
  return data;
});
