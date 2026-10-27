'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { Job } from "../types/types";

type JobsContextValue = {
    jobs: Job[];
    updateJobs: () => Promise<void>;
    sendJobToClassification: (value: string) => Promise<void>;
}

const JobsContext = createContext<JobsContextValue | null>(null);

export function JobsProvider({ children }: { children: React.ReactNode }) {
    const [jobs, setJobs] = useState<Job[]>([]);

    const updateJobs = async () => {
        try {
            const res = await fetch('/api/jobs');
            if (!res.ok) {
                throw new Error(`Failed to fetch jobs: ${res.statusText}`);
            }
            const data: Job[] = await res.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }

    const sendJobToClassification = async (value: string) => {
        if (!value) return console.error("Campo vazio");

        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                body: JSON.stringify({ prompt: value })
            })

            if (!res.ok) {
                throw new Error("Erro ao classificar vaga.")
            }

            await updateJobs();
        } catch (error) {
            console.error("Error ao Classificar vaga:", error)
        }
    }

    useEffect(() => {
        updateJobs();
    }, [])

    return (
        <JobsContext value={{ jobs, updateJobs, sendJobToClassification }}>
            {children}
        </JobsContext>
    )
}

export function useJobs() {
    const ctx = useContext(JobsContext);
    if (!ctx) throw new Error("useJobs must be used inside JobsProvider");
    return ctx;
}
