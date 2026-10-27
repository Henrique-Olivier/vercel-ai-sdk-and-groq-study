import { useState } from "react";
import { useJobs } from "../context/JobsContext";

export default function JobsForm() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const { sendJobToClassification } = useJobs();

    async function handleSubmit() {
        setLoading(true);
        await sendJobToClassification(input)
        setLoading(false);
        setInput("");
    }

    return (
        <form
            className='flex flex-col gap-3 rounded-xl border border-gray-800 bg-gray-900 p-5 md:w-1/3'
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <label htmlFor="job-description" className="text-sm font-medium text-gray-300">Descrição da vaga</label>
            <textarea
                id="job-description"
                className='min-h-48 flex-1 resize-none rounded-lg border border-gray-700 bg-gray-950 p-3 text-sm outline-none placeholder:text-gray-600 focus:border-blue-500'
                placeholder='Cole aqui o texto da vaga...'
                value={input}
                onChange={(e) => { setInput(e.target.value) }}
                disabled={loading}
            />
            <button
                className="rounded-lg bg-blue-600 py-2.5 font-medium transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading || !input.trim()}
            >
                {loading ? "Classificando..." : "Classificar vaga"}
            </button>
        </form>
    )
}
