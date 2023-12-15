import { type CreateTableBuilder, Kysely, sql } from "kysely";
import { Database } from "../db";

const addTimestamps = <
	A extends string,
	B extends string,
	T extends CreateTableBuilder<A, B>,
>(
	builder: T,
) =>
	builder
		.addColumn("created_at", "timestamp", (col) =>
			col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
		)
		.addColumn("updated_at", "timestamp", (col) =>
			col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
		);

export async function up(db: Kysely<Database>): Promise<void> {
	await db.schema
		.createTable("accounts")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("name", "varchar", (col) => col.notNull())
		.addColumn("email", "varchar", (col) => col.notNull())
		.addColumn("avatar", "varchar")
		.$call(addTimestamps)
		.execute();

	await db.schema
		.createIndex("account_name")
		.on("accounts")
		.column("name")
		.execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
	await db.schema.dropTable("accounts").execute();
}
