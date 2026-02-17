export default function PrivateLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Cargando…</p>
      </div>
    </div>
  );
}
