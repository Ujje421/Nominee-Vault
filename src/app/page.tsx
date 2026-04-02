import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to dashboard by default for now
  // Later this will check auth status and go to /login or /dashboard
  redirect('/dashboard');
}
