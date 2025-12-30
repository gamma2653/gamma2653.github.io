import { HeadContent } from "@tanstack/react-router";

type HeadProps = {
  title: string;
  favicon?: string;
}

const Head = ({ title, favicon }: HeadProps) => {
  return (

    <head>
      <link rel="icon" href={favicon || "/favicon.png"} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <HeadContent />
    </head>
  )
}

export default Head;