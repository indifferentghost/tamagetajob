import { Hono } from "hono";
import { jsx } from "hono/jsx";
import "../lib/env";
import { Layout } from "./components/layout";

const app = new Hono();

app.get("/", (c) =>
	c.html(
		<Layout title="Home">
			<h1 class="h1">hello</h1>
		</Layout>,
	),
);

export default app;
