import Image from "next/image";
import SearchBar from "@/components/search-bar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Logo */}
      <header className="glass-effect z-10 sticky top-0 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/words-logo.svg"
            alt="Deep Words"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 text-transparent bg-clip-text">
            Deep Words
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Blog</a>
          <button className="glass-effect px-4 py-2 text-sm font-medium hover:bg-muted/70 transition-colors">
            Sign In
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200 via-transparent to-transparent dark:from-purple-900/20 dark:via-transparent dark:to-transparent -z-10" />

        <div className="max-w-3xl w-full mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Discover language through a
              <span className="relative ml-2">
                visual lens
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"></span>
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Deep Words combines advanced AI with visual mnemonics to create a premium language exploration platform for creative professionals.
            </p>
          </div>

          <div className="glass-effect-intense p-6 md:p-8 rounded-2xl">
            <SearchBar />
            <p className="text-xs text-muted-foreground mt-4">
              Try typing "eloquent", "vibrant", or "serendipity"
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="glass-effect p-4 rounded-xl flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 10L12.2581 12.4436C12.6766 12.7574 13.2584 12.7103 13.6203 12.3346L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-sm">AI-Powered Context</span>
            </div>

            <div className="glass-effect p-4 rounded-xl flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V6Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-sm">Visual Mnemonics</span>
            </div>

            <div className="glass-effect p-4 rounded-xl flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19L17 21L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15V4M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 12H4M20 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm">Export Anywhere</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-effect mt-auto py-6 px-6 text-center text-sm text-muted-foreground">
        <p>© 2024 Deep Words. All rights reserved.</p>
      </footer>
    </div>
  );
}
