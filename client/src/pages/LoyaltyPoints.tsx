import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Star, Gift, TrendingUp, Award } from "lucide-react";
import { useLocation } from "wouter";

export default function LoyaltyPoints() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: loyaltyPoints } = trpc.loyalty.getPoints.useQuery(undefined, {
    enabled: !!user,
  });

  const { data: transactions } = trpc.loyalty.getTransactions.useQuery(
    { limit: 20 },
    { enabled: !!user }
  );

  const { data: rewards } = trpc.rewards.getAll.useQuery();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">تسجيل الدخول مطلوب</h2>
          <p className="text-muted-foreground mb-6">
            يجب تسجيل الدخول للوصول إلى نقاط الولاء
          </p>
          <Button onClick={() => setLocation("/")}>
            العودة للرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  const tierLabels: Record<string, string> = {
    bronze: "برونزي",
    silver: "فضي",
    gold: "ذهبي",
    platinum: "بلاتيني",
  };

  const tierColors: Record<string, string> = {
    bronze: "bg-orange-100 text-orange-700",
    silver: "bg-gray-100 text-gray-700",
    gold: "bg-yellow-100 text-yellow-700",
    platinum: "bg-purple-100 text-purple-700",
  };

  const transactionTypeLabels: Record<string, string> = {
    earn: "ربح",
    redeem: "استبدال",
    bonus: "مكافأة",
    expired: "منتهي",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">نقاط الولاء</h1>
            <Button variant="ghost" onClick={() => setLocation("/")}>
              <ArrowRight className="ml-2" />
              الرئيسية
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Points Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Star className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-sm opacity-90">النقاط المتاحة</h3>
                <p className="text-4xl font-bold">{loyaltyPoints?.availablePoints || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Award className="w-4 h-4" />
              <span>
                المستوى: {tierLabels[loyaltyPoints?.membershipTier || "bronze"]}
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">إجمالي النقاط المكتسبة</h3>
                <p className="text-3xl font-bold">{loyaltyPoints?.lifetimePoints || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">المكافآت المتاحة</h3>
                <p className="text-3xl font-bold">{rewards?.length || 0}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Rewards */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">المكافآت المتاحة</h2>
            <div className="space-y-4">
              {rewards?.map((reward: any) => (
                <div
                  key={reward.id}
                  className="p-4 border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {reward.description}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tierColors[reward.minTier]
                      }`}
                    >
                      {tierLabels[reward.minTier]}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-primary">
                      {reward.pointsCost} نقطة
                    </span>
                    <Button
                      size="sm"
                      disabled={
                        !loyaltyPoints ||
                        loyaltyPoints.availablePoints < reward.pointsCost
                      }
                    >
                      استبدال
                    </Button>
                  </div>
                </div>
              ))}
              {(!rewards || rewards.length === 0) && (
                <p className="text-center text-muted-foreground py-8">
                  لا توجد مكافآت متاحة حالياً
                </p>
              )}
            </div>
          </Card>

          {/* Transactions History */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">سجل النقاط</h2>
            <div className="space-y-3">
              {transactions?.map((transaction: any) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">
                      {transaction.description || transactionTypeLabels[transaction.transactionType]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.createdAt).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      transaction.points > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.points > 0 ? "+" : ""}
                    {transaction.points}
                  </div>
                </div>
              ))}
              {(!transactions || transactions.length === 0) && (
                <p className="text-center text-muted-foreground py-8">
                  لا توجد معاملات حتى الآن
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Membership Tiers Info */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-bold mb-6">مستويات العضوية</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { tier: "bronze", min: 0, color: "orange" },
              { tier: "silver", min: 2000, color: "gray" },
              { tier: "gold", min: 5000, color: "yellow" },
              { tier: "platinum", min: 10000, color: "purple" },
            ].map((level) => (
              <div
                key={level.tier}
                className={`p-4 rounded-lg border-2 ${
                  loyaltyPoints?.membershipTier === level.tier
                    ? "border-primary bg-primary/5"
                    : "border-muted"
                }`}
              >
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${tierColors[level.tier]}`}>
                  {tierLabels[level.tier]}
                </div>
                <p className="text-sm text-muted-foreground">
                  من {level.min.toLocaleString()} نقطة
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
