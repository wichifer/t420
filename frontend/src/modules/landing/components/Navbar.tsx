// src/modules/landing/components/Navbar.tsx
export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <h1 className="text-xl font-bold">
          T420 ERP
        </h1>

        <a
          href="/login"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Iniciar sesión
        </a>
      </div>
    </header>
  );
}