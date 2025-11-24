import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Send, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

export default function Chat() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: rooms } = trpc.chat.getMyRooms.useQuery(undefined, {
    enabled: !!user,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const { data: messages, refetch: refetchMessages } = trpc.chat.getMessages.useQuery(
    { roomId: selectedRoom! },
    {
      enabled: !!selectedRoom,
      refetchInterval: 3000, // Refresh every 3 seconds
    }
  );

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessageText("");
      refetchMessages();
      scrollToBottom();
    },
  });

  const markAsReadMutation = trpc.chat.markAsRead.useMutation();

  useEffect(() => {
    if (selectedRoom && messages) {
      markAsReadMutation.mutate({ roomId: selectedRoom });
    }
  }, [selectedRoom, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
            يجب تسجيل الدخول للوصول إلى الدردشة
          </p>
          <Button onClick={() => setLocation("/")}>
            العودة للرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!selectedRoom || !messageText.trim()) return;

    sendMessageMutation.mutate({
      chatRoomId: selectedRoom,
      content: messageText,
      messageType: "text",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">الدردشة</h1>
            <Button variant="ghost" onClick={() => setLocation("/")}>
              <ArrowRight className="ml-2" />
              الرئيسية
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
          {/* Rooms List */}
          <Card className="p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">المحادثات</h2>
            {!rooms || rooms.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                لا توجد محادثات حالياً
              </p>
            ) : (
              <div className="space-y-2">
                {rooms.map((room: any) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`w-full text-right p-3 rounded-lg transition-colors ${
                      selectedRoom === room.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <div className="font-medium">طلب #{room.serviceRequestId}</div>
                    <div className="text-sm opacity-80">
                      {room.lastMessageAt
                        ? new Date(room.lastMessageAt).toLocaleDateString("ar-SA")
                        : "لا توجد رسائل"}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Messages */}
          <Card className="md:col-span-2 flex flex-col">
            {!selectedRoom ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                اختر محادثة لعرض الرسائل
              </div>
            ) : (
              <>
                {/* Messages List */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {!messages || messages.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      لا توجد رسائل. ابدأ المحادثة الآن!
                    </p>
                  ) : (
                    messages.map((msg: any) => {
                      const isOwn = msg.senderId === user.id;
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isOwn
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="break-words">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(msg.createdAt).toLocaleTimeString("ar-SA", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="اكتب رسالتك..."
                      className="flex-1"
                      disabled={sendMessageMutation.isPending}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim() || sendMessageMutation.isPending}
                    >
                      <Send className="ml-2" />
                      إرسال
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
