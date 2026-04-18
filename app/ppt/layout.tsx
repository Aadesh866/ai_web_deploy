// Custom layout for /ppt — no global Navbar or Footer
// Injects a <style> that hides them immediately (no hydration flash)
export default function PPTLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > header,
        body > footer { display: none !important; }
        body > main { padding: 0 !important; margin: 0 !important; }
        body { overflow: hidden; }
      `}</style>
      {children}
    </>
  );
}
