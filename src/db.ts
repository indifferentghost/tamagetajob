import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";
import { Database } from "./types";

export const db = new Kysely<Database>({
	dialect: new LibsqlDialect({
		url: "libsql://localhost:8080?tls=0", // I think it will be easier to set up local first
		authToken: "<token>", // optional
	}),
});
