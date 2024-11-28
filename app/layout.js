import { UserProvider } from "@/contexts/userContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "DevReady Academy - Master Mock Interviews with Industry Experts",
  description:
    "Prepare for your dream job with DevReady Academy. Participate in mock interviews conducted by experienced company experts and receive personalized feedback. Specializing in React, JavaScript, Node.js, MongoDB, and HTML/CSS interviews.",
  keywords:
    "mock interviews with experts, technical interview preparation, React interview questions, JavaScript interview, Node.js interview, MongoDB interview, HTML CSS interview, expert-led mock interviews, interview feedback, coding interview practice",
  author: "DevReady Academy",
  openGraph: {
    title: "DevReady Academy - Expert-Led Mock Interviews",
    description:
      "Boost your career prospects with mock interviews conducted by industry professionals. Get in-depth feedback on MERN Stack, React, JavaScript, and HTML/CSS skills. Master your technical interviews with confidence.",
    type: "website",
    url: "https://devreadyacademy.com", // Replace with your actual URL
    image: "/images/devready-expert-og.jpg", // Update the Open Graph image
  },
  twitter: {
    card: "summary_large_image",
    title: "DevReady Academy - Mock Interviews by Experts",
    description:
      "Practice technical interviews with real industry professionals. Specializing in React, Node.js, MongoDB, Express, JavaScript, and HTML/CSS. Ace your dream job interview with personalized feedback.",
    image: "/images/devready-expert-twitter.jpg", // Update the Twitter card image
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: { url: "/icons/favicon.ico" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <UserProvider>
          {children}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </UserProvider>
      </body>
    </html>
  );
}
