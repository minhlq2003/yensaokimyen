"use client";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import Header from "../../components/header";
import Footer from "../../components/footer";
import LocaleProvider from "../../components/locale-provider";
import { i18nInstance } from "../../language/i18n";
import { HeroUIProvider } from "@heroui/system";
import "../../../globals.css";
import LoadingPage from "@/src/components/loading-page";
import PopupContact from "@/src/components/popup-contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased font-merriweather`}
      >
        <Suspense fallback={<LoadingPage />}>
          <LocaleProvider>
            {() => (
              <I18nextProvider i18n={i18nInstance}>
                <Header />
                <PopupContact />
                <div className="mt-5 md:mt-20">
                  <HeroUIProvider>{children}</HeroUIProvider>
                </div>
                <Footer />
              </I18nextProvider>
            )}
          </LocaleProvider>
        </Suspense>
      </body>
    </html>
  );
}
