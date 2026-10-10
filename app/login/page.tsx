import { LoginForm } from '@/components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = { title: "Sign In", robots: { index: false } };

export default async function LoginPage(props: {
  searchParams?: Promise<{ callbackUrl?: string }>;
}) {
  const searchParams = await props.searchParams;
  const redirectTo = searchParams?.callbackUrl ?? '/meetings';

  return (
    <main className="mx-auto w-full max-w-sm px-6 py-10">
      <h2 className="text-2xl font-semibold text-foreground">Sign In</h2>
      <LoginForm redirectTo={redirectTo} />
    </main>
  );
}