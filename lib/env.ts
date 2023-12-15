import Bun from "bun";
import {
	url,
	endsWith,
	excludes,
	literal,
	minLength,
	object,
	parse,
	string,
	toLowerCase,
	toTrimmed,
	union,
} from "valibot";

const UrlSchema = [
	toTrimmed(),
	minLength<string, 1>(1, "URL cannot be an empty string"),
	url("URL must match a url format"), // The URL shouldn't error in the URL constructor `new URL`
	toLowerCase(),
] as const;

const DevEnvSchema = object({
	NODE_ENV: literal("development"),
	DATABASE_URL: string("DATABASE_URL must be a string", [
		...UrlSchema,
		endsWith(
			"?tls=0",
			"development DATABASE_URL doesn't end in ?tls=0 and probably should.",
		),
	]),
});

const ProdEnvSchema = object({
	NODE_ENV: literal("production"),
	DATABASE_URL: string([
		...UrlSchema,
		excludes("?tls=0", "production DATABASE_URL running without https."),
	]),
});

const EnvSchema = union([DevEnvSchema, ProdEnvSchema]);

export const env = parse(EnvSchema, Bun.env);
