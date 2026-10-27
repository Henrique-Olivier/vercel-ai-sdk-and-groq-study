import { generateText, Output } from "ai";
import z from "zod";
import { groqInstance } from "@/providers/groq";

const schema = z.object({
    position: z.object({
        name: z.string().describe("The name of the position"),
        stack: z.enum(["frontend", "backend", "fullstack", "devops", "no info"]).describe("The stack of the position"),
        seniority: z.enum(["junior", "pleno", "senior", "no info"]).describe("The seniority of the position"),
    }),
    technologies: z.array(z.string()).describe("The technologies used in the position"),
    resume: z.string().describe("The resume of the position").max(500),
})

export const createClassification = async (prompt: string) => {
    const { text } = await generateText({
        model: groqInstance("openai/gpt-oss-20b"),
        prompt,
        output: Output.object({ schema }),
        instructions: "Classify the position based on the resume and return the classification in JSON format.",
    })

    return text
}

export async function POST(req: Request) {
    const { prompt }: { prompt: string } = await req.json();
    const text = await createClassification(prompt);
    console.log("Classification result:", text);
    try {
        const res = await fetch("http://localhost:3001/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: text,
        })

        if (!res.ok) {
            throw new Error(`Failed to post job: ${res.statusText}`);
        }
        return new Response(text, { status: 200 });
    } catch (error) {
        console.error("Error posting job:", error);
        return new Response(JSON.stringify({ error: "Failed to post job" }), { status: 500 });
    }
}

export async function GET() {
    try {
        let res = await fetch("http://localhost:3001/jobs")
        if (!res.ok) {
            throw new Error(`Failed to fetch jobs: ${res.statusText}`);
        }
        return Response.json(await res.json());
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch jobs" }), { status: 500 });
    }
}
