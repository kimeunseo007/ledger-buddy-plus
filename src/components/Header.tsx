import { Calculator, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Calculator className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">세무 & 경비 정리 도우미</h1>
            <p className="text-sm text-muted-foreground">기업용 거래내역 자동 분석 시스템</p>
          </div>
        </div>
        
        <Button variant="outline" size="sm">
          <Menu className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}