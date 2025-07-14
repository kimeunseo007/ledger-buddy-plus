import { Header } from "@/components/Header";
import { StatCards } from "@/components/StatCards";
import { TransactionForm } from "@/components/TransactionForm";
import { TaxChatbot } from "@/components/TaxChatbot";
import { RecentTransactions } from "@/components/RecentTransactions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* 통계 카드 */}
        <StatCards />
        
        {/* 메인 컨텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TransactionForm />
            <RecentTransactions />
          </div>
          
          <div>
            <TaxChatbot />
          </div>
        </div>
        
        {/* 용어 안내 섹션 */}
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">📖 용어 안내</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">경비</h4>
              <p className="text-sm text-muted-foreground">사업 운영에 사용된 비용. 법적 기준에 따라 세금 공제 가능</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">간편장부</h4>
              <p className="text-sm text-muted-foreground">수입과 지출을 간단하게 정리한 회계 양식</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">부가세 환급</h4>
              <p className="text-sm text-muted-foreground">사업자가 지출한 부가가치세를 돌려받는 절차</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">회의비</h4>
              <p className="text-sm text-muted-foreground">외부 미팅 시 발생한 식사, 다과 등 접대성 비용</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">장부</h4>
              <p className="text-sm text-muted-foreground">경비 내역 및 세무 자료를 기록한 표준 문서</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
