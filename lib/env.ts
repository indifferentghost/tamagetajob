import Bun from "bun";
import {
	url,
	minLength,
	object,
	parse,
	picklist,
	string,
	toTrimmed,
} from "valibot";

const ENV_LIST = ["development", "production"] as const;

const EnvironmentSchema = object({
	NODE_ENV: picklist(ENV_LIST, `ENV isn't in list ${ENV_LIST.join(" | ")}`),
	DATABASE_URL: string([toTrimmed(), minLength(1), url()]),
});

export const env = parse(EnvironmentSchema, Bun.env);
