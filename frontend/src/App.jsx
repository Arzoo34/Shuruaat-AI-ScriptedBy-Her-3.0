import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider, useTranslation } from "./lib/language-context";
import { AppLayout } from "./components/AppLayout";
import { BackendStatusIndicator } from "./components/BackendStatusIndicator";
import { useAppStore } from "./store/appStore";

// Page Components
import Onboarding from "./routes/index";
import AuthPage from "./routes/auth";
import TabsLayout from "./routes/_tabs";
import HomePage from "./routes/_tabs.home";
import ListingPage from "./routes/_tabs.listing";
import QAPage from "./routes/_tabs.qa";
import HealthPage from "./routes/_tabs.health";
import ProfilePage from "./routes/_tabs.profile";
import PreviewPage from "./routes/listing.preview";
import PublishSuccessPage from "./routes/publish-success";

function AuthInitializer() {
  const initializeAuth = useAppStore((s) => s.initializeAuth);
  const { setLanguage, setBusinessName } = useTranslation();

  useEffect(() => {
    const cleanupPromise = initializeAuth(setLanguage, setBusinessName);
    return () => {
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === "function") {
          cleanup();
        }
      });
    };
  }, [initializeAuth, setLanguage, setBusinessName]);

  return null;
}

function GlobalWrapper({ children }) {
  return (
    <div className="min-h-dvh bg-background bg-block-print">
      <AppLayout className="relative mx-auto max-w-[480px] bg-background/60">
        {/* Global minimal Indian texture borders */}
        <div className="absolute left-0 top-0 bottom-0 w-[6px] indian-border-minimal-left z-50 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[6px] indian-border-minimal-right z-50 pointer-events-none" />
        <div className="indian-border-minimal-top w-full max-w-[480px] fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none" />
        <div className="indian-border-minimal-bottom w-full max-w-[480px] fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none" />

        <BackendStatusIndicator />
        {children}
      </AppLayout>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthInitializer />
      <BrowserRouter>
        <GlobalWrapper>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Tabs routes layout */}
            <Route element={<TabsLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/listing" element={<ListingPage />} />
              <Route path="/qa" element={<QAPage />} />
              <Route path="/health" element={<HealthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Non-tab routes */}
            <Route path="/listing/preview" element={<PreviewPage />} />
            <Route path="/publish-success" element={<PublishSuccessPage />} />

            {/* Redirect any unknown route to onboarding / home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </GlobalWrapper>
      </BrowserRouter>
    </LanguageProvider>
  );
}
