"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-3 text-white/70">{error.message || "Unexpected application error"}</p>
      <button onClick={() => reset()} className="mt-6 rounded-lg bg-white px-4 py-2 text-black">
        Try again
      </button>
    </main>
  );
}
