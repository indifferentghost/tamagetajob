import Bun from "bun";
import { object, parse, picklist } from "valibot";

const ENV_LIST = ["development", "production"] as const;

const EnvironmentSchema = object({
	NODE_ENV: picklist(ENV_LIST, `ENV isn't in list ${ENV_LIST.join(" | ")}`),
});

export const env = parse(EnvironmentSchema, Bun.env);
