import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="pt-br"
      className="h-full bg-gray-900 antialiased js-focus-visible"
    >
      <Head />
      <body className="flex h-full flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
