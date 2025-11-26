import { FileText, Download, Calendar, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockReports = [
    {
        id: 1,
        title: "Weekly Threat Summary",
        date: "Nov 20-26, 2025",
        threats: 247,
        critical: 12,
        status: "Ready"
    },
    {
        id: 2,
        title: "Monthly Intelligence Report",
        date: "November 2025",
        threats: 1089,
        critical: 45,
        status: "Ready"
    },
    {
        id: 3,
        title: "Quarterly Security Overview",
        date: "Q4 2025",
        threats: 3421,
        critical: 156,
        status: "Generating"
    },
];

const Reports = () => {
    const handleDownload = (reportId: number) => {
        alert(`Downloading report ${reportId}...`);
    };

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                    <p className="text-muted-foreground">Generate and download threat intelligence reports</p>
                </div>
                <Button className="gap-2">
                    <FileText className="w-4 h-4" />
                    Generate New Report
                </Button>
            </div>

            {/* Report Stats */}
            <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-primary/10">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">12</div>
                            <div className="text-sm text-muted-foreground">Total Reports</div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-threat-critical/10">
                            <TrendingUp className="w-6 h-6 text-threat-critical" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">3.4k</div>
                            <div className="text-sm text-muted-foreground">Threats Analyzed</div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-cyber-green/10">
                            <Calendar className="w-6 h-6 text-cyber-green" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">Weekly</div>
                            <div className="text-sm text-muted-foreground">Latest Report</div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Available Reports */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Available Reports</h2>
                <div className="space-y-4">
                    {mockReports.map((report) => (
                        <Card key={report.id} className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-1">{report.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">{report.date}</p>
                                        <div className="flex gap-4">
                                            <div>
                                                <span className="text-sm text-muted-foreground">Total Threats: </span>
                                                <span className="font-semibold">{report.threats}</span>
                                            </div>
                                            <div>
                                                <span className="text-sm text-muted-foreground">Critical: </span>
                                                <span className="font-semibold text-threat-critical">{report.critical}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                                        {report.status}
                                    </Badge>
                                    {report.status === "Ready" && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDownload(report.id)}
                                            className="gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download PDF
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reports;
