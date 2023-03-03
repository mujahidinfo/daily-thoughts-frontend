import Navbar from "@/components/Navbar";
import { RouterTransition } from "@/components/RouterTransition";
import { UseWrapper } from "@/hooks/useContext";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UseWrapper>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Poppins, sans-serif",
          colors: {
            primary100: ["#6808FF"],
            primary10: ["#F4F7FC"],
            dark: ["#171431 "],
          },
          components: {
            Button: {
              defaultProps: {
                color: "primary",
                variant: "filled",
              },
            },
          },
        }}
      >
        <RouterTransition />
        {/* Toaster Component*/}
        <Toaster reverseOrder={false} />
        <Link
          href="/"
          className="text-2xl font-henry font-bold text-center p-3 absolute top-0 w-full bg-white shadow-sm"
        >
          Thoughts Tracker
        </Link>
        <Component {...pageProps} />
        <Navbar />
      </MantineProvider>
    </UseWrapper>
  );
}
