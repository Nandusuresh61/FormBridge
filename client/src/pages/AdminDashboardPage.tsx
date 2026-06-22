import { useAdminStore } from "../store/adminStore";
import { LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const { admin, logout } = useAdminStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.72 0.19 145 / 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <header
        className="border-b"
        style={{
          background: "oklch(0.10 0 0 / 0.8)",
          borderColor: "oklch(0.22 0 0)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{
                background: "oklch(0.15 0 0)",
                border: "1px solid oklch(0.72 0.19 145 / 0.35)",
              }}
            >
              <Shield className="w-4 h-4" style={{ color: "oklch(0.72 0.19 145)" }} />
            </div>
            <span className="font-semibold text-lg tracking-tight">
              FormBridge <span style={{ color: "oklch(0.72 0.19 145)" }}>Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Logged in as: <span className="font-medium text-foreground">{admin?.email}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back to the FormBridge admin console.
            </p>
          </div>

          {/* Empty Dashboard Card */}
          <div
            className="rounded-2xl p-8 text-center space-y-4 border border-dashed"
            style={{
              background: "oklch(0.10 0 0 / 0.3)",
              borderColor: "oklch(0.22 0 0)",
            }}
          >
            <div className="max-w-md mx-auto space-y-2">
              <h2 className="text-xl font-semibold">No Submissions Yet</h2>
              <p className="text-sm text-muted-foreground">
                This dashboard is currently empty. Once users start submitting forms, their responses will appear here.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
