import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon updated to use the main logo */}
        <link
          rel="icon"
          href="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          type="image/svg+xml"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
