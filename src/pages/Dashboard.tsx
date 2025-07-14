import { Header } from "@/components/Header";
import { StatCards } from "@/components/StatCards";
import { CorporateCardForm } from "@/components/CorporateCardForm";
import { TaxChatbot } from "@/components/TaxChatbot";
import { RecentTransactions } from "@/components/RecentTransactions";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* 통계 카드 */}
        <StatCards />
        
        {/* 메인 컨텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <CorporateCardForm />
            <RecentTransactions />
          </div>
          
          <div>
            <TaxChatbot />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;