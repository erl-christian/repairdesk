import StatCard from "./StatCard";
import type { DashboardStats } from "../types";
import {
  ClipboardList,
  Clock,
  Wrench,
  PackageSearch,
  CheckCircle,
  CheckCheck,
  Ban
} from "lucide-react";

type Props = {
  stats: DashboardStats;
};

export default function StatsGrid({ stats }: Props) {
  // Mapping stats to an array allows us to easily pair them with icons and colors
  const statItems = [
    { 
      title: "Total Requests", 
      value: stats.totalRequests, 
      icon: ClipboardList, 
      color: "text-blue-500", 
      bg: "bg-blue-500/10" 
    },
    { 
      title: "Pending Review", 
      value: stats.pendingReview, 
      icon: Clock, 
      color: "text-amber-500", 
      bg: "bg-amber-500/10" 
    },
    { 
      title: "In Progress", 
      value: stats.inProgress, 
      icon: Wrench, 
      color: "text-indigo-500", 
      bg: "bg-indigo-500/10" 
    },
    { 
      title: "Waiting Parts", 
      value: stats.waitingParts, 
      icon: PackageSearch, 
      color: "text-orange-500", 
      bg: "bg-orange-500/10" 
    },
    { 
      title: "Ready for Pickup", 
      value: stats.readyForPickup, 
      icon: CheckCircle, 
      color: "text-emerald-500", 
      bg: "bg-emerald-500/10" 
    },
    { 
      title: "Completed", 
      value: stats.completed, 
      icon: CheckCheck, 
      color: "text-green-600", 
      bg: "bg-green-600/10" 
    },
    { 
      title: "Cancelled", 
      value: stats.cancelled, 
      icon: Ban, 
      color: "text-destructive", 
      bg: "bg-destructive/10" 
    },
  ];

  return (
    // Adjusted responsive columns: 1 (mobile) -> 2 (tablet) -> 3 (desktop) -> 4 (large screen)
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {statItems.map((item) => (
        <StatCard 
          key={item.title} 
          title={item.title} 
          value={item.value} 
          Icon={item.icon}
          iconColor={item.color}
          iconBg={item.bg}
        />
      ))}
    </div>
  );
}