// Custom layout for /video — no global Navbar or Footer
// Injects a <style> that hides them immediately (no hydration flash)
export default function VideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > header,
        body > footer { display: none !important; }
        body > main { padding: 0 !important; margin: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
