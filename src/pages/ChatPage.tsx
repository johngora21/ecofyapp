import React, { useRef, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Send, Bot, User, Mic, Plus, MessageSquare, History, X } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

interface ChatSession {
  id: number;
  title: string;
  messages: Message[];
}

const initialWelcome = "Hello! I am your Ecofy AI assistant. How can I help you today?";

const ChatPage: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: 1,
      title: "New Chat",
      messages: [
        { id: 1, sender: "ai", text: initialWelcome }
      ]
    }
  ]);
  const [activeSessionId, setActiveSessionId] = useState<number>(1);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [showMobileHistory, setShowMobileHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // Get active session
  const activeSession = sessions.find(s => s.id === activeSessionId)!;

  // Handle sending message
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim()
    };
    // Add user message
    updateSessionMessages([...activeSession.messages, userMsg]);
    setInput("");
    setAiTyping(true);
    // Simulate AI response
    setTimeout(() => {
      updateSessionMessages([
        ...activeSession.messages,
        userMsg,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "This is a sample AI response. (Connect to your AI backend here.)"
        }
      ]);
      setAiTyping(false);
    }, 1200);
  };

  // Update messages for active session
  function updateSessionMessages(newMessages: Message[]) {
    setSessions(sessions =>
      sessions.map(s =>
        s.id === activeSessionId ? { ...s, messages: newMessages } : s
      )
    );
  }

  // Scroll to bottom on new message
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession.messages, aiTyping]);

  // Voice note functionality
  const handleMicClick = () => {
    if (!recognition) return alert("Voice recognition not supported in this browser.");
    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? " " : "") + transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
  };

  // New chat
  const handleNewChat = () => {
    const newId = Date.now();
    setSessions([
      { id: newId, title: "New Chat", messages: [ { id: newId, sender: "ai", text: initialWelcome } ] },
      ...sessions
    ]);
    setActiveSessionId(newId);
    setShowMobileHistory(false);
  };

  // Set session title (first user message or default)
  React.useEffect(() => {
    setSessions(sessions =>
      sessions.map(s => {
        if (s.id === activeSessionId && s.title === "New Chat") {
          const firstUserMsg = s.messages.find(m => m.sender === "user");
          if (firstUserMsg) {
            return { ...s, title: firstUserMsg.text.slice(0, 30) + (firstUserMsg.text.length > 30 ? "..." : "") };
          }
        }
        return s;
      })
    );
  }, [activeSession.messages, activeSessionId]);

  // Sidebar content (for both desktop and mobile)
  const sidebarContent = (
    <div className="flex flex-col h-full">
      <Button
        onClick={handleNewChat}
        className="w-full mb-2 h-9 text-sm flex items-center gap-2"
        variant="outline"
      >
        <Plus className="w-4 h-4" /> New Chat
      </Button>
      <div className="flex-1 overflow-y-auto space-y-1">
        {sessions.map(session => (
          <Button
            key={session.id}
            variant={session.id === activeSessionId ? "default" : "ghost"}
            className={`w-full justify-start text-sm px-3 py-2 rounded ${session.id === activeSessionId ? "bg-shamba-green text-white" : "text-gray-900"}`}
            onClick={() => setActiveSessionId(session.id)}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            <span className="truncate">{session.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  // Mobile chat history as vertical panel
  const mobileHistoryPanel = (
    <div className="md:hidden absolute left-0 right-0 top-0 z-30 bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top-2">
      <div className="flex items-center justify-between p-3 border-b">
        <span className="font-semibold text-gray-900 text-sm flex items-center gap-2">
          <History className="w-4 h-4" /> Chat History
        </span>
        <Button size="icon" variant="ghost" onClick={() => setShowMobileHistory(false)}>
          <X className="w-5 h-5" />
        </Button>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <Button
          onClick={handleNewChat}
          className="w-full h-8 text-xs flex items-center gap-1 border border-shamba-green text-shamba-green bg-white"
          variant="outline"
        >
          <Plus className="w-4 h-4" /> New Chat
        </Button>
        {sessions.map(session => (
          <Button
            key={session.id}
            variant={session.id === activeSessionId ? "default" : "ghost"}
            className={`w-full justify-start text-xs px-3 py-2 rounded ${session.id === activeSessionId ? "bg-shamba-green text-white" : "text-gray-900"}`}
            onClick={() => { setActiveSessionId(session.id); setShowMobileHistory(false); }}
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            <span className="truncate">{session.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-80px)] relative">
      {/* Sidebar for saved chats (desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-100 bg-white p-3 space-y-2">
        {sidebarContent}
      </aside>
      {/* Main chat area */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto p-4 relative">
        {/* Mobile: Show/Hide history button */}
        <div className="md:hidden flex items-center mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            aria-label="Show chat history"
            onClick={() => setShowMobileHistory(true)}
          >
            <History className="w-5 h-5" />
          </Button>
          <h1 className="text-base font-semibold text-gray-900">AI Chat Assistant</h1>
        </div>
        {/* Mobile: History panel */}
        {showMobileHistory && mobileHistoryPanel}
        {/* Desktop: Heading */}
        <h1 className="hidden md:block text-base font-semibold text-gray-900 mb-2">AI Chat Assistant</h1>
        <Card className="flex-1 flex flex-col border border-gray-100 shadow-none">
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white" style={{ minHeight: 0 }}>
              {activeSession.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-shamba-green text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  } flex items-end gap-2`}>
                    {msg.sender === "ai" && <Bot className="w-4 h-4 mr-1 text-shamba-green" />}
                    <span>{msg.text}</span>
                    {msg.sender === "user" && <User className="w-4 h-4 ml-1 text-shamba-green-light" />}
                  </div>
                </div>
              ))}
              {aiTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-lg px-3 py-2 text-sm bg-gray-100 text-gray-900 rounded-bl-none flex items-center gap-2 animate-pulse">
                    <Bot className="w-4 h-4 mr-1 text-shamba-green" />
                    <span>AI is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form
              className="flex items-center gap-2 border-t p-2 bg-white"
              onSubmit={e => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 text-sm h-9 px-3"
                placeholder="Type your message..."
                autoFocus
                autoComplete="off"
              />
              <Button
                type="button"
                className={`h-9 px-3 text-sm flex items-center justify-center ${listening ? "bg-shamba-green text-white" : "bg-white text-shamba-green border border-shamba-green"}`}
                onClick={handleMicClick}
                tabIndex={-1}
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                type="submit"
                className="h-9 px-3 text-sm"
                disabled={!input.trim() || aiTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage; 