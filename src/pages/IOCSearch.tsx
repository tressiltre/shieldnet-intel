import { useState } from "react";
import { Search, Globe, Hash, Link as LinkIcon, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IOCSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);

        // Simulate search delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate results
        setSearchResults([
            {
                indicator: searchQuery,
                type: "IP",
                severity: "critical",
                source: "AbuseIPDB",
                lastSeen: "2 hours ago",
                description: "Known malicious actor - Multiple brute force attempts",
                reputation: 87,
                tags: ["malware", "bruteforce", "ransomware"]
            }
        ]);

        setIsSearching(false);
    };

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
                return "";
        }
    };

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">IOC Search</h1>
                <p className="text-muted-foreground">Search for indicators of compromise across threat databases</p>
            </div>

            {/* Search Bar */}
            <Card className="p-6">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Enter IP address, domain, hash, or URL..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="font-mono"
                        />
                    </div>
                    <Button onClick={handleSearch} disabled={isSearching} className="gap-2">
                        <Search className="w-4 h-4" />
                        {isSearching ? "Searching..." : "Search"}
                    </Button>
                </div>

                {/* Search Types */}
                <div className="mt-4 flex gap-2 flex-wrap">
                    <Badge variant="outline" className="gap-1">
                        <Globe className="w-3 h-3" />
                        IP Addresses
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                        <LinkIcon className="w-3 h-3" />
                        Domains / URLs
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                        <Hash className="w-3 h-3" />
                        File Hashes
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                        <AlertCircle className="w-3 h-3" />
                        CVE IDs
                    </Badge>
                </div>
            </Card>

            {/* Results */}
            {searchResults.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Search Results</h2>
                    {searchResults.map((result, index) => (
                        <Card key={index} className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Badge variant="outline" className="font-mono">
                                                {result.type}
                                            </Badge>
                                            <Badge className={`uppercase ${getSeverityColor(result.severity)}`}>
                                                {result.severity}
                                            </Badge>
                                        </div>
                                        <h3 className="text-lg font-mono font-semibold">{result.indicator}</h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-threat-critical">{result.reputation}%</div>
                                        <div className="text-xs text-muted-foreground">Threat Score</div>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground">{result.description}</p>

                                <Tabs defaultValue="details" className="w-full">
                                    <TabsList>
                                        <TabsTrigger value="details">Details</TabsTrigger>
                                        <TabsTrigger value="history">History</TabsTrigger>
                                        <TabsTrigger value="related">Related IOCs</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="details" className="space-y-2">
                                        <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                                            <div>
                                                <div className="text-xs text-muted-foreground">Source</div>
                                                <div className="font-medium">{result.source}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground">Last Seen</div>
                                                <div className="font-medium">{result.lastSeen}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-wrap mt-2">
                                            {result.tags.map((tag: string) => (
                                                <Badge key={tag} variant="secondary">{tag}</Badge>
                                            ))}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="history">
                                        <div className="p-4 text-sm text-muted-foreground">
                                            Activity history would be displayed here
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="related">
                                        <div className="p-4 text-sm text-muted-foreground">
                                            Related indicators would be displayed here
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {searchResults.length === 0 && !isSearching && (
                <Card className="p-12">
                    <div className="text-center space-y-3">
                        <Search className="w-12 h-12 text-muted-foreground mx-auto" />
                        <h3 className="text-lg font-semibold">Start Your Search</h3>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                            Enter an IP address, domain name, file hash, or CVE ID to search across global threat intelligence databases
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default IOCSearch;
