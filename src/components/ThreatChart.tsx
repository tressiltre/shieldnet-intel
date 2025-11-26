import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

import { useEffect, useState } from "react";
import { threatService } from "@/services/threatService";

const ThreatChart = () => {
  const [data, setData] = useState([
    { time: "00:00", critical: 4, high: 12, medium: 23, low: 45 },
    { time: "04:00", critical: 3, high: 15, medium: 28, low: 52 },
    { time: "08:00", critical: 7, high: 19, medium: 34, low: 61 },
    { time: "12:00", critical: 5, high: 22, medium: 41, low: 58 },
    { time: "16:00", critical: 9, high: 18, medium: 37, low: 64 },
    { time: "20:00", critical: 6, high: 16, medium: 31, low: 55 },
  ]);

  useEffect(() => {
    const updateStats = async () => {
      // In a real app, we'd fetch historical data. 
      // For now, we'll simulate live updates by slightly randomizing the last data point
      // based on current threat levels.
      const threats = await threatService.getThreats();
      const stats = threatService.calculateStats(threats);

      setData(prev => {
        const newData = [...prev];
        const lastItem = newData[newData.length - 1];
        // Simple simulation of changing data
        newData[newData.length - 1] = {
          ...lastItem,
          critical: Math.max(0, lastItem.critical + (Math.random() > 0.5 ? 1 : -1)),
          high: Math.max(0, lastItem.high + (Math.random() > 0.5 ? 2 : -2)),
        };
        return newData;
      });
    };

    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">24-Hour Threat Distribution</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-threat-critical border-threat-critical/50">
            Critical
          </Badge>
          <Badge variant="outline" className="text-threat-high border-threat-high/50">
            High
          </Badge>
          <Badge variant="outline" className="text-threat-medium border-threat-medium/50">
            Medium
          </Badge>
          <Badge variant="outline" className="text-threat-low border-threat-low/50">
            Low
          </Badge>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="time"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            fontFamily="JetBrains Mono"
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            fontFamily="JetBrains Mono"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontFamily: "JetBrains Mono",
            }}
          />
          <Legend
            wrapperStyle={{
              fontFamily: "JetBrains Mono",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="critical" fill="hsl(var(--threat-critical))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="high" fill="hsl(var(--threat-high))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="medium" fill="hsl(var(--threat-medium))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="low" fill="hsl(var(--threat-low))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ThreatChart;
