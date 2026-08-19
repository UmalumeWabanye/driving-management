import { useState } from "react";
import { signIn } from "../lib/auth";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 
px-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-8 
shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold">
            Elite Driving Academy
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full rounded-md border bg-background px-3 py-2 
outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-md border bg-background px-3 py-2 
outline-none focus:ring-2"
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm 
text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 
text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
