import { Settings as SettingsIcon, Bell, Database, Palette, Shield, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Settings Saved",
            description: "Your preferences have been updated successfully.",
        });
    };

    return (
        <div className="p-8 space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your application preferences and configuration</p>
            </div>

            {/* Notifications */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Notifications</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Critical Alerts</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications for critical threats</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>High Priority Alerts</Label>
                            <p className="text-sm text-muted-foreground">Notifications for high severity threats</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Daily Summary</Label>
                            <p className="text-sm text-muted-foreground">Daily threat intelligence summary email</p>
                        </div>
                        <Switch />
                    </div>
                </div>
            </Card>

            {/* Data Sources */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Database className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Threat Intelligence Sources</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>URLhaus (Abuse.ch)</Label>
                            <p className="text-sm text-muted-foreground">Malware URL database</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>AbuseIPDB</Label>
                            <p className="text-sm text-muted-foreground">IP address reputation database</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>PhishTank</Label>
                            <p className="text-sm text-muted-foreground">Phishing URL database</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </div>
            </Card>

            {/* API Configuration */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">API Configuration</h2>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="backend-url">Backend URL</Label>
                        <Input
                            id="backend-url"
                            placeholder="http://localhost:3001"
                            defaultValue="http://localhost:3001"
                        />
                        <p className="text-xs text-muted-foreground">
                            URL for the backend threat scanning service
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="refresh-interval">Feed Refresh Interval (seconds)</Label>
                        <Input
                            id="refresh-interval"
                            type="number"
                            placeholder="30"
                            defaultValue="30"
                        />
                        <p className="text-xs text-muted-foreground">
                            How often to refresh the threat feed
                        </p>
                    </div>
                </div>
            </Card>

            {/* Appearance */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Appearance</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">Use dark theme (currently active)</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Compact View</Label>
                            <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                        </div>
                        <Switch />
                    </div>
                </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default Settings;
