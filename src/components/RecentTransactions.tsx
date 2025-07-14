import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

const transactions = [
  {
    id: "1",
    date: "2024-01-15",
    merchant: "위워크 강남점",
    amount: 450000,
    category: "임대료",
    status: "승인",
    taxDeductible: true
  },
  {
    id: "2", 
    date: "2024-01-14",
    merchant: "배달의민족 (팀 회의)",
    amount: 85000,
    category: "회의비",
    status: "검토중",
    taxDeductible: true
  },
  {
    id: "3",
    date: "2024-01-13", 
    merchant: "SK주유소",
    amount: 120000,
    category: "차량운반비",
    status: "승인",
    taxDeductible: true
  },
  {
    id: "4",
    date: "2024-01-12",
    merchant: "Adobe Creative Cloud",
    amount: 79000,
    category: "소프트웨어사용료", 
    status: "승인",
    taxDeductible: true
  },
  {
    id: "5",
    date: "2024-01-11",
    merchant: "스타벅스 (개인)",
    amount: 15000,
    category: "기타",
    status: "반려",
    taxDeductible: false
  }
];

export function RecentTransactions() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "승인":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">승인</Badge>;
      case "검토중":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">검토중</Badge>;
      case "반려":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">반려</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>최근 거래내역</CardTitle>
          <CardDescription>자동 분류된 거래 내역을 확인하세요</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          내보내기
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-foreground">{transaction.merchant}</h4>
                  {getStatusBadge(transaction.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{transaction.date}</span>
                  <Badge variant="outline">{transaction.category}</Badge>
                  {transaction.taxDeductible && (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      세액공제
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    ₩{transaction.amount.toLocaleString()}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}