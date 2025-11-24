import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Tag } from "lucide-react";

export default function CouponsManagement() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    usageLimit: "",
    userUsageLimit: "1",
    validFrom: "",
    validUntil: "",
    description: "",
  });

  const { data: coupons, refetch } = trpc.coupons.getAll.useQuery();
  const createMutation = trpc.coupons.create.useMutation({
    onSuccess: () => {
      toast.success("تم إنشاء الكوبون بنجاح");
      setShowForm(false);
      setFormData({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minOrderAmount: "",
        maxDiscountAmount: "",
        usageLimit: "",
        userUsageLimit: "1",
        validFrom: "",
        validUntil: "",
        description: "",
      });
      refetch();
    },
    onError: (error) => {
      toast.error("فشل إنشاء الكوبون: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMutation.mutate({
      code: formData.code.toUpperCase(),
      discountType: formData.discountType,
      discountValue: parseInt(formData.discountValue),
      minOrderAmount: formData.minOrderAmount
        ? parseInt(formData.minOrderAmount) * 100
        : undefined,
      maxDiscountAmount: formData.maxDiscountAmount
        ? parseInt(formData.maxDiscountAmount) * 100
        : undefined,
      usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : undefined,
      userUsageLimit: parseInt(formData.userUsageLimit),
      validFrom: new Date(formData.validFrom),
      validUntil: new Date(formData.validUntil),
      description: formData.description || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">إدارة الكوبونات</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة كوبون جديد
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>إنشاء كوبون جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="code">كود الكوبون *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value.toUpperCase() })
                      }
                      placeholder="SUMMER2024"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="discountType">نوع الخصم *</Label>
                    <Select
                      value={formData.discountType}
                      onValueChange={(value: "percentage" | "fixed") =>
                        setFormData({ ...formData, discountType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">نسبة مئوية (%)</SelectItem>
                        <SelectItem value="fixed">مبلغ ثابت (ريال)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="discountValue">
                      قيمة الخصم * ({formData.discountType === "percentage" ? "%" : "ريال"})
                    </Label>
                    <Input
                      id="discountValue"
                      type="number"
                      value={formData.discountValue}
                      onChange={(e) =>
                        setFormData({ ...formData, discountValue: e.target.value })
                      }
                      placeholder={formData.discountType === "percentage" ? "20" : "50"}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="minOrderAmount">الحد الأدنى للطلب (ريال)</Label>
                    <Input
                      id="minOrderAmount"
                      type="number"
                      value={formData.minOrderAmount}
                      onChange={(e) =>
                        setFormData({ ...formData, minOrderAmount: e.target.value })
                      }
                      placeholder="100"
                    />
                  </div>

                  {formData.discountType === "percentage" && (
                    <div>
                      <Label htmlFor="maxDiscountAmount">الحد الأقصى للخصم (ريال)</Label>
                      <Input
                        id="maxDiscountAmount"
                        type="number"
                        value={formData.maxDiscountAmount}
                        onChange={(e) =>
                          setFormData({ ...formData, maxDiscountAmount: e.target.value })
                        }
                        placeholder="200"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="usageLimit">عدد مرات الاستخدام الكلي</Label>
                    <Input
                      id="usageLimit"
                      type="number"
                      value={formData.usageLimit}
                      onChange={(e) =>
                        setFormData({ ...formData, usageLimit: e.target.value })
                      }
                      placeholder="100 (اتركه فارغاً لعدد غير محدود)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="userUsageLimit">عدد مرات الاستخدام لكل مستخدم *</Label>
                    <Input
                      id="userUsageLimit"
                      type="number"
                      value={formData.userUsageLimit}
                      onChange={(e) =>
                        setFormData({ ...formData, userUsageLimit: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="validFrom">تاريخ البداية *</Label>
                    <Input
                      id="validFrom"
                      type="datetime-local"
                      value={formData.validFrom}
                      onChange={(e) =>
                        setFormData({ ...formData, validFrom: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="validUntil">تاريخ الانتهاء *</Label>
                    <Input
                      id="validUntil"
                      type="datetime-local"
                      value={formData.validUntil}
                      onChange={(e) =>
                        setFormData({ ...formData, validUntil: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="وصف الكوبون..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "جاري الإنشاء..." : "إنشاء الكوبون"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons?.map((coupon) => (
            <Card key={coupon.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  {coupon.code}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الخصم:</span>
                  <span className="font-bold">
                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}%`
                      : `${coupon.discountValue / 100} ريال`}
                  </span>
                </div>

                {coupon.minOrderAmount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الحد الأدنى:</span>
                    <span>{coupon.minOrderAmount / 100} ريال</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">الاستخدام:</span>
                  <span>
                    {coupon.usageCount} / {coupon.usageLimit || "∞"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">الحالة:</span>
                  <span
                    className={
                      coupon.isActive === 1
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {coupon.isActive === 1 ? "نشط" : "غير نشط"}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div>من: {new Date(coupon.validFrom).toLocaleDateString("ar-SA")}</div>
                  <div>إلى: {new Date(coupon.validUntil).toLocaleDateString("ar-SA")}</div>
                </div>

                {coupon.description && (
                  <p className="text-sm text-muted-foreground">{coupon.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {!coupons || coupons.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">لا توجد كوبونات حالياً</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
