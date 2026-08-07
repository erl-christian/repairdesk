import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: number;
  Icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
};

export default function StatCard({
  title,
  value,
  Icon,
  iconColor = "text-muted-foreground",
  iconBg = "bg-muted",
}: Props) {
  return (
    <Card className="transition-all shadow-sm hover:shadow-md">
      {/* 
        flex-row, space-between, and space-y-0 keep the title and icon on the same line. 
        pb-2 reduces the gap between the header and the large number.
      */}
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        
        {Icon && (
          <div className={`p-2 rounded-full ${iconBg}`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold tracking-tight text-foreground">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}