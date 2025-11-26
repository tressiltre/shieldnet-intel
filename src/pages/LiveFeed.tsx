import ThreatFeed from "@/components/ThreatFeed";
import { Database, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LiveFeed = () => {
    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Live Threat Feed</h1>
                    <p className="text-muted-foreground">Real-time threat intelligence from global sources</p>
                </div>
                <Badge variant="secondary" className="font-mono">
                    <Database className="w-3 h-3 mr-1" />
                    12,847 IOCs
                </Badge>
            </div>

            {/* Threat Feed */}
            <ThreatFeed />
        </div>
    );
};

export default LiveFeed;
