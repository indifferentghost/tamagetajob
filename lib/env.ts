import { object, parse, picklist } from "valibot";
import Bun from "bun";

const ENV_LIST = ["development", "production"] as const;

const EnvironmentSchema = object({
  NODE_ENV: picklist(ENV_LIST, `ENV isn't in list ${ENV_LIST.join(" | ")}`),
});

export const env = parse(EnvironmentSchema, Bun.env);

declare module "bun" {
  interface Env extends Dict<never> {}
}
