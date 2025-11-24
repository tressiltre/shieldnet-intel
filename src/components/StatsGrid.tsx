import { Card } from "@/components/ui/card";
import { Shield, AlertCircle, TrendingUp, Database } from "lucide-react";

const StatsGrid = () => {
  const stats = [
    {
      label: "Total IOCs",
      value: "12,847",
      change: "+342 today",
      icon: Database,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Critical Threats",
      value: "23",
      change: "+5 last hour",
      icon: AlertCircle,
      color: "text-threat-critical",
      bgColor: "bg-threat-critical/10",
    },
    {
      label: "Active Feeds",
      value: "8/8",
      change: "All operational",
      icon: Shield,
      color: "text-cyber-green",
      bgColor: "bg-cyber-green/10",
    },
    {
      label: "Detection Rate",
      value: "94.8%",
      change: "+2.3% this week",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 relative overflow-hidden group hover:border-primary/50 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-mono">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground font-mono border-t border-border/50 pt-2">
              {stat.change}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
