import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, FileText, CheckCircle, AlertCircle } from "lucide-react";

const stats = [
  {
    title: "이번 달 거래",
    value: "125건",
    change: "+12%",
    icon: FileText,
    color: "text-blue-600"
  },
  {
    title: "경비 인정",
    value: "98건",
    change: "78%",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "검토 필요",
    value: "27건",
    change: "22%",
    icon: AlertCircle,
    color: "text-orange-600"
  },
  {
    title: "절약 효과",
    value: "₩1.2M",
    change: "+8%",
    icon: TrendingUp,
    color: "text-primary"
  }
];

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              전월 대비 <span className="text-green-600">{stat.change}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}