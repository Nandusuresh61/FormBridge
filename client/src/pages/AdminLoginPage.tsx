import { useState } from "react";
import { Lock, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No functionality yet — placeholder
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Subtle radial glow behind the card */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.72 0.19 145 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl"
            style={{
              background: "oklch(0.15 0 0)",
              border: "1px solid oklch(0.72 0.19 145 / 0.35)",
              boxShadow: "0 0 20px oklch(0.72 0.19 145 / 0.15)",
            }}
          >
            <Shield className="w-6 h-6" style={{ color: "oklch(0.72 0.19 145)" }} />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Admin Access
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to the FormBridge dashboard
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{
            background: "oklch(0.10 0 0)",
            border: "1px solid oklch(0.22 0 0)",
            boxShadow: "0 4px 32px oklch(0 0 0 / 0.5)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="text-xs font-medium text-muted-foreground uppercase tracking-widest"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "oklch(0.50 0 0)" }}
                />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@formbridge.io"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-9 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="text-xs font-medium text-muted-foreground uppercase tracking-widest"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "oklch(0.50 0 0)" }}
                />
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-9 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              id="admin-login-btn"
              type="submit"
              className="w-full font-semibold mt-1 cursor-pointer"
              style={{
                background: "oklch(0.72 0.19 145)",
                color: "oklch(0.07 0 0)",
                boxShadow: "0 0 16px oklch(0.72 0.19 145 / 0.35)",
                transition: "box-shadow 0.2s, opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 28px oklch(0.72 0.19 145 / 0.55)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 16px oklch(0.72 0.19 145 / 0.35)")
              }
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Restricted access — authorised personnel only
        </p>
      </div>
    </div>
  );
}
