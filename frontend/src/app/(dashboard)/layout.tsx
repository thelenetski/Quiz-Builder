import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Builder - create",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full min-h-dvh bg-gray-200 p-10">{children}</main>;
}
