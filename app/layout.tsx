import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {NavLinks} from "./components/nav-links";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
export const metadata: Metadata = {
  title: {
    // absolute: '',
    default: 'About Layout Defult title',
    template: '%s | Template',
  },
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <header style={{
          backgroundColor: 'ghostwhite',
          padding: '1rem'
          }}>
          <NavLinks />
        </header> */}
        {children}
        {/* <footer style={{
          backgroundColor: 'ghostwhite',
          padding: '1rem'
          }}>
          <p>footer</p>
        </footer> */}
      </body>
    </html>
  );
}
