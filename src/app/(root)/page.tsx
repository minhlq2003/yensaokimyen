"use server";

import Home from "@/src/components/home-page";
import { Images } from "@/src/constant/images";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Yến Sào Kim Yến`,
    description:
      "Yến Sào Kim Yến - Tổ yến, yến sào chất lượng, giá cả cạnh tranh",
    openGraph: {
      title: `Yến Sào Kim Yến`,
      description: "Yến Sào Kim Yến",
      images: [{ url: Images.logo.src }],
    },
  };
}

export default async function Page() {
  return <Home />;
}
