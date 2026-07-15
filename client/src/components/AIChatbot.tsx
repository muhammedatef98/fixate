import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

const quickQuestions: QuickQuestion[] = [
  {
    id: "1",
    questionAr: "ما هي أسعار الخدمات؟",
    questionEn: "What are the service prices?",
    answerAr: "أسعارنا تبدأ من 100 ريال لإصلاح الشاشات و 80 ريال لتغيير البطاريات. يمكنك استخدام حاسبة الأسعار للحصول على سعر دقيق لجهازك.",
    answerEn: "Our prices start from 100 SAR for screen repairs and 80 SAR for battery replacement. You can use the price calculator for an accurate quote."
  },
  {
    id: "2",
    questionAr: "كم يستغرق الإصلاح؟",
    questionEn: "How long does repair take?",
    answerAr: "معظم الإصلاحات تتم في نفس اليوم! الإصلاحات البسيطة مثل تغيير الشاشة تستغرق 30-60 دقيقة فقط.",
    answerEn: "Most repairs are completed the same day! Simple repairs like screen replacement take only 30-60 minutes."
  },
  {
    id: "3",
    questionAr: "هل تقدمون ضمان؟",
    questionEn: "Do you provide warranty?",
    answerAr: "نعم! نقدم ضمان يصل إلى 12 شهراً على جميع قطع الغيار والخدمات. راحتك وثقتك هي أولويتنا.",
    answerEn: "Yes! We provide up to 12 months warranty on all parts and services. Your satisfaction is our priority."
  },
  {
    id: "4",
    questionAr: "ما هي المناطق التي تغطونها؟",
    questionEn: "Which areas do you cover?",
    answerAr: "نغطي جميع مناطق المملكة العربية السعودية. فنيونا المحترفون يصلون إليك أينما كنت!",
    answerEn: "We cover all regions of Saudi Arabia. Our professional technicians reach you wherever you are!"
  },
  {
    id: "5",
    questionAr: "كيف أحجز موعد؟",
    questionEn: "How do I book an appointment?",
    answerAr: "يمكنك الحجز بسهولة من خلال الضغط على زر 'احجز الآن' في الصفحة الرئيسية، أو من خلال صفحة الحجز. اختر جهازك والمشكلة والوقت المناسب لك!",
    answerEn: "You can easily book by clicking the 'Book Now' button on the homepage, or through the booking page. Choose your device, issue, and preferred time!"
  }
];

const knowledgeBase = {
  ar: {
    "fixate": "Fixate هي منصة متكاملة لصيانة الأجهزة الإلكترونية في السعودية. نقدم خدمات إصلاح احترافية للجوالات واللابتوبات والتابلت مع ضمان يصل إلى 12 شهراً.",
    "أسعار|سعر|تكلفة": "أسعارنا تنافسية وشفافة! تبدأ من 100 ريال لإصلاح الشاشات و 80 ريال للبطاريات. استخدم حاسبة الأسعار للحصول على سعر دقيق.",
    "ضمان|كفالة": "نقدم ضمان ذهبي يصل إلى 12 شهراً على جميع قطع الغيار والخدمات المقدمة.",
    "وقت|مدة|كم يستغرق": "معظم الإصلاحات تتم في نفس اليوم! الإصلاحات البسيطة تستغرق 30-60 دقيقة فقط.",
    "حجز|موعد|طلب": "يمكنك الحجز من خلال زر 'احجز الآن' في الصفحة الرئيسية، أو زيارة صفحة الحجز مباشرة على /booking",
    "مناطق|مدن|توصيل": "نغطي جميع مناطق المملكة العربية السعودية. فنيونا يصلون إليك أينما كنت!",
    "خدمات|إصلاح|صيانة": "نقدم خدمات إصلاح شاملة: تغيير الشاشات، تغيير البطاريات، إصلاح منافذ الشحن، إصلاح الكاميرات، حل مشاكل البرامج، والمزيد!",
    "أجهزة|جوال|لابتوب|تابلت": "نصلح جميع أنواع الأجهزة: iPhone, Samsung, Huawei, MacBook, Dell, HP, Lenovo, iPad, Samsung Tab وجميع الأنواع الأخرى!",
    "دفع|طريقة الدفع": "نقبل جميع طرق الدفع: نقداً عند الاستلام، تحويل بنكي، وجميع الطرق الإلكترونية.",
    "تواصل|اتصال|رقم": "يمكنك التواصل معنا عبر:\n📧 البريد: support@fixate.site\n📱 الجوال: +966 54 894 0042",
    "فني متنقل|زيارة": "خدمة الفني المتنقل: يأتي الفني إلى موقعك ويصلح الجهاز في المكان. متوفرة في جميع المدن!",
    "استلام وتوصيل": "خدمة الاستلام والتوصيل: نستلم جهازك ونوصله لمحل متعاقد ونرجعه بعد الإصلاح. خدمة مريحة وآمنة!"
  },
  en: {
    "fixate": "Fixate is an integrated platform for electronic device repair in Saudi Arabia. We provide professional repair services for phones, laptops, and tablets with up to 12 months warranty.",
    "price|cost|how much": "Our prices are competitive and transparent! Starting from 100 SAR for screen repairs and 80 SAR for batteries. Use the price calculator for an accurate quote.",
    "warranty|guarantee": "We provide a golden warranty of up to 12 months on all parts and services.",
    "time|duration|how long": "Most repairs are completed the same day! Simple repairs take only 30-60 minutes.",
    "book|appointment|request": "You can book through the 'Book Now' button on the homepage, or visit the booking page directly at /booking",
    "areas|cities|delivery": "We cover all regions of Saudi Arabia. Our technicians reach you wherever you are!",
    "services|repair|maintenance": "We provide comprehensive repair services: screen replacement, battery replacement, charging port repair, camera repair, software troubleshooting, and more!",
    "devices|phone|laptop|tablet": "We repair all types of devices: iPhone, Samsung, Huawei, MacBook, Dell, HP, Lenovo, iPad, Samsung Tab, and all other types!",
    "payment|pay": "We accept all payment methods: cash on delivery, bank transfer, and all electronic methods.",
    "contact|call|number": "You can contact us via:\n📧 Email: support@fixate.site\n📱 Phone: +966 54 894 0042",
    "mobile technician|visit": "Mobile Technician Service: The technician comes to your location and repairs on-site. Available in all cities!",
    "pickup|delivery": "Pickup & Delivery Service: We pick up your device, deliver it to a partner shop, and return it after repair. Convenient and safe!"
  }
};

const outOfScopeResponses = {
  ar: "عذراً، أنا مساعد Fixate المتخصص في خدمات إصلاح الأجهزة الإلكترونية فقط. 🔧\n\nيمكنني مساعدتك في:\n• الأسعار والخدمات\n• الحجز والمواعيد\n• الضمان والجودة\n• المناطق المتاحة\n• طرق الدفع\n\nهل لديك سؤال عن خدماتنا؟ 😊",
  en: "Sorry, I'm Fixate assistant specialized in electronic device repair services only. 🔧\n\nI can help you with:\n• Prices and services\n• Booking and appointments\n• Warranty and quality\n• Available areas\n• Payment methods\n\nDo you have a question about our services? 😊"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  // Initialize welcome message based on language
  useEffect(() => {
    setMessages([{
      id: "welcome",
      text: language === 'ar' 
        ? "مرحباً بك في Fixate! 👋\n\nأنا هنا لمساعدتك في كل ما يتعلق بخدمات إصلاح الأجهزة الإلكترونية. يمكنك اختيار سؤال من الأسئلة الشائعة أدناه، أو كتابة سؤالك مباشرة."
        : "Welcome to Fixate! 👋\n\nI'm here to help you with everything related to electronic device repair services. You can choose a question from the FAQs below, or type your question directly.",
      sender: "bot",
      timestamp: new Date()
    }]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isGreeting = (message: string): boolean => {
    const greetings = {
      ar: ["السلام", "مرحبا", "هلا", "اهلا", "صباح", "مساء", "كيف حالك", "كيفك", "شلونك"],
      en: ["hello", "hi", "hey", "good morning", "good evening", "how are you", "greetings"]
    };
    
    const greetingWords = greetings[language as keyof typeof greetings];
    const lowerMessage = message.toLowerCase();
    
    return greetingWords.some(greeting => lowerMessage.includes(greeting));
  };

  const isWorkRelated = (message: string): boolean => {
    const workKeywords = {
      ar: ["fixate", "إصلاح", "صيانة", "جوال", "لابتوب", "تابلت", "شاشة", "بطارية", "سعر", "حجز", "موعد", "ضمان", "فني", "خدمة", "جهاز", "أجهزة", "تكلفة", "دفع", "توصيل", "استلام", "كاميرا", "شحن", "برامج"],
      en: ["fixate", "repair", "fix", "maintenance", "phone", "laptop", "tablet", "screen", "battery", "price", "book", "appointment", "warranty", "technician", "service", "device", "cost", "payment", "delivery", "pickup", "camera", "charging", "software"]
    };
    
    const keywords = workKeywords[language as keyof typeof workKeywords];
    const lowerMessage = message.toLowerCase();
    
    return keywords.some(keyword => lowerMessage.includes(keyword));
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check if it's a greeting
    if (isGreeting(userMessage)) {
      const greetingResponses = {
        ar: "مرحباً بك! 👋 أنا مساعد Fixate، سعيد بخدمتك. كيف يمكنني مساعدتك اليوم؟",
        en: "Hello! 👋 I'm Fixate assistant, happy to help you. How can I assist you today?"
      };
      return greetingResponses[language as keyof typeof greetingResponses];
    }
    
    // Check if message is work-related
    if (!isWorkRelated(userMessage)) {
      return outOfScopeResponses[language as keyof typeof outOfScopeResponses];
    }
    
    // Check knowledge base
    const kb = knowledgeBase[language as keyof typeof knowledgeBase];
    for (const [keywords, response] of Object.entries(kb)) {
      const keywordList = keywords.split("|");
      if (keywordList.some(keyword => lowerMessage.includes(keyword))) {
        return response;
      }
    }
    
    // Default response for work-related but not found
    return language === 'ar'
      ? "شكراً لسؤالك! 😊\n\nللحصول على إجابة دقيقة، يمكنك:\n• استخدام الأسئلة الشائعة أعلاه\n• التواصل معنا: support@fixate.site\n• الاتصال: +966 54 894 0042\n\nأو جرب إعادة صياغة سؤالك بطريقة أخرى!"
      : "Thank you for your question! 😊\n\nFor an accurate answer, you can:\n• Use the FAQs above\n• Contact us: support@fixate.site\n• Call: +966 54 894 0042\n\nOr try rephrasing your question!";
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(messageText),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: QuickQuestion) => {
    const questionText = language === 'ar' ? question.questionAr : question.questionEn;
    const answerText = language === 'ar' ? question.answerAr : question.answerEn;
    
    // Add user question
    const userMessage: Message = {
      id: Date.now().toString(),
      text: questionText,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Add bot answer after delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: answerText,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:via-indigo-600 hover:to-pink-600"
          size="icon"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse"></span>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[400px] h-[600px] shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {language === 'ar' ? 'مساعد Fixate' : 'Fixate Assistant'}
                  </CardTitle>
                  <p className="text-xs text-white/80">
                    {language === 'ar' ? 'متصل الآن' : 'Online now'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                      : "bg-background border border-border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                    {message.timestamp.toLocaleTimeString(language === 'ar' ? "ar-SA" : "en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-background border border-border rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Quick Questions */}
          <div className="px-4 py-2 border-t border-border bg-background">
            <p className="text-xs text-muted-foreground mb-2">
              {language === 'ar' ? 'أسئلة شائعة:' : 'Quick questions:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.slice(0, 3).map((q) => (
                <Button
                  key={q.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(q)}
                  className="text-xs hover:bg-gradient-to-r hover:from-emerald-500 hover:via-indigo-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all"
                >
                  {language === 'ar' ? q.questionAr : q.questionEn}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={language === 'ar' ? "اكتب سؤالك هنا..." : "Type your question..."}
                className="flex-1"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              <Button
                onClick={() => handleSendMessage()}
                size="icon"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:via-indigo-600 hover:to-pink-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
