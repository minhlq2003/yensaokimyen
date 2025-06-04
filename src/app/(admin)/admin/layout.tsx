"use client";

import { Layout, message } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { LayoutSider } from "@/src/components/Sider";
import { I18nextProvider, useTranslation } from "react-i18next";
import LocaleProvider from "@/src/components/locale-provider";
import { i18nInstance } from "@/src/language/i18n";
import HeaderCMS from "@/src/components/header-cms";
import "../../../globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const [userAvatar, setUserAvatar] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user || !user.id) {
        router.push("/signin");
      } else if (user.role !== "admin") {
        router.push("/signin");
      }
    }
  }, [router]);

  return (
    <html lang={"en"}>
      <head>
        <title>Admin | Yến Sào Kim Yến</title>
      </head>
      <body>
        <Suspense fallback={<div>Đang tải</div>}>
          <LocaleProvider>
            {() => (
              <I18nextProvider i18n={i18nInstance}>
                <Layout className="layout" id="mtb-erp-app">
                  <LayoutSider collapsed={collapsed} language={"en"} />
                  <Layout>
                    <HeaderCMS
                      collapsed={collapsed}
                      setCollapsed={setCollapsed}
                      userAvatar={userAvatar}
                    />
                    <Content style={styles.content}>
                      <Breadcrumbs />
                      <Layout
                        className="site-layout-background rounded-[8px]"
                        style={styles.layout}
                      >
                        <Content
                          style={{
                            overflowY: "scroll",
                            height: "calc(100vh - 210px)",
                            padding: "0 12px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                          }}
                        >
                          <Toaster
                            richColors
                            position="top-center"
                            duration={2000}
                          />
                          {children}
                        </Content>
                      </Layout>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                      "Copyright ©2025 - Group 9 - KTPM"
                    </Footer>
                  </Layout>
                </Layout>
              </I18nextProvider>
            )}
          </LocaleProvider>
        </Suspense>
      </body>
    </html>
  );
}

const styles = {
  content: { padding: "0 32px", minHeight: "calc(100vh - 134px)" },
  layout: { padding: "12px 0", borderRadius: "0.5rem" },
};
