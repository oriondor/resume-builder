import type { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createExtension("uuid-ossp", { ifNotExists: true });

  pgm.createTable("tags", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    identifier: { type: "text", notNull: true }, // e.g., 'skill', 'language', 'tool'
    name: { type: "text", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  // Avoid duplicates per identifier
  pgm.addConstraint("tags", "tags_identifier_name_unique", {
    unique: ["identifier", "name"],
  });

  // Common filter path
  pgm.createIndex("tags", "identifier");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  // Drop compatibility view (if created)
  pgm.dropIndex("tags", "identifier", { ifExists: true });
  pgm.dropConstraint("tags", "tags_identifier_name_unique", { ifExists: true });
  pgm.dropTable("tags");
}
