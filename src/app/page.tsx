import Link from "next/link";

import { Button } from "@/component/ui/button";
import { RouteNames } from "@/constants";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24">
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to Fullstack Source
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Template for automation projects with a modern UI. Start by signing in
          or explore the codebase.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild>
            <Link href={RouteNames.Login}>Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
