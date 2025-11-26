import ThreatScanner from "@/components/ThreatScanner";
import { Activity, Zap } from "lucide-react";

const Scanner = () => {
    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Zap className="w-8 h-8 text-primary" />
                    Threat Scanner
                </h1>
                <p className="text-muted-foreground">Scan for active threats and vulnerabilities</p>
            </div>

            {/* Scanner Component */}
            <ThreatScanner />

            {/* Info Section */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="p-6 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">What Gets Scanned</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Global threat intelligence feeds</li>
                        <li>• Malware signatures and patterns</li>
                        <li>• Known malicious IPs and domains</li>
                        <li>• Recent CVE disclosures</li>
                    </ul>
                </div>
                <div className="p-6 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Detection Capabilities</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Real-time threat detection</li>
                        <li>• Automated severity classification</li>
                        <li>• Multi-source verification</li>
                        <li>• Historical trend analysis</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Scanner;
