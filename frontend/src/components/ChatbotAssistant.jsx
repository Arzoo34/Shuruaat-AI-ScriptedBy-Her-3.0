import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/lib/language-context";
import { sendAssistantMessage } from "@/api/client";
export function ChatbotAssistant() {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  useEffect(() => {
    let initialGreeting = "Hello! I am your Shuruaat AI Assistant. How can I help you onboard or optimize your store today?";
    if (language === "hi") {
      initialGreeting = "\u0928\u092E\u0938\u094D\u0924\u0947! \u092E\u0948\u0902 \u0906\u092A\u0915\u093E \u0936\u0941\u0930\u0941\u0906\u0924 AI \u0938\u0939\u093E\u092F\u0915 \u0939\u0942\u0901\u0964 \u0906\u091C \u092E\u0948\u0902 \u0906\u092A\u0915\u0940 \u0926\u0941\u0915\u093E\u0928 \u0915\u094B \u0911\u0928\u0932\u093E\u0907\u0928 \u0932\u093E\u0928\u0947 \u092F\u093E \u0906\u092A\u0915\u0947 \u0911\u0930\u094D\u0921\u0930 \u092C\u0922\u093C\u093E\u0928\u0947 \u092E\u0947\u0902 \u0915\u094D\u092F\u093E \u092E\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?";
    } else if (language === "ta") {
      initialGreeting = "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD! \u0BA8\u0BBE\u0BA9\u0BCD \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BB7\u0BC1\u0BB0\u0BC1\u0BB5\u0BBE\u0BA4\u0BCD AI \u0B89\u0BA4\u0BB5\u0BBF\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD. \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0B9F\u0BC8\u0BAF\u0BC8 \u0B86\u0BA9\u0BCD\u0BB2\u0BC8\u0BA9\u0BBF\u0BB2\u0BCD \u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BC1 \u0BB5\u0BB0 \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BB5\u0BBF\u0BB1\u0BCD\u0BAA\u0BA9\u0BC8\u0BAF\u0BC8 \u0BAE\u0BC7\u0BAE\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4 \u0B87\u0BA9\u0BCD\u0BB1\u0BC1 \u0BA8\u0BBE\u0BA9\u0BCD \u0B8E\u0BB5\u0BCD\u0BB5\u0BBE\u0BB1\u0BC1 \u0B89\u0BA4\u0BB5 \u0BAE\u0BC1\u0B9F\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD?";
    } else if (language === "bn") {
      initialGreeting = "\u09A8\u09AE\u09B8\u09CD\u0995\u09BE\u09B0! \u0986\u09AE\u09BF \u0986\u09AA\u09A8\u09BE\u09B0 \u09B6\u09C1\u09B0\u09C1\u09AF\u09BC\u09BE\u09A4 AI \u09B8\u09B9\u0995\u09BE\u09B0\u09C0\u0964 \u0986\u09AA\u09A8\u09BE\u09B0 \u09A6\u09CB\u0995\u09BE\u09A8 \u0985\u09A8\u09B2\u09BE\u0987\u09A8\u09C7 \u0986\u09A8\u09A4\u09C7 \u09AC\u09BE \u09AC\u09BF\u0995\u09CD\u09B0\u09BF \u09AC\u09BE\u09DC\u09BE\u09A4\u09C7 \u0986\u099C \u0986\u09AE\u09BF \u0986\u09AA\u09A8\u09BE\u0995\u09C7 \u0995\u09C0\u09AD\u09BE\u09AC\u09C7 \u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09BF?";
    }
    setMessages([
      { role: "assistant", content: initialGreeting }
    ]);
  }, [language]);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);
  const handleSend = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);
    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));
      const response = await sendAssistantMessage(text, historyPayload, language);
      setMessages((prev) => [...prev, { role: "assistant", content: response.reply }]);
    } catch (err) {
      console.error("Chatbot request failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am having trouble connecting to the server. But you can check **[Listing Agent](/listing)** to list products, or **[Health Dashboard](/health)** to view return audits!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  const renderMessageContent = (content) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(content.substring(lastIndex, matchIndex));
      }
      const label = match[1];
      const route = match[2];
      parts.push(
        <button
          key={matchIndex}
          onClick={() => {
            setIsOpen(false);
            navigate(route);
          }}
          className="inline-flex items-center gap-1 font-bold text-primary underline hover:text-accent transition-colors cursor-pointer text-left"
        >
          {label} <Navigation className="h-3 w-3 inline" />
        </button>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }
    return parts.length > 0 ? parts : content;
  };
  const suggestionChips = {
    en: [
      { label: "\u{1F4E6} How to list products?", query: "How do I list a product and write titles?" },
      { label: "\u{1F4C9} How to reduce returns?", query: "How can I reduce COD returns and RTO?" },
      { label: "\u2753 Where are buyer questions?", query: "Where do I see buyer questions and edit replies?" }
    ],
    hi: [
      { label: "\u{1F4E6} \u092A\u094D\u0930\u094B\u0921\u0915\u094D\u091F \u0932\u093F\u0938\u094D\u091F \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902?", query: "\u092E\u0948\u0902 \u090F\u0915 \u0909\u0924\u094D\u092A\u093E\u0926 \u0915\u0948\u0938\u0947 \u0938\u0942\u091A\u0940\u092C\u0926\u094D\u0927 \u0915\u0930\u0942\u0902 \u0914\u0930 \u0936\u0940\u0930\u094D\u0937\u0915 \u0932\u093F\u0916\u0942\u0902?" },
      { label: "\u{1F4C9} \u0930\u093F\u091F\u0930\u094D\u0928 \u0915\u0948\u0938\u0947 \u0915\u092E \u0915\u0930\u0947\u0902?", query: "\u092E\u0948\u0902 \u0938\u0940\u0913\u0921\u0940 \u0930\u093F\u091F\u0930\u094D\u0928 \u0914\u0930 \u0906\u0930\u091F\u0940\u0913 \u0915\u094B \u0915\u0948\u0938\u0947 \u0915\u092E \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0902?" },
      { label: "\u2753 \u0915\u094D\u0930\u0947\u0924\u093E \u0915\u0947 \u0938\u0935\u093E\u0932 \u0915\u0939\u093E\u0902 \u0926\u0947\u0916\u0947\u0902?", query: "\u092E\u0948\u0902 \u0915\u094D\u0930\u0947\u0924\u093E \u0915\u0947 \u0938\u0935\u093E\u0932 \u0915\u0939\u093E\u0902 \u0926\u0947\u0916 \u0938\u0915\u0924\u093E \u0939\u0942\u0902 \u0914\u0930 \u0909\u0924\u094D\u0924\u0930 \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0902?" }
    ],
    ta: [
      { label: "\u{1F4E6} \u0BA4\u0BAF\u0BBE\u0BB0\u0BBF\u0BAA\u0BCD\u0BAA\u0BC8 \u0BAA\u0B9F\u0BCD\u0B9F\u0BBF\u0BAF\u0BB2\u0BBF\u0B9F\u0BC1\u0BB5\u0BA4\u0BC1 \u0B8E\u0BAA\u0BCD\u0BAA\u0B9F\u0BBF?", query: "\u0B92\u0BB0\u0BC1 \u0BA4\u0BAF\u0BBE\u0BB0\u0BBF\u0BAA\u0BCD\u0BAA\u0BC8 \u0B8E\u0BB5\u0BCD\u0BB5\u0BBE\u0BB1\u0BC1 \u0BAA\u0B9F\u0BCD\u0B9F\u0BBF\u0BAF\u0BB2\u0BBF\u0B9F\u0BC1\u0BB5\u0BA4\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA4\u0BB2\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BC8 \u0B8E\u0BB4\u0BC1\u0BA4\u0BC1\u0BB5\u0BA4\u0BC1?" },
      { label: "\u{1F4C9} \u0BB0\u0BBF\u0B9F\u0BCD\u0B9F\u0BB0\u0BCD\u0BA9\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BC8\u0BAA\u0BCD\u0BAA\u0BA4\u0BC1 \u0B8E\u0BAA\u0BCD\u0BAA\u0B9F\u0BBF?", query: "COD \u0BB0\u0BBF\u0B9F\u0BCD\u0B9F\u0BB0\u0BCD\u0BA9\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD RTO \u0B90 \u0B8E\u0BB5\u0BCD\u0BB5\u0BBE\u0BB1\u0BC1 \u0B95\u0BC1\u0BB1\u0BC8\u0BAA\u0BCD\u0BAA\u0BA4\u0BC1?" }
    ],
    bn: [
      { label: "\u{1F4E6} \u09AA\u09CD\u09B0\u09CB\u09A1\u09BE\u0995\u09CD\u099F \u09B2\u09BF\u09B8\u09CD\u099F \u0995\u09C0\u09AD\u09BE\u09AC\u09C7 \u0995\u09B0\u09AC?", query: "\u0986\u09AE\u09BF \u0995\u09C0\u09AD\u09BE\u09AC\u09C7 \u098F\u0995\u099F\u09BF \u09AA\u09A3\u09CD\u09AF \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09AD\u09C1\u0995\u09CD\u09A4 \u0995\u09B0\u09AC \u098F\u09AC\u0982 \u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE \u09B2\u09BF\u0996\u09AC?" },
      { label: "\u{1F4C9} \u09B0\u09BF\u099F\u09BE\u09B0\u09CD\u09A8 \u0995\u09C0\u09AD\u09BE\u09AC\u09C7 \u0995\u09AE\u09BE\u09AC?", query: "\u0986\u09AE\u09BF \u0995\u09C0\u09AD\u09BE\u09AC\u09C7 \u09B8\u09BF\u0993\u09A1\u09BF \u09B0\u09BF\u099F\u09BE\u09B0\u09CD\u09A8 \u098F\u09AC\u0982 \u0986\u09B0\u099F\u09BF\u0993 \u0995\u09AE\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09BF?" }
    ]
  }[language] || [
    { label: "\u{1F4E6} How to list products?", query: "How do I list a product?" },
    { label: "\u{1F4C9} How to reduce returns?", query: "How can I reduce COD returns?" }
  ];
  return <div className="fixed inset-x-0 bottom-0 mx-auto max-w-[480px] w-full h-0 pointer-events-none z-40">
      {
    /* Floating Action Button (FAB) */
  }
      <div className="absolute right-5 bottom-[7.5rem] pointer-events-auto">
        <motion.button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent shadow-lg shadow-primary/20 text-primary-foreground focus:outline-none btn-lift"
  >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </motion.button>
      </div>

      {
    /* Chat Window Panel */
  }
      <AnimatePresence>
        {isOpen && <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 30, scale: 0.95 }}
    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
    className="absolute right-5 bottom-[11.5rem] pointer-events-auto flex h-[480px] w-[calc(100%-2.5rem)] max-w-[360px] flex-col rounded-3xl border border-border/80 bg-[#FFF8F2] shadow-2xl backdrop-blur-md"
  >
            {
    /* Header */
  }
            <div className="flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-primary/10 to-accent/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">Shuruaat AI Sahayak</h4>
                  <span className="text-[10px] text-[oklch(0.5_0.14_145)] font-semibold uppercase tracking-wider">Online Assistant</span>
                </div>
              </div>
              <button
    type="button"
    onClick={() => setIsOpen(false)}
    className="rounded-lg p-1 text-muted-foreground hover:bg-black/5 hover:text-foreground"
  >
                <X className="h-4 w-4" />
              </button>
            </div>

            {
    /* Message Area */
  }
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => <div
    key={i}
    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
  >
                  <div
    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card text-foreground border border-border/60 rounded-tl-sm"}`}
  >
                    {m.role === "user" ? m.content : <span className="whitespace-pre-wrap">
                        {renderMessageContent(m.content)}
                      </span>}
                  </div>
                </div>)}

              {loading && <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-card border border-border/60 p-3 text-sm flex items-center gap-1 shadow-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:0.4s]" />
                  </div>
                </div>}
              <div ref={chatEndRef} />
            </div>

            {
    /* Quick Suggestions Chips */
  }
            {messages.length === 1 && !loading && <div className="px-4 pb-2 flex flex-col gap-1.5">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-1">Suggested questions:</p>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {suggestionChips.map((chip, idx) => <button
    key={idx}
    onClick={() => handleSend(chip.query)}
    className="rounded-full bg-card hover:bg-primary/10 border border-border/70 hover:border-primary/40 px-3 py-1 text-xs text-foreground/80 hover:text-primary transition-all text-left font-medium"
  >
                      {chip.label}
                    </button>)}
                </div>
              </div>}

            {
    /* Input Box */
  }
            <div className="border-t border-border/60 bg-card p-3 rounded-b-3xl">
              <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSend(inputVal);
    }}
    className="flex items-center gap-2"
  >
                <input
    type="text"
    value={inputVal}
    onChange={(e) => setInputVal(e.target.value)}
    placeholder="Ask a question..."
    className="flex-1 rounded-full border border-border/80 bg-background px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none placeholder:text-muted-foreground/60"
  />
                <button
    type="submit"
    disabled={!inputVal.trim() || loading}
    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary hover:bg-primary/95 text-primary-foreground shadow-sm disabled:opacity-50 transition-colors"
  >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}
