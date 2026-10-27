


export default function Home() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-10 text-gray-900 dark:text-gray-100">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Template for Next.js projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Plantilla base para crear aplicaciones modernas con Next.js.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Includes the following</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-4">
            <h3 className="mb-3 font-semibold">Base</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>Framework JS/TS: Next.js 16.3+</li>
              <li>Framework CSS: Tailwind CSS 4</li>
            </ul>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="mb-3 font-semibold">UI</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>Icons: lucide-react</li>
              <li>Light/Dark mode: next-themes</li>
              <li>Components: simpleui</li>
            </ul>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="mb-3 font-semibold">Database</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>ORM: Prisma 7</li>
              <li>SQLite</li>
              <li>PostgreSQL</li>
            </ul>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="mb-3 font-semibold">Authentication</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>NextAuth 5</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Download</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Ejecuta los siguientes comandos para crear e instalar el proyecto.
        </p>

        <pre className="overflow-x-auto rounded-xl bg-gray-950 p-4 text-sm text-gray-100">
          <code>{`npx giget gh:jamj2000/next-starter mi-app
cd mi-app
npm install`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Database</h2>

        <ol className="list-decimal space-y-4 pl-5">
          <li>
            Define las variables de entorno en el archivo{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800">
              .env
            </code>
            .
          </li>

          <li>
            Ajusta la configuración en los siguientes archivos:
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <code>src/lib/prisma.js</code>
              </li>
              <li>
                <code>prisma/schema.prisma</code>
              </li>
              <li>
                <code>prisma/seed.mjs</code>
              </li>
            </ul>
          </li>

          <li>
            Ejecuta los comandos de Prisma:
            <pre className="mt-3 overflow-x-auto rounded-xl bg-gray-950 p-4 text-sm text-gray-100">
              <code>{`npx prisma db push
npx prisma generate
npx prisma db seed`}</code>
            </pre>
          </li>
        </ol>
      </section>
    </main>
  );
}


