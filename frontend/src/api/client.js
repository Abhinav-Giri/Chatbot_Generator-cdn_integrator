
const API_BASE_URL = "http://localhost:4000";

export async function generateChatbot({ email, websiteUrl }) {
  const res = await fetch(`${API_BASE_URL}/api/generate-chatbot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, websiteUrl }),
  });

  if (!res.ok) {
    let message = "Failed to generate chatbot. Please try again.";
    try {
      const errorBody = await res.json();
      if (errorBody && errorBody.error) {
        message = errorBody.error;
      }
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }

  const data = await res.json();

  if (
    !data ||
    typeof data.sdnToken !== "string" ||
    typeof data.embedScript !== "string" ||
    typeof data.embedJsContent !== "string"
  ) {
    throw new Error("Invalid response from server");
  }

  return data;
}
