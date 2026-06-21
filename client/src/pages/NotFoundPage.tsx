import { Link } from "react-router-dom";
import { FileX2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, oklch(0.72 0.19 145 / 0.06) 0%, transparent 70%)",
        }}
      />

      <FileX2
        className="w-12 h-12 mb-6"
        style={{ color: "oklch(0.72 0.19 145 / 0.7)" }}
      />

      <h1 className="text-6xl font-bold tracking-tight text-foreground">
        404
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        Page not found
      </p>

      <Button
        asChild
        className="mt-8 font-semibold"
        style={{
          background: "oklch(0.72 0.19 145)",
          color: "oklch(0.07 0 0)",
          boxShadow: "0 0 16px oklch(0.72 0.19 145 / 0.3)",
        }}
      >
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
}
