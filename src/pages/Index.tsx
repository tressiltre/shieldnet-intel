import { Shield, Activity, AlertTriangle, Database, Search, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ThreatFeed from "@/components/ThreatFeed";
import StatsGrid from "@/components/StatsGrid";
import ThreatChart from "@/components/ThreatChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-primary animate-pulse-glow" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">SHIELDNET Intelligence</h1>
                <p className="text-xs text-muted-foreground font-mono">Cyber Threat Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2 border-cyber-green/50 text-cyber-green">
                <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                SYSTEM ACTIVE
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="w-4 h-4" />
                IOC Search
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8 relative z-10">
        {/* Stats Overview */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Threat Intelligence Overview</h2>
          </div>
          <StatsGrid />
        </section>

        {/* Threat Visualization */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Threat Activity</h2>
          </div>
          <ThreatChart />
        </section>

        {/* Live Threat Feed */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Live Threat Feed</h2>
            <Badge variant="secondary" className="ml-auto font-mono">
              <Database className="w-3 h-3 mr-1" />
              12,847 IOCs
            </Badge>
          </div>
          <ThreatFeed />
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">IOC Lookup</h3>
                <p className="text-sm text-muted-foreground">Search and analyze indicators of compromise</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Database className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Feed Management</h3>
                <p className="text-sm text-muted-foreground">Configure and monitor intelligence sources</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-lg bg-threat-critical/10 group-hover:bg-threat-critical/20 transition-colors">
                <AlertTriangle className="w-6 h-6 text-threat-critical" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Alert Center</h3>
                <p className="text-sm text-muted-foreground">View and manage threat notifications</p>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-6 py-4">
          <p className="text-sm text-muted-foreground text-center font-mono">
            SHIELDNET Intelligence v1.0 • Cross-Platform Threat Intelligence System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
