import StatsGrid from "./components/StatsGrid";
import RecentRepairsTable from "./components/RecentRepairsTable";
import { Loader2, AlertCircle, RefreshCcw } from "lucide-react";

import {
  useDashboardStats,
  useRecentRepairRequests,
} from "./hooks";

export default function DashboardPage() {
  const stats = useDashboardStats();
  const repairs = useRecentRepairRequests();

  const isLoading = stats.isLoading || repairs.isLoading;
  const isError = stats.isError || repairs.isError || !stats.data || !repairs.data;

  // 1. Polished Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-muted-foreground space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  // 2. User-Friendly Error State
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-4">
        <div className="flex flex-col items-center max-w-md p-8 text-center bg-destructive/10 border border-destructive/20 rounded-2xl shadow-sm">
          <div className="p-3 mb-4 bg-destructive/20 rounded-full">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Unable to load dashboard
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            We encountered an issue while fetching your statistics and repairs. Please check your connection and try again.
          </p>
          <button 
            onClick={() => {
              stats.refetch?.();
              repairs.refetch?.();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors bg-background border shadow-sm rounded-lg hover:bg-accent hover:text-accent-foreground"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // 3. Structured Success Layout
  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/10">
      <div className="mx-auto space-y-8 max-w-7xl">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Overview of your repair business and recent activity.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <StatsGrid stats={stats.data} />
          <RecentRepairsTable repairs={repairs.data} />
        </div>

      </div>
    </div>
  );
}