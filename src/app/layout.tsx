import type { Metadata } from "next";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import { appTheme } from "../theme";

export const metadata: Metadata = {
  title: "Netherlands Map Dashboard (OpenLayers + WFS)",
  description:
    "Interactive dashboard with OpenLayers, Mantine UI, and a WFS demo layer for Dutch municipalities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <MantineProvider theme={appTheme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
