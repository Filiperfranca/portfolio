/*
  Portfolio desenvolvido por Filipe França
  GitHub: https://github.com/Filiperfranca
  LinkedIn: https://www.linkedin.com/in/filiperfranca/
*/
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Filipe França — Full Stack Developer",
  description:
    "Portfólio de Filipe França, desenvolvedor Full Stack. React, Next.js, Node.js, Python, C. Formado pelo CS50x Harvard.",
  keywords: [
    "Filipe França",
    "desenvolvedor",
    "full stack",
    "react",
    "next.js",
    "node.js",
    "portfólio",
    "web developer",
  ],
  authors: [{ name: "Filipe França" }],
  openGraph: {
    title: "Filipe França — Full Stack Developer",
    description:
      "Portfólio interativo de Filipe França. Design cinematográfico, projetos reais, habilidades técnicas comprovadas.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log(
                "%cDesenvolvido por Filipe França",
                "color: #a855f7; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
              );
              console.log("LinkedIn: https://www.linkedin.com/in/filiperfranca/");
              console.log("GitHub: https://github.com/Filiperfranca");
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
