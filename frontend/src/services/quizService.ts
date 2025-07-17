import { FormSchema } from "@/validation/quizSchema";

export async function createQuiz(data: FormSchema) {
  try {
    const res = await fetch("http://localhost:3001/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        console.error("Error:", json);
        throw new Error(json.message || JSON.stringify(json));
      } catch {
        console.error("Non-JSON Error:", text);
        throw new Error(text);
      }
    }
    alert("Successfully");
    return await res.json();
  } catch (error: any) {
    console.error("Submission error:", error);
    throw error;
  }
}

export async function getQuizzes() {
  try {
    const res = await fetch("http://localhost:3001/quizzes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Submission error:", error);
    throw error;
  }
}

export async function getQuiz(id: string) {
  try {
    const res = await fetch(`http://localhost:3001/quizzes/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Submission error:", error);
    throw error;
  }
}

export async function delQuiz(id: string) {
  try {
    const res = await fetch(`http://localhost:3001/quizzes/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }

    if (res.ok) {
      alert("Successfully");
    }
  } catch (error: any) {
    console.error("Submission error:", error);
    throw error;
  }
}
