import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Smartphone, 
  Laptop, 
  Tablet,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingDown,
  Shield
} from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";

// قاعدة بيانات الأسعار الواقعية (بالريال السعودي)
const pricingData = {
  phone: {
    name: "الجوالات",
    icon: Smartphone,
    brands: {
      "iPhone": {
        models: {
          "iPhone 15 Pro Max": {
            "تغيير الشاشة": 1200,
            "تغيير البطارية": 350,
            "إصلاح منفذ الشحن": 280,
            "إصلاح الكاميرا الخلفية": 450,
            "إصلاح الكاميرا الأمامية": 380,
            "إصلاح السماعة": 320,
            "إصلاح الميكروفون": 280,
            "إصلاح Face ID": 650
          },
          "iPhone 15 Pro": {
            "تغيير الشاشة": 1100,
            "تغيير البطارية": 330,
            "إصلاح منفذ الشحن": 260,
            "إصلاح الكاميرا الخلفية": 420,
            "إصلاح الكاميرا الأمامية": 360,
            "إصلاح السماعة": 300,
            "إصلاح الميكروفون": 260,
            "إصلاح Face ID": 620
          },
          "iPhone 14 Pro Max": {
            "تغيير الشاشة": 950,
            "تغيير البطارية": 300,
            "إصلاح منفذ الشحن": 240,
            "إصلاح الكاميرا الخلفية": 380,
            "إصلاح الكاميرا الأمامية": 320,
            "إصلاح السماعة": 280,
            "إصلاح Face ID": 580
          },
          "iPhone 13 Pro": {
            "تغيير الشاشة": 750,
            "تغيير البطارية": 250,
            "إصلاح منفذ الشحن": 220,
            "إصلاح الكاميرا": 320,
            "إصلاح السماعة": 240
          },
          "iPhone 12": {
            "تغيير الشاشة": 550,
            "تغيير البطارية": 220,
            "إصلاح منفذ الشحن": 200,
            "إصلاح الكاميرا": 280,
            "إصلاح السماعة": 220
          }
        }
      },
      "Samsung": {
        models: {
          "Galaxy S24 Ultra": {
            "تغيير الشاشة": 1400,
            "تغيير البطارية": 320,
            "إصلاح منفذ الشحن": 250,
            "إصلاح الكاميرا": 400,
            "إصلاح السماعة": 280
          },
          "Galaxy S23 Ultra": {
            "تغيير الشاشة": 1100,
            "تغيير البطارية": 280,
            "إصلاح منفذ الشحن": 230,
            "إصلاح الكاميرا": 350,
            "إصلاح السماعة": 250
          },
          "Galaxy S22": {
            "تغيير الشاشة": 750,
            "تغيير البطارية": 240,
            "إصلاح منفذ الشحن": 200,
            "إصلاح الكاميرا": 300,
            "إصلاح السماعة": 220
          },
          "Galaxy A54": {
            "تغيير الشاشة": 450,
            "تغيير البطارية": 180,
            "إصلاح منفذ الشحن": 150,
            "إصلاح الكاميرا": 220,
            "إصلاح السماعة": 160
          }
        }
      },
      "Huawei": {
        models: {
          "P60 Pro": {
            "تغيير الشاشة": 800,
            "تغيير البطارية": 260,
            "إصلاح منفذ الشحن": 220,
            "إصلاح الكاميرا": 320,
            "إصلاح السماعة": 240
          },
          "Mate 50": {
            "تغيير الشاشة": 650,
            "تغيير البطارية": 230,
            "إصلاح منفذ الشحن": 200,
            "إصلاح الكاميرا": 280,
            "إصلاح السماعة": 220
          }
        }
      }
    }
  },
  laptop: {
    name: "اللابتوبات",
    icon: Laptop,
    brands: {
      "MacBook": {
        models: {
          "MacBook Pro 16\" M3": {
            "تغيير الشاشة": 3500,
            "تغيير البطارية": 850,
            "تغيير لوحة المفاتيح": 1200,
            "إصلاح منفذ الشحن": 450,
            "حل مشاكل البرامج": 300,
            "تنظيف وصيانة": 250,
            "ترقية الذاكرة": 600
          },
          "MacBook Air M2": {
            "تغيير الشاشة": 2200,
            "تغيير البطارية": 650,
            "تغيير لوحة المفاتيح": 900,
            "إصلاح منفذ الشحن": 380,
            "حل مشاكل البرامج": 280,
            "تنظيف وصيانة": 220
          },
          "MacBook Pro 13\" M1": {
            "تغيير الشاشة": 1800,
            "تغيير البطارية": 550,
            "تغيير لوحة المفاتيح": 750,
            "حل مشاكل البرامج": 250,
            "تنظيف وصيانة": 200
          }
        }
      },
      "Dell": {
        models: {
          "XPS 15": {
            "تغيير الشاشة": 1500,
            "تغيير البطارية": 450,
            "تغيير لوحة المفاتيح": 400,
            "إصلاح منفذ الشحن": 280,
            "حل مشاكل البرامج": 250,
            "تنظيف وصيانة": 200,
            "ترقية الذاكرة": 350
          },
          "Inspiron 15": {
            "تغيير الشاشة": 800,
            "تغيير البطارية": 320,
            "تغيير لوحة المفاتيح": 280,
            "حل مشاكل البرامج": 220,
            "تنظيف وصيانة": 180
          }
        }
      },
      "HP": {
        models: {
          "Pavilion 15": {
            "تغيير الشاشة": 750,
            "تغيير البطارية": 300,
            "تغيير لوحة المفاتيح": 260,
            "حل مشاكل البرامج": 200,
            "تنظيف وصيانة": 170
          },
          "EliteBook": {
            "تغيير الشاشة": 1200,
            "تغيير البطارية": 400,
            "تغيير لوحة المفاتيح": 350,
            "حل مشاكل البرامج": 230,
            "تنظيف وصيانة": 190
          }
        }
      },
      "Lenovo": {
        models: {
          "ThinkPad X1": {
            "تغيير الشاشة": 1400,
            "تغيير البطارية": 420,
            "تغيير لوحة المفاتيح": 380,
            "حل مشاكل البرامج": 240,
            "تنظيف وصيانة": 200
          },
          "IdeaPad": {
            "تغيير الشاشة": 700,
            "تغيير البطارية": 280,
            "تغيير لوحة المفاتيح": 240,
            "حل مشاكل البرامج": 190,
            "تنظيف وصيانة": 160
          }
        }
      }
    }
  },
  tablet: {
    name: "التابلت",
    icon: Tablet,
    brands: {
      "iPad": {
        models: {
          "iPad Pro 12.9\"": {
            "تغيير الشاشة": 1800,
            "تغيير البطارية": 550,
            "إصلاح منفذ الشحن": 320,
            "حل مشاكل البرامج": 250,
            "إصلاح السماعة": 280
          },
          "iPad Air": {
            "تغيير الشاشة": 1200,
            "تغيير البطارية": 420,
            "إصلاح منفذ الشحن": 280,
            "حل مشاكل البرامج": 220,
            "إصلاح السماعة": 240
          },
          "iPad 10th Gen": {
            "تغيير الشاشة": 850,
            "تغيير البطارية": 350,
            "إصلاح منفذ الشحن": 240,
            "حل مشاكل البرامج": 200
          }
        }
      },
      "Samsung Tab": {
        models: {
          "Galaxy Tab S9": {
            "تغيير الشاشة": 1100,
            "تغيير البطارية": 400,
            "إصلاح منفذ الشحن": 260,
            "حل مشاكل البرامج": 220
          },
          "Galaxy Tab A8": {
            "تغيير الشاشة": 550,
            "تغيير البطارية": 250,
            "إصلاح منفذ الشحن": 200,
            "حل مشاكل البرامج": 180
          }
        }
      }
    }
  }
};

export default function PriceCalculator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedService("");
    setCalculatedPrice(null);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel("");
    setSelectedService("");
    setCalculatedPrice(null);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedService("");
    setCalculatedPrice(null);
  };

  const handleServiceChange = (service: string) => {
    setSelectedService(service);
    if (selectedCategory && selectedBrand && selectedModel) {
      const price = (pricingData as any)[selectedCategory].brands[selectedBrand].models[selectedModel][service];
      setCalculatedPrice(price);
    }
  };

  const currentCategory = selectedCategory ? (pricingData as any)[selectedCategory] : null;
  const currentBrands = currentCategory ? Object.keys(currentCategory.brands) : [];
  const currentModels = selectedBrand && currentCategory ? Object.keys(currentCategory.brands[selectedBrand].models) : [];
  const currentServices = selectedModel && selectedBrand && currentCategory ? 
    Object.keys(currentCategory.brands[selectedBrand].models[selectedModel]) : [];

  const marketPrice = calculatedPrice ? Math.round(calculatedPrice * 1.3) : null;
  const savings = marketPrice && calculatedPrice ? marketPrice - calculatedPrice : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <SEO
        title="حاسبة الأسعار"
        description="احسب سعر إصلاح جهازك فوراً. أسعار شفافة ومحددة مسبقاً لجميع خدمات الصيانة."
        canonical="https://fixate.sa/calculator"
      />

      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Button variant="ghost" size="sm">
                ← العودة للرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calculator className="h-4 w-4" />
            <span>حاسبة الأسعار</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            احسب سعر إصلاح جهازك فوراً
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            أسعار شفافة ومحددة مسبقاً. لا توجد تكاليف مخفية!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Category */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold">اختر نوع الجهاز</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(pricingData).map(([key, value]) => {
                    const Icon = value.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => handleCategoryChange(key)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          selectedCategory === key
                            ? 'border-primary bg-primary/10 shadow-lg'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`h-12 w-12 mx-auto mb-3 ${
                          selectedCategory === key ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <div className="font-semibold text-center">{value.name}</div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Brand */}
            {selectedCategory && (
              <Card className="border-2 animate-in slide-in-from-bottom-4">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-semibold">اختر الشركة المصنعة</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {currentBrands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => handleBrandChange(brand)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                          selectedBrand === brand
                            ? 'border-primary bg-primary/10 shadow-lg'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-semibold text-center">{brand}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Model */}
            {selectedBrand && (
              <Card className="border-2 animate-in slide-in-from-bottom-4">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-semibold">اختر الموديل</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentModels.map((model) => (
                      <button
                        key={model}
                        onClick={() => handleModelChange(model)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 text-right ${
                          selectedModel === model
                            ? 'border-primary bg-primary/10 shadow-lg'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-semibold">{model}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Service */}
            {selectedModel && (
              <Card className="border-2 animate-in slide-in-from-bottom-4">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      4
                    </div>
                    <h3 className="text-xl font-semibold">اختر الخدمة المطلوبة</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentServices.map((service) => (
                      <button
                        key={service}
                        onClick={() => handleServiceChange(service)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 text-right ${
                          selectedService === service
                            ? 'border-primary bg-primary/10 shadow-lg'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-semibold">{service}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <Card className="border-2 sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">ملخص السعر</h3>
                </div>

                {!calculatedPrice ? (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      اختر جهازك والخدمة المطلوبة
                      <br />
                      لمعرفة السعر فوراً
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in slide-in-from-bottom-4">
                    {/* Selected Items */}
                    <div className="space-y-3 pb-6 border-b border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span className="text-muted-foreground">الجهاز:</span>
                        <span className="font-semibold">{selectedModel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span className="text-muted-foreground">الخدمة:</span>
                        <span className="font-semibold">{selectedService}</span>
                      </div>
                    </div>

                    {/* Market Comparison */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">سعر السوق</span>
                        <span className="text-lg line-through text-muted-foreground">{marketPrice} ر.س</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">سعرنا</span>
                        <span className="text-3xl font-bold text-primary">{calculatedPrice} ر.س</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <TrendingDown className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                          وفّر {savings} ر.س ({Math.round((savings! / marketPrice!) * 100)}%)
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>ضمان 6 أشهر</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>قطع غيار أصلية</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>فني محترف يصلك</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href="/booking">
                      <Button className="w-full h-12 text-base font-semibold" size="lg">
                        احجز الآن
                        <ArrowRight className="mr-2 h-5 w-5" />
                      </Button>
                    </Link>

                    <p className="text-xs text-center text-muted-foreground">
                      * الأسعار شاملة الضريبة وتكاليف الخدمة
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
