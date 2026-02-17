import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-white/70">This route does not exist in the deployed app.</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-white px-4 py-2 text-black">
        Back to homepage
      </Link>
    </main>
  );
}
