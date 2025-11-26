import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const mockAlerts = [
    {
        id: 1,
        title: "Critical IP Threat Detected",
        description: "Malicious IP address (185.220.101.45) engaged in brute force attacks",
        severity: "critical",
        status: "new",
        timestamp: "5 minutes ago",
        source: "Global Threat Intelligence"
    },
    {
        id: 2,
        title: "Phishing Domain Identified",
        description: "Domain phish-secure-login.tk identified as credential harvesting infrastructure",
        severity: "high",
        status: "investigating",
        timestamp: "15 minutes ago",
        source: "DNS Threat Feed"
    },
    {
        id: 3,
        title: "Malware Hash Detected",
        description: "File hash matches known ransomware variant Cryptor",
        severity: "critical",
        status: "resolved",
        timestamp: "1 hour ago",
        source: "Malware Database"
    },
    {
        id: 4,
        title: "Suspicious SSL Certificate",
        description: "Potentially malicious SSL certificate detected on IP 45.123.67.89",
        severity: "medium",
        status: "new",
        timestamp: "2 hours ago",
        source: "SSLBL"
    },
    {
        id: 5,
        title: "Port Scanning Activity",
        description: "Multiple port scan attempts from IP 203.45.78.90",
        severity: "low",
        status: "resolved",
        timestamp: "3 hours ago",
        source: "Blocklist.de"
    },
];

const Alerts = () => {
    const [alerts, setAlerts] = useState(mockAlerts);
    const [filter, setFilter] = useState("all");

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "critical":
                return "bg-threat-critical/10 text-threat-critical border-threat-critical/50";
            case "high":
                return "bg-threat-high/10 text-threat-high border-threat-high/50";
            case "medium":
                return "bg-threat-medium/10 text-threat-medium border-threat-medium/50";
            case "low":
                return "bg-threat-low/10 text-threat-low border-threat-low/50";
            default:
                return "";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "new":
                return <AlertTriangle className="w-4 h-4" />;
            case "investigating":
                return <Clock className="w-4 h-4" />;
            case "resolved":
                return <CheckCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new":
                return "bg-yellow-500/10 text-yellow-500 border-yellow-500/50";
            case "investigating":
                return "bg-blue-500/10 text-blue-500 border-blue-500/50";
            case "resolved":
                return "bg-green-500/10 text-green-500 border-green-500/50";
            default:
                return "";
        }
    };

    const filteredAlerts = alerts.filter(alert => {
        if (filter === "all") return true;
        if (filter === "active") return alert.status !== "resolved";
        return alert.severity === filter;
    });

    const markAsResolved = (id: number) => {
        setAlerts(alerts.map(alert =>
            alert.id === id ? { ...alert, status: "resolved" } : alert
        ));
    };

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Alert Center</h1>
                    <p className="text-muted-foreground">Monitor and manage security alerts</p>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                    {alerts.filter(a => a.status !== "resolved").length} Active
                </Badge>
            </div>

            {/* Filters */}
            <Tabs value={filter} onValueChange={setFilter} className="w-full">
                <TabsList>
                    <TabsTrigger value="all">All Alerts</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="critical">Critical</TabsTrigger>
                    <TabsTrigger value="high">High</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Alert List */}
            <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                    <Card key={alert.id} className="p-6 hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                {/* Alert Header */}
                                <div className="flex items-start gap-3">
                                    <div className="flex gap-2">
                                        <Badge className={`uppercase ${getSeverityColor(alert.severity)}`}>
                                            {alert.severity}
                                        </Badge>
                                        <Badge variant="outline" className={getStatusColor(alert.status)}>
                                            <span className="flex items-center gap-1">
                                                {getStatusIcon(alert.status)}
                                                {alert.status}
                                            </span>
                                        </Badge>
                                    </div>
                                </div>

                                {/* Alert Details */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">{alert.title}</h3>
                                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                                </div>

                                {/* Metadata */}
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>Source: {alert.source}</span>
                                    <span>•</span>
                                    <span>{alert.timestamp}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                {alert.status !== "resolved" && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => markAsResolved(alert.id)}
                                    >
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Resolve
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredAlerts.length === 0 && (
                <Card className="p-12">
                    <div className="text-center space-y-3">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                        <h3 className="text-lg font-semibold">No Alerts Found</h3>
                        <p className="text-sm text-muted-foreground">
                            There are no alerts matching the current filter
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Alerts;
