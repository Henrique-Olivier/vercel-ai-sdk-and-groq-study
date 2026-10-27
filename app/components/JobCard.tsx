import { Job } from "../types/types";

export default function JobCard({ job }: { job: Job }) {
    return (
        <article className="flex flex-col gap-3 rounded-lg border border-gray-800 bg-gray-950 p-4 transition-colors hover:border-gray-600">
            <h3 className="font-semibold">{job.position.name}</h3>
            <div className="flex flex-wrap gap-2 text-xs font-medium">
                <span className="rounded-full bg-blue-500/15 px-2.5 py-1 capitalize text-blue-300">{job.position.seniority}</span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 capitalize text-emerald-300">{job.position.stack}</span>
            </div>
            <p className=" text-sm leading-relaxed text-gray-400">{job.resume}</p>
            {job.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {job.technologies.map(tech => (
                        <span key={tech} className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-300">{tech}</span>
                    ))}
                </div>
            )}
        </article>
    )
}
