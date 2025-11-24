import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Globe, Hash, Link } from "lucide-react";

const ThreatFeed = () => {
  const threats = [
    {
      type: "IP",
      value: "192.168.45.123",
      severity: "critical",
      source: "AbuseIPDB",
      timestamp: "2 min ago",
      description: "Brute force attack attempts",
      icon: Globe,
    },
    {
      type: "Domain",
      value: "malicious-site.xyz",
      severity: "high",
      source: "URLhaus",
      timestamp: "5 min ago",
      description: "Phishing campaign detected",
      icon: Link,
    },
    {
      type: "Hash",
      value: "a3f2c1e9b4d...",
      severity: "critical",
      source: "MalwareBazaar",
      timestamp: "8 min ago",
      description: "Ransomware payload identified",
      icon: Hash,
    },
    {
      type: "IP",
      value: "203.45.78.90",
      severity: "medium",
      source: "Blocklist.de",
      timestamp: "12 min ago",
      description: "Port scanning activity",
      icon: Globe,
    },
    {
      type: "Domain",
      value: "suspicious-domain.net",
      severity: "high",
      source: "PhishTank",
      timestamp: "15 min ago",
      description: "Credential harvesting page",
      icon: Link,
    },
    {
      type: "IP",
      value: "45.123.67.89",
      severity: "low",
      source: "SSLBL",
      timestamp: "18 min ago",
      description: "Suspicious SSL certificate",
      icon: Globe,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-threat-critical border-threat-critical/50 bg-threat-critical/10";
      case "high":
        return "text-threat-high border-threat-high/50 bg-threat-high/10";
      case "medium":
        return "text-threat-medium border-threat-medium/50 bg-threat-medium/10";
      case "low":
        return "text-threat-low border-threat-low/50 bg-threat-low/10";
      default:
        return "text-muted-foreground border-border bg-muted";
    }
  };

  return (
    <Card className="p-6">
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-3">
          {threats.map((threat, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getSeverityColor(threat.severity)} group-hover:scale-110 transition-transform`}>
                  <threat.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs font-mono">
                          {threat.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{threat.timestamp}</span>
                      </div>
                      <div className="font-mono text-sm font-medium break-all">{threat.value}</div>
                    </div>
                    <Badge className={`uppercase text-xs ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Source: {threat.source}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ThreatFeed;
