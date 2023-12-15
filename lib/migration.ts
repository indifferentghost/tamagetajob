import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { FileMigrationProvider, Migrator } from "kysely";
import { db } from "./db";

const migrator = new Migrator({
	db,
	provider: new FileMigrationProvider({
		fs: { readdir: (path: string) => readdir(path, "utf-8") },
		path: { join },
		migrationFolder: "./migrations",
	}),
});

await migrator.migrateToLatest();
