import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const sampleQuestions = [
  "이 거래는 경비로 처리할 수 있나요?",
  "부가세 환급 대상인가요?",
  "회의비 인정 조건이 뭔가요?",
  "간편장부 작성법을 알려주세요"
];

export function TaxChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "안녕하세요! 세무 관련 질문이 있으시면 언제든 물어보세요. 거래내역 분석, 경비 인정 여부, 세무 신고 등에 대해 도움드릴 수 있습니다.",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // AI 응답 시뮬레이션
    setTimeout(() => {
      let botResponse = "";
      
      if (text.includes("경비") || text.includes("처리")) {
        botResponse = "사업과 직접 관련된 지출이라면 경비로 처리 가능합니다. 거래처명, 금액, 사용 목적이 명확해야 하며, 증빙서류(영수증, 계산서 등)가 필요합니다. 개인 용도와 혼재된 경우 사업 비율만큼만 경비 처리됩니다.";
      } else if (text.includes("부가세") || text.includes("환급")) {
        botResponse = "사업자등록을 한 사업자라면 사업용 지출에 대한 부가세는 환급받을 수 있습니다. 다만 면세사업자나 간이과세자의 경우 제한이 있으니 확인이 필요합니다.";
      } else if (text.includes("회의비")) {
        botResponse = "회의비로 인정받으려면: 1) 사업과 직접 관련된 회의여야 함 2) 참석자 명단 작성 3) 회의 목적과 내용 기록 4) 1인당 20만원 한도 내에서 인정 5) 유흥업소는 제외됩니다.";
      } else if (text.includes("간편장부")) {
        botResponse = "간편장부는 수입과 지출을 간단하게 기록하는 장부입니다. 거래일자, 거래처, 적요, 수입금액, 지출금액을 기록하면 됩니다. 저희 시스템에서 자동으로 생성해드릴 수 있습니다.";
      } else {
        botResponse = "구체적인 거래 내용이나 상황을 알려주시면 더 정확한 답변을 드릴 수 있습니다. 거래처명, 금액, 사용 목적 등을 포함해서 질문해주세요.";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          세무 AI 상담
        </CardTitle>
        <CardDescription>
          세무 관련 질문에 대해 실시간으로 답변해드립니다
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {sampleQuestions.map((question, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
              onClick={() => handleSendMessage(question)}
            >
              {question}
            </Badge>
          ))}
        </div>

        <ScrollArea className="flex-1 mb-4 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`flex gap-3 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {message.sender === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            placeholder="세무 관련 질문을 입력하세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={() => handleSendMessage(inputValue)}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}