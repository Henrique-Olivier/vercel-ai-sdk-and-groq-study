import { useJobs } from "../context/JobsContext";
import JobCard from "./JobCard";

export default function ListJobs() {
    const { jobs } = useJobs();

    return (
        <section className='flex min-h-0 flex-1 flex-col gap-3 rounded-xl border border-gray-800 bg-gray-900 p-5'>
            <h2 className="text-sm font-medium text-gray-300">Vagas classificadas ({jobs.length})</h2>
            {jobs.length === 0 ? (
                <p className="m-auto text-sm text-gray-500">Nenhuma vaga ainda. Envie uma descrição ao lado.</p>
            ) : (
                <div className="flex flex-col gap-3 overflow-y-auto pr-1">
                    {jobs.map(job => <JobCard key={job.id} job={job} />)}
                </div>
            )}
        </section>
    )
}
