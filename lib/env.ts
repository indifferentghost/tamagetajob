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

const DevEnvSchema = object({
	NODE_ENV: literal("development"),
	DATABASE_URL: string([
		toTrimmed(),
		toLowerCase(),
		minLength(1),
		url(),
		endsWith("?tls=0"),
	]),
});

const ProdEnvSchema = object({
	NODE_ENV: literal("production"),
	DATABASE_URL: string([
		toTrimmed(),
		toLowerCase(),
		minLength(1),
		url(),
		excludes("?tls=0"),
	]),
});

const EnvSchema = union([DevEnvSchema, ProdEnvSchema]);

export const env = parse(EnvSchema, Bun.env);
