import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Starting threat detection scan...");

    // Simulate real-world threat detection from multiple sources
    const threats = await detectThreatsFromSources();

    // Store detected threats in the database
    for (const threat of threats) {
      // Check if IOC already exists
      const { data: existingIoc } = await supabase
        .from("iocs")
        .select("id")
        .eq("indicator", threat.indicator)
        .single();

      if (!existingIoc) {
        // Insert new IOC
        const { data: ioc, error: iocError } = await supabase
          .from("iocs")
          .insert({
            indicator: threat.indicator,
            type: threat.type,
            severity: threat.severity,
            source: threat.source,
            description: threat.description,
            tags: threat.tags,
            confidence_score: threat.confidence_score,
          })
          .select()
          .single();

        if (iocError) {
          console.error("Error inserting IOC:", iocError);
          continue;
        }

        // Create an alert for high/critical threats
        if (threat.severity === "high" || threat.severity === "critical") {
          await supabase.from("alerts").insert({
            title: threat.alert_title,
            description: threat.alert_description,
            severity: threat.severity,
            ioc_id: ioc.id,
            status: "new",
          });
        }

        console.log(`New threat detected: ${threat.indicator} (${threat.severity})`);
      }
    }

    // Get threat statistics
    const { data: stats } = await supabase
      .from("iocs")
      .select("severity")
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    const threatCounts = {
      critical: stats?.filter((s) => s.severity === "critical").length || 0,
      high: stats?.filter((s) => s.severity === "high").length || 0,
      medium: stats?.filter((s) => s.severity === "medium").length || 0,
      low: stats?.filter((s) => s.severity === "low").length || 0,
    };

    return new Response(
      JSON.stringify({
        success: true,
        message: "Threat detection completed",
        threats_detected: threats.length,
        threat_counts: threatCounts,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in detect-threats function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Simulate threat detection from various intelligence sources
async function detectThreatsFromSources() {
  const threats = [];

  // Malicious IP addresses
  const maliciousIPs = [
    { ip: "185.220.101.45", country: "RU", reason: "Brute force attacks" },
    { ip: "103.253.145.12", country: "CN", reason: "Port scanning activity" },
    { ip: "198.51.100.89", country: "US", reason: "DDoS attack source" },
  ];

  for (const item of maliciousIPs) {
    threats.push({
      indicator: item.ip,
      type: "ip",
      severity: Math.random() > 0.5 ? "high" : "critical",
      source: "Global Threat Intelligence",
      description: `Malicious IP from ${item.country}: ${item.reason}`,
      tags: ["malicious", "ip-reputation", item.country.toLowerCase()],
      confidence_score: Math.floor(Math.random() * 20) + 80,
      alert_title: `Critical IP Threat Detected: ${item.ip}`,
      alert_description: `A malicious IP address (${item.ip}) has been identified engaging in ${item.reason}. Immediate action recommended.`,
    });
  }

  // Malicious domains
  const maliciousDomains = [
    { domain: "phish-secure-login.tk", type: "phishing" },
    { domain: "malware-drop-zone.ru", type: "malware distribution" },
    { domain: "c2-server-panel.cc", type: "command and control" },
  ];

  for (const item of maliciousDomains) {
    threats.push({
      indicator: item.domain,
      type: "domain",
      severity: item.type === "command and control" ? "critical" : "high",
      source: "DNS Threat Feed",
      description: `Malicious domain used for ${item.type}`,
      tags: ["malicious", "domain", item.type.replace(" ", "-")],
      confidence_score: Math.floor(Math.random() * 15) + 85,
      alert_title: `Malicious Domain Detected: ${item.domain}`,
      alert_description: `Domain identified as ${item.type} infrastructure. Block access immediately.`,
    });
  }

  // File hashes
  const maliciousHashes = [
    { hash: "d41d8cd98f00b204e9800998ecf8427e", malware: "Ransomware.Cryptor" },
    { hash: "e99a18c428cb38d5f260853678922e03", malware: "Trojan.GenericKD" },
  ];

  for (const item of maliciousHashes) {
    threats.push({
      indicator: item.hash,
      type: "hash",
      severity: "critical",
      source: "Malware Database",
      description: `Known malware hash: ${item.malware}`,
      tags: ["malware", "hash", "critical"],
      confidence_score: 95,
      alert_title: `Critical Malware Hash Detected`,
      alert_description: `File hash ${item.hash} matches ${item.malware}. Quarantine immediately.`,
    });
  }

  // CVE vulnerabilities
  const vulnerabilities = [
    { cve: "CVE-2024-1234", title: "Remote Code Execution in WebServer" },
    { cve: "CVE-2024-5678", title: "SQL Injection in Database Driver" },
  ];

  for (const item of vulnerabilities) {
    threats.push({
      indicator: item.cve,
      type: "cve",
      severity: "high",
      source: "Vulnerability Database",
      description: item.title,
      tags: ["vulnerability", "cve", "patch-required"],
      confidence_score: 100,
      alert_title: `New Vulnerability: ${item.cve}`,
      alert_description: `${item.title}. Review affected systems and apply patches.`,
    });
  }

  return threats;
}
