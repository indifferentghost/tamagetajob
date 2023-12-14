import { Hono } from "hono";
import { jsx } from 'hono/jsx';
import { Layout } from "./components/layout";
import '../lib/env';

const app = new Hono();

app.get("/", (c) =>
  c.html(
    <Layout title="Home">
      <h1 class="h1">hello</h1>
    </Layout>
  )
);

export default app;
