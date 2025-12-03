import { Card } from "@/components/ui/card";

const SystemHealth = () => {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-primary">System Health</h1>
            <Card className="p-6">
                <p>System diagnostics module loading...</p>
            </Card>
        </div>
    );
};

export default SystemHealth;
