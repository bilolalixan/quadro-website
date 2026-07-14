import { loginAction } from "@/app/admin/actions";
import { QuadroLogo } from "@/components/quadro-logo";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        action={loginAction}
        className="w-full max-w-sm rounded-sm border border-maroon/10 bg-cream-soft p-8 sm:p-10"
      >
        <QuadroLogo className="h-6 w-auto text-maroon" />
        <h1 className="mt-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
          Вход в админ-панель
        </h1>

        <input
          type="password"
          name="password"
          required
          placeholder="Пароль"
          autoFocus
          className="mt-8 w-full border-b border-maroon/25 bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/50 focus:border-maroon"
        />

        {error && (
          <p className="mt-3 text-sm font-medium text-red-700">
            Неверный пароль
          </p>
        )}

        <button
          type="submit"
          className="mt-8 inline-flex w-full items-center justify-center gap-3 border-b border-maroon pb-1 text-xs font-semibold uppercase tracking-widest text-maroon transition-opacity hover:opacity-70"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
