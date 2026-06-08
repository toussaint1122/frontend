import { api } from "./lib/api";

export default async function HomePage() {
  let message = "";

  try {
    await api.auth.register({
      name: "Test User",
      email: `test-${Date.now()}@example.com`,
      password: "secret123",
    });
    message = "Connected to the API successfully.";
  } catch (err) {
    message = err instanceof Error ? err.message : "Unknown error";
  }

  return (
{message}
  );
}