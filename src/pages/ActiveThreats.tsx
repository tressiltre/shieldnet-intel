import { Card } from "@/components/ui/card";

const ActiveThreats = () => {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Active Threats</h1>
            <Card className="p-6">
                <p>Threat detection module loading...</p>
            </Card>
        </div>
    );
};

export default ActiveThreats;
