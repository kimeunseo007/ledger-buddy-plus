import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CorporateCard {
  id: string;
  cardName: string;
  cardNumber: string;
  bank: string;
  cardType: string;
}

export function CorporateCardForm() {
  const [cards, setCards] = useState<CorporateCard[]>([
    {
      id: "1",
      cardName: "법인카드 01",
      cardNumber: "**** **** **** 1234",
      bank: "신한은행",
      cardType: "법인체크카드"
    }
  ]);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    bank: "",
    cardType: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: CorporateCard = {
      id: Date.now().toString(),
      cardName: formData.cardName,
      cardNumber: `**** **** **** ${formData.cardNumber.slice(-4)}`,
      bank: formData.bank,
      cardType: formData.cardType
    };
    setCards(prev => [...prev, newCard]);
    toast({
      title: "법인카드가 등록되었습니다",
      description: `${formData.cardName} - ${formData.bank}`
    });
    setFormData({ cardName: "", cardNumber: "", bank: "", cardType: "" });
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    toast({
      title: "카드가 삭제되었습니다",
      description: "선택한 법인카드가 삭제되었습니다."
    });
  };

  return (
    <div className="space-y-6">
      {/* 등록된 카드 목록 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            등록된 법인카드
          </CardTitle>
          <CardDescription>
            현재 등록된 법인카드 목록입니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cards.map((card) => (
              <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{card.cardName}</div>
                    <div className="text-sm text-muted-foreground">
                      {card.bank} · {card.cardNumber} · {card.cardType}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCard(card.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 새 카드 등록 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            법인카드 추가
          </CardTitle>
          <CardDescription>
            새로운 법인카드를 등록하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">카드명</Label>
                <Input
                  id="cardName"
                  placeholder="예: 법인카드 01"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bank">은행</Label>
                <Select value={formData.bank} onValueChange={(value) => handleInputChange("bank", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="은행 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="신한은행">신한은행</SelectItem>
                    <SelectItem value="국민은행">국민은행</SelectItem>
                    <SelectItem value="하나은행">하나은행</SelectItem>
                    <SelectItem value="우리은행">우리은행</SelectItem>
                    <SelectItem value="기업은행">기업은행</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">카드번호</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234567812345678"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardType">카드종류</Label>
                <Select value={formData.cardType} onValueChange={(value) => handleInputChange("cardType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="카드종류 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="법인체크카드">법인체크카드</SelectItem>
                    <SelectItem value="법인신용카드">법인신용카드</SelectItem>
                    <SelectItem value="선불카드">선불카드</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              카드 추가
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}