import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatsGrid from "@/components/StatsGrid";
import ThreatChart from "@/components/ThreatChart";
import ThreatScanner from "@/components/ThreatScanner";
import { Search, Database, AlertTriangle, TrendingUp } from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Real-time threat intelligence overview</p>
            </div>

            {/* Stats Overview */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Threat Intelligence Overview</h2>
                </div>
                <StatsGrid />
            </section>

            {/* Real-Time Threat Scanner */}
            <section>
                <ThreatScanner />
            </section>

            {/* Threat Visualization */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Threat Activity</h2>
                </div>
                <ThreatChart />
            </section>

            {/* Quick Actions */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <Card
                        className="p-6 hover:border-primary/50 transition-colors cursor-pointer group"
                        onClick={() => navigate("/search")}
                    >
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Search className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">IOC Lookup</h3>
                                <p className="text-sm text-muted-foreground">
                                    Search and analyze indicators of compromise
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card
                        className="p-6 hover:border-primary/50 transition-colors cursor-pointer group"
                        onClick={() => navigate("/settings")}
                    >
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                <Database className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Feed Management</h3>
                                <p className="text-sm text-muted-foreground">
                                    Configure and monitor intelligence sources
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card
                        className="p-6 hover:border-primary/50 transition-colors cursor-pointer group"
                        onClick={() => navigate("/alerts")}
                    >
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="p-3 rounded-lg bg-threat-critical/10 group-hover:bg-threat-critical/20 transition-colors">
                                <AlertTriangle className="w-6 h-6 text-threat-critical" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Alert Center</h3>
                                <p className="text-sm text-muted-foreground">
                                    View and manage threat notifications
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
