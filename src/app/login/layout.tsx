function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      <div className="m-auto">
        {children}
      </div>
    </main>
  );
}

export default Layout
