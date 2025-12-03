import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    Shield,
    LayoutDashboard,
    Search,
    AlertTriangle,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
    Activity,
    Database,
    User,
    Zap,
    Server,
    Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Activity, label: "Live Feed", path: "/feed" },
    { icon: Search, label: "IOC Search", path: "/search" },
    { icon: Database, label: "Scanner", path: "/scanner" },
    { icon: AlertTriangle, label: "Alerts", path: "/alerts" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Zap, label: "Active Threats", path: "/active-threats" },
    { icon: Server, label: "System Health", path: "/system-health" },
    { icon: Network, label: "Network Analysis", path: "/network-analysis" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <div
            className={cn(
                "flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-primary" />
                        <div>
                            <h1 className="text-sm font-bold">SHIELDNET</h1>
                            <p className="text-xs text-muted-foreground">Intelligence</p>
                        </div>
                    </div>
                )}
                {collapsed && <Shield className="w-6 h-6 text-primary mx-auto" />}

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn("h-8 w-8", collapsed && "mx-auto mt-2")}
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <ChevronLeft className="w-4 h-4" />
                    )}
                </Button>
            </div>

            <Separator />

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link key={item.path} to={item.path}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                                    "hover:bg-accent hover:text-accent-foreground",
                                    isActive && "bg-primary text-primary-foreground",
                                    collapsed && "justify-center"
                                )}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {!collapsed && (
                                    <span className="text-sm font-medium">{item.label}</span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <Separator />

            {/* User Section */}
            <div className="p-4">
                <div
                    className={cn(
                        "flex items-center gap-3 p-2 rounded-lg bg-muted",
                        collapsed && "justify-center"
                    )}
                >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Admin User</p>
                            <p className="text-xs text-muted-foreground truncate">admin@tiztech.org</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
