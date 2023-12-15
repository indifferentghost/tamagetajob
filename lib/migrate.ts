import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { Option, program } from "commander";
import { FileMigrationProvider, Migrator } from "kysely";
import { is, literal, object, partial } from "valibot";
import { db } from "./db";

const flagKeys = ["latest", "up", "down"] as const;
const flagOptions = flagKeys.map((key) =>
	new Option(`-${key[0]}, --${key}`, `migrate ${key}`).conflicts(
		flagKeys.filter((k) => k !== key),
	),
);
flagOptions[0].preset(true);
for (const option of flagOptions) {
	program.addOption(option);
}

const options = program.parse(Bun.argv).opts();

const getMigrationType = (options: Record<string, boolean | string>) => {
	switch (true) {
		case is(partial(object({ up: literal(true) })), options):
			return "migrateUp";
		case is(partial(object({ down: literal(true) })), options):
			return "migrateDown";
		case is(partial(object({ latest: literal(true) })), options):
			return "migrateToLatest";
		default:
			throw new Error("migration not supported");
	}
};

const migrator = new Migrator({
	db,
	provider: new FileMigrationProvider({
		fs: { readdir: (path: string) => readdir(path, "utf-8") },
		path: { join },
		migrationFolder: join(import.meta.dir, "./migrations"),
	}),
});

const { error, results } = await migrator[getMigrationType(options)]();

for (const { migrationName, status, direction } of results ?? []) {
	console.log(`${migrationName}--${direction}: ${status}`);
	if (status === "Error" && error instanceof Error) {
		throw error;
	}
}

await db.destroy();
