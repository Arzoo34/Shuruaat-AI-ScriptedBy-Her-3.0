export function AppLayout({ children, className = "" }) {
  return <div className={`w-full min-h-dvh ${className}`}>
      {children}
    </div>;
}
