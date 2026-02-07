import Link from "next/link";
import { ui } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm max-w-md">
        <h1 className="text-xl font-semibold text-neutral-900">{ui.notFound.title}</h1>
        <p className="mt-2 text-sm text-neutral-600">{ui.notFound.description}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-neutral-800"
        >
          {ui.notFound.goHome}
        </Link>
      </div>
    </div>
  );
}
