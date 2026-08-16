import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import "./globals.css";
import Footer from "@/components/ui/footer";
import { IntroProvider } from "@/components/IntroProvider";
import SmoothScroll from "@/components/SmoothScroll";



const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rey Iann Tigley — Software Engineer",
  description:
    "Portfolio of Rey Iann Tigley, a software engineer focused on frontend and interaction work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
    >
      <body>
        <SmoothScroll>
          <IntroProvider>
            {children}
            <Footer />
          </IntroProvider>
        </SmoothScroll>
      </body>

    </html>
  );
}
