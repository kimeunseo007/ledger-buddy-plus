import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function TransactionForm() {
  const [formData, setFormData] = useState({
    merchant: "",
    amount: "",
    date: "",
    memo: "",
    category: ""
  });
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // AI 분류 시뮬레이션
    if (field === "merchant" && value) {
      setTimeout(() => {
        let suggestion = "";
        if (value.includes("위워크") || value.includes("사무실")) {
          suggestion = "임대료";
        } else if (value.includes("배달") || value.includes("식당")) {
          suggestion = "회의비";
        } else if (value.includes("택시") || value.includes("주유")) {
          suggestion = "차량운반비";
        } else {
          suggestion = "기타 경비";
        }
        setAiSuggestion(suggestion);
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "거래내역이 등록되었습니다",
      description: `${formData.merchant} - ${formData.amount}원`
    });
    setFormData({ merchant: "", amount: "", date: "", memo: "", category: "" });
    setAiSuggestion(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          거래내역 등록
        </CardTitle>
        <CardDescription>
          거래 정보를 입력하면 AI가 자동으로 카테고리를 추천합니다
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="merchant">거래처명</Label>
              <Input
                id="merchant"
                placeholder="예: 위워크 강남점"
                value={formData.merchant}
                onChange={(e) => handleInputChange("merchant", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">금액</Label>
              <Input
                id="amount"
                type="number"
                placeholder="100000"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">거래일자</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="임대료">임대료</SelectItem>
                  <SelectItem value="회의비">회의비</SelectItem>
                  <SelectItem value="차량운반비">차량운반비</SelectItem>
                  <SelectItem value="소프트웨어사용료">소프트웨어 사용료</SelectItem>
                  <SelectItem value="기타경비">기타 경비</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">메모</Label>
            <Textarea
              id="memo"
              placeholder="거래 관련 추가 정보를 입력하세요"
              value={formData.memo}
              onChange={(e) => handleInputChange("memo", e.target.value)}
            />
          </div>

          {aiSuggestion && (
            <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">AI 추천</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{aiSuggestion}</Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleInputChange("category", aiSuggestion)}
                >
                  적용
                </Button>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            거래내역 등록
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}