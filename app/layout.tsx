import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mijn Multimove",
  description:
    "Oefeningen, opdrachten en beweegspelletjes voor elke Multimove-les.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl-BE">
      <body>{children}</body>
    </html>
  );
}
