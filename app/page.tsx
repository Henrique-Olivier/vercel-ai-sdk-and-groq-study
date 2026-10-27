'use client';
import ListJobs from './components/ListJobs';
import JobsForm from './components/JobsForm';
import { JobsProvider } from './context/JobsContext';

export default function Chat() {
  return (
    <JobsProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <div className="mx-auto flex h-screen max-w-7xl flex-col gap-6 p-6 md:p-10">
          <header>
            <h1 className="text-2xl font-bold">Classificador de vagas</h1>
            <p className="text-sm text-gray-400">Cole a descrição de uma vaga e a IA extrai stack, senioridade e tecnologias.</p>
          </header>
          <main className="flex min-h-0 flex-1 flex-col gap-6 md:flex-row">
            <JobsForm />
            <ListJobs />
          </main>
        </div>
      </div>
    </JobsProvider>
  );
}
