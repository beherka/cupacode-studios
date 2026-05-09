'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router   = useRouter();
  const supabase = createClient();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <p className="font-mono text-2xl text-cupadev-400 mb-1">&gt;_ admin</p>
          <p className="text-sm text-gray-500">Accès réservé aux administrateurs</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-[#21262d] bg-[#0d1117] p-8 space-y-5"
          aria-label="Formulaire de connexion"
        >
          <div>
            <label htmlFor="email" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cupacode-studios.com"
              className={cn(
                'w-full rounded border bg-[#161b22] px-3.5 py-2.5 text-sm font-mono',
                'text-gray-100 placeholder:text-gray-600',
                'border-[#30363d] focus:border-cupadev-400 focus:outline-none transition'
              )}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  'w-full rounded border bg-[#161b22] px-3.5 py-2.5 pr-10 text-sm font-mono',
                  'text-gray-100 placeholder:text-gray-600',
                  'border-[#30363d] focus:border-cupadev-400 focus:outline-none transition'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                aria-label={showPwd ? 'Masquer' : 'Afficher'}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div role="alert" className="text-sm font-mono text-red-400 border border-red-900 bg-red-950 rounded px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn('w-full btn-studios justify-center py-2.5', loading && 'opacity-60 cursor-not-allowed')}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-xs font-mono text-gray-600 mt-6">
          <Link href="/" className="hover:text-gray-400 transition-colors">← retour au site</Link>
        </p>

      </div>
    </div>
  );
}
