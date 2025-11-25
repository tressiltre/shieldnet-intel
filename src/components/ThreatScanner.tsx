import { useState } from "react";
import { Shield, Scan, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ThreatScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [lastScan, setLastScan] = useState<{
    threats_detected: number;
    threat_counts: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
  } | null>(null);
  const { toast } = useToast();

  const runThreatScan = async () => {
    setScanning(true);
    try {
      const { data, error } = await supabase.functions.invoke("detect-threats", {
        body: {},
      });

      if (error) throw error;

      setLastScan(data);
      
      toast({
        title: "Threat Scan Complete",
        description: `Detected ${data.threats_detected} new threat indicators`,
      });
    } catch (error: any) {
      toast({
        title: "Scan Failed",
        description: error.message || "Failed to complete threat scan",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  return (
    <Card className="p-6 border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-8 h-8 text-primary" />
            {scanning && (
              <div className="absolute inset-0 animate-ping">
                <Shield className="w-8 h-8 text-primary opacity-75" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Real-Time Threat Scanner</h3>
            <p className="text-sm text-muted-foreground font-mono">
              Monitor live threat intelligence feeds
            </p>
          </div>
        </div>
        <Button
          onClick={runThreatScan}
          disabled={scanning}
          className="gap-2"
        >
          {scanning ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              SCANNING...
            </>
          ) : (
            <>
              <Scan className="w-4 h-4" />
              RUN SCAN
            </>
          )}
        </Button>
      </div>

      {lastScan && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-cyber-green/10 border border-cyber-green/30">
            <CheckCircle2 className="w-5 h-5 text-cyber-green" />
            <span className="text-sm font-mono">
              Scan completed: {lastScan.threats_detected} new threats detected
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-threat-critical/10 border border-threat-critical/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-threat-critical" />
                <span className="text-xs font-mono text-muted-foreground">CRITICAL</span>
              </div>
              <p className="text-2xl font-bold text-threat-critical">
                {lastScan.threat_counts.critical}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-threat-high/10 border border-threat-high/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-threat-high" />
                <span className="text-xs font-mono text-muted-foreground">HIGH</span>
              </div>
              <p className="text-2xl font-bold text-threat-high">
                {lastScan.threat_counts.high}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-threat-medium/10 border border-threat-medium/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-threat-medium" />
                <span className="text-xs font-mono text-muted-foreground">MEDIUM</span>
              </div>
              <p className="text-2xl font-bold text-threat-medium">
                {lastScan.threat_counts.medium}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-threat-low/10 border border-threat-low/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-threat-low" />
                <span className="text-xs font-mono text-muted-foreground">LOW</span>
              </div>
              <p className="text-2xl font-bold text-threat-low">
                {lastScan.threat_counts.low}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground font-mono">
              Intelligence sources: Global Threat Feeds • DNS Analysis • Malware Databases • CVE Tracking
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ThreatScanner;
