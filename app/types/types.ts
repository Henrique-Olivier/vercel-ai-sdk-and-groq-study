/*

position: z.object({
        name: z.string().describe("The name of the position"),
        stack: z.enum(["frontend", "backend", "fullstack", "devops", "no info"]).describe("The stack of the position"),
        seniority: z.enum(["junior", "pleno", "senior", "no info"]).describe("The seniority of the position"),
    }),
    technologies: z.array(z.string()).describe("The technologies used in the position"),
    resume: z.string().describe("The resume of the position"),
*/


export interface Job {
    position: {
        name: string;
        stack: "frontend" | "backend" | "fullstack" | "devops" | "no info";
        seniority: "junior" | "pleno" | "senior" | "no info";
    };
    technologies: string[];
    resume: string;
    id: string;
}

