import { useState, useEffect, useCallback } from "react";
import { useAdminStore } from "../store/adminStore";
import { adminApi } from "../services/Admin/admin.api";
import type { Submission } from "../types/admin.types";
import { countries } from "../data/countryData";
import {
  LogOut,
  Shield,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import SubmissionDetailModal from "../components/admin/SubmissionDetailModal";

export default function AdminDashboardPage() {
  const { admin, logout } = useAdminStore();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  // Handle Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch Submissions
  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApi.getSubmissions({
        page,
        limit,
        search: debouncedSearch,
        gender,
        nationality,
        sortBy,
        sortOrder,
      });
      if (response.success && response.data) {
        setSubmissions(response.data.submissions);
        setTotal(response.data.total);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error(response.message || "Failed to fetch submissions");
      }
    } catch (error) {
      console.error("Fetch submissions error", error);
      const message = error instanceof Error ? error.message : "Failed to fetch submissions";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, gender, nationality, sortBy, sortOrder]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      // Defer state update to next microtask tick to avoid calling setState synchronously during render phase
      await Promise.resolve();
      if (!active) return;
      fetchSubmissions();
    };
    load();
    return () => {
      active = false;
    };
  }, [fetchSubmissions]);

  const handleGenderChange = (value: string) => {
    setGender(value);
    setPage(1);
  };

  const handleNationalityChange = (value: string) => {
    setNationality(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setGender("");
    setNationality("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.72 0.19 145 / 0.04) 0%, transparent 70%)",
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Submissions</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Review and manage recent survey form submissions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSubmissions}
              disabled={loading}
              className="flex items-center gap-1.5 cursor-pointer text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            {(search || gender || nationality) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs hover:bg-white/5 cursor-pointer"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div
          className="rounded-2xl p-4 border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5"
          style={{
            background: "oklch(0.10 0 0 / 0.4)",
            borderColor: "oklch(0.20 0 0)",
          }}
        >
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9.5 bg-[#151515] border-[#222] focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/20 text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Gender Filter */}
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => handleGenderChange(e.target.value)}
              className="w-full h-9.5 pl-3.5 pr-8 bg-[#151515] border border-[#222] rounded-lg text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:border-[#22C55E]/50"
            >
              <option value="">Filter by Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Nationality Filter */}
          <div className="relative">
            <select
              value={nationality}
              onChange={(e) => handleNationalityChange(e.target.value)}
              className="w-full h-9.5 pl-3.5 pr-8 bg-[#151515] border border-[#222] rounded-lg text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:border-[#22C55E]/50"
            >
              <option value="">Filter by Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order as "asc" | "desc");
                setPage(1);
              }}
              className="w-full h-9.5 pl-3.5 pr-8 bg-[#151515] border border-[#222] rounded-lg text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:border-[#22C55E]/50"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="email-asc">Email (A-Z)</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Table Content */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            background: "oklch(0.10 0 0 / 0.2)",
            borderColor: "oklch(0.20 0 0)",
          }}
        >
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <RefreshCw className="h-8 w-8 text-[#22C55E] animate-spin" />
              <p className="text-sm text-muted-foreground">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="max-w-md mx-auto space-y-2">
                <h2 className="text-lg font-semibold text-white">No submissions found</h2>
                <p className="text-xs text-muted-foreground">
                  Try adjusting your search query or filters to find what you are looking for.
                </p>
                {(search || gender || nationality) && (
                  <Button
                    onClick={clearFilters}
                    size="sm"
                    className="mt-2 bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20 border-0 cursor-pointer"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr
                    className="border-b"
                    style={{
                      borderColor: "oklch(0.20 0 0)",
                      background: "oklch(0.10 0 0 / 0.5)",
                    }}
                  >
                    <th className="p-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      User
                    </th>
                    <th className="p-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Contact
                    </th>
                    <th className="p-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Demographics
                    </th>
                    <th className="p-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Date Submitted
                    </th>
                    <th className="p-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e1e]">
                  {submissions.map((sub) => {
                    return (
                      <tr
                        key={sub.surveyId}
                        onClick={() => setSelectedSubmission(sub)}
                        className="hover:bg-white/[0.02] cursor-pointer transition-colors duration-150"
                      >
                        <td className="p-4">
                          <div className="font-medium text-white">{sub.name}</div>
                          <div className="text-xs text-muted-foreground">{sub.email}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-foreground">{sub.phoneNumber}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <span className="inline-flex items-center rounded bg-[#22C55E]/10 px-1.5 py-0.5 text-xs font-medium text-[#22C55E]">
                              {sub.gender}
                            </span>
                            <span className="inline-flex items-center rounded bg-white/5 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                              {sub.nationality}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(sub.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSubmission(sub);
                            }}
                            className="h-8 px-3 border-[#22C55E]/20 text-[#22C55E] hover:bg-[#22C55E]/10 hover:text-[#22C55E] hover:border-[#22C55E]/40 cursor-pointer text-xs font-semibold transition-all"
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {!loading && submissions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {(page - 1) * limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-foreground">
                {Math.min(page * limit, total)}
              </span>{" "}
              of <span className="font-semibold text-foreground">{total}</span>{" "}
              submissions
            </div>

            <div className="flex items-center gap-4">
              {/* Limit Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Show</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(parseInt(e.target.value, 10));
                    setPage(1);
                  }}
                  className="h-8 px-2 bg-[#151515] border border-[#222] rounded text-xs text-foreground appearance-none cursor-pointer focus:outline-none focus:border-[#22C55E]/50"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-xs text-muted-foreground">entries</span>
              </div>

              {/* Prev/Next Buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="h-8 px-2.5 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Prev
                </Button>

                <div className="text-xs px-2.5 text-muted-foreground">
                  Page <span className="font-semibold text-foreground">{page}</span>{" "}
                  of <span className="font-semibold text-foreground">{totalPages}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="h-8 px-2.5 text-xs flex items-center gap-1 cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <SubmissionDetailModal
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
}

