import { useState, useRef, useEffect } from "react";
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
  question: string;
  answer: string;
}

const quickQuestions: QuickQuestion[] = [
  {
    id: "1",
    question: "ما هي أسعار الخدمات؟",
    answer: "أسعارنا تبدأ من 100 ريال لإصلاح الشاشات و 80 ريال لتغيير البطاريات. يمكنك استخدام حاسبة الأسعار للحصول على سعر دقيق لجهازك."
  },
  {
    id: "2",
    question: "كم يستغرق الإصلاح؟",
    answer: "معظم الإصلاحات تتم في نفس اليوم! الإصلاحات البسيطة مثل تغيير الشاشة تستغرق 30-60 دقيقة فقط."
  },
  {
    id: "3",
    question: "هل تقدمون ضمان؟",
    answer: "نعم! نقدم ضمان يصل إلى 12 شهراً على جميع قطع الغيار والخدمات. راحتك وثقتك هي أولويتنا."
  },
  {
    id: "4",
    question: "ما هي المناطق التي تغطونها؟",
    answer: "نغطي جميع مناطق المملكة العربية السعودية. فنيونا المحترفون يصلون إليك أينما كنت!"
  },
  {
    id: "5",
    question: "كيف أحجز موعد؟",
    answer: "يمكنك الحجز بسهولة من خلال الضغط على زر 'احجز الآن' في الصفحة الرئيسية، أو من خلال صفحة الطلبات. اختر جهازك والمشكلة والوقت المناسب لك!"
  }
];

const knowledgeBase: { [key: string]: string } = {
  "fixate": "Fixate هي منصة متكاملة لصيانة الأجهزة الإلكترونية في السعودية. نقدم خدمات إصلاح احترافية للجوالات واللابتوبات والتابلت مع ضمان يصل إلى 12 شهراً.",
  "أسعار": "أسعارنا تنافسية وشفافة! تبدأ من 100 ريال لإصلاح الشاشات و 80 ريال للبطاريات. استخدم حاسبة الأسعار للحصول على سعر دقيق.",
  "ضمان": "نقدم ضمان ذهبي يصل إلى 12 شهراً على جميع قطع الغيار والخدمات المقدمة.",
  "وقت": "معظم الإصلاحات تتم في نفس اليوم! الإصلاحات البسيطة تستغرق 30-60 دقيقة فقط.",
  "حجز": "يمكنك الحجز من خلال زر 'احجز الآن' في الصفحة الرئيسية، أو زيارة صفحة الطلبات مباشرة.",
  "مناطق": "نغطي جميع مناطق المملكة العربية السعودية. فنيونا يصلون إليك أينما كنت!",
  "خدمات": "نقدم خدمات إصلاح شاملة: تغيير الشاشات، تغيير البطاريات، إصلاح منافذ الشحن، إصلاح الكاميرات، حل مشاكل البرامج، والمزيد!",
  "أجهزة": "نصلح جميع أنواع الأجهزة: iPhone, Samsung, Huawei, MacBook, Dell, HP, Lenovo, iPad, Samsung Tab وجميع الأنواع الأخرى!",
  "دفع": "نقبل جميع طرق الدفع: نقداً، بطاقات الائتمان، Apple Pay، STC Pay، ومدى.",
  "تواصل": "يمكنك التواصل معنا عبر البريد الإلكتروني: support@fixate.site أو من خلال هذا البوت مباشرة!"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "مرحباً بك في Fixate! 👋\n\nأنا هنا لمساعدتك. يمكنك اختيار سؤال من الأسئلة الشائعة أدناه، أو كتابة سؤالك مباشرة.",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check knowledge base
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Default response
    return "شكراً لسؤالك! للحصول على إجابة دقيقة، يمكنك:\n\n• استخدام الأسئلة الشائعة أعلاه\n• التواصل معنا على: support@fixate.site\n• الاتصال بنا مباشرة\n\nأو جرب إعادة صياغة سؤالك بطريقة أخرى! 😊";
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
    // Add user question
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question.question,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Add bot answer after delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: question.answer,
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
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-14 w-14 md:h-16 md:w-16 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          size="icon"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse"></span>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[400px] h-[100dvh] md:h-[600px] md:max-h-[80vh] shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-4 duration-300 md:rounded-lg rounded-none">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">مساعد Fixate</CardTitle>
                  <p className="text-xs text-white/80">متصل الآن</p>
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
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "bg-background border border-border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                    {message.timestamp.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
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
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
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
            <p className="text-xs text-muted-foreground mb-2">أسئلة شائعة:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.slice(0, 3).map((q) => (
                <Button
                  key={q.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(q)}
                  className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {q.question}
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
                placeholder="اكتب سؤالك هنا..."
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                size="icon"
                className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
