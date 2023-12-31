import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";
import { DB as Database } from "kysely-codegen";
import { env } from "./env";

export const db = new Kysely<Database>({
	dialect: new LibsqlDialect({
		url: env.DATABASE_URL,
	}),
});
