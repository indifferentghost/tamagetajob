import { raw } from 'hono/html';
import { jsx } from 'hono/jsx';

export const Layout = <T extends JSX.Element>({ title, children }: { title: string, children?: T }) =>
  raw('<!DOCTYPE html>' +
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>{title}</title>
        <meta property="og:type" content="article" />
        <script src="https://unpkg.com/htmx.org@1.9.9" />
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css" />
      </head>
      <body>
        {children}
      </body>
    </html>)