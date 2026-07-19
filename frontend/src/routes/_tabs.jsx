import { Outlet, useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { ChatbotAssistant } from "@/components/ChatbotAssistant";
import { useAppStore } from "@/store/appStore";
import { useEffect } from "react";

export default function TabsLayout() {
  const user = useAppStore((s) => s.user);
  const authLoading = useAppStore((s) => s.authLoading);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);
  if (authLoading) {
    return <div className="flex min-h-dvh items-center justify-center bg-background px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>;
  }
  if (!user) {
    return null;
  }
  return <div className="w-full pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))]">
      <Outlet />
      <BottomNav />
      <ChatbotAssistant />
    </div>;
}
