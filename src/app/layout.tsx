import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Rick & Morty Explorer</title>
        <meta name="description" content="Explore characters from Rick and Morty" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('darkMode');
                  const html = document.documentElement;

                  if (saved !== null) {
                    const isDark = saved === 'true';
                    if (isDark) {
                      html.classList.add('dark');
                    } else {
                      html.classList.remove('dark');
                    }
                  } else {
                    // Default to dark mode
                    html.classList.add('dark');
                    localStorage.setItem('darkMode', 'true');
                  }
                } catch (e) {
                  // If localStorage fails, default to dark mode
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <header className="flex flex-col md:flex-row justify-between items-center p-4">
          <h1 className="centered-title">
            Rick & Morty
          </h1>
          <div className="header-actions">
            <ThemeToggle />
          </div>
        </header>
        <main>{children}</main>
        <footer>
          Powered by Rick and Morty API
        </footer>
      </body>
    </html>
  );
}