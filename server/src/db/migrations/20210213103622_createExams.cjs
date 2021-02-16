/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("exams", (table) => {
    table.bigIncrements("examId").primary();
    table.date("examDate").notNullable();
    table.float("examNetEligible").notNullable();
    table.float("examCurrent").notNullable();
    table.float("exam30Days").notNullable();
    table.float("exam60Days").notNullable();
    table.float("exam90Days").notNullable();
    table.float("exam120Days").notNullable();
    table.float("examTotal").notNullable();
    table.float("examGreaterThan90").notNullable();
    table.float("examCAReserve").notNullable();
    table.float("examACReserve").notNullable();
    table.float("examIntercompanyReserve").notNullable();
    table.float("examForeignReserve").notNullable();
    table.float("examContraReserve").notNullable();
    table.float("examGovernmentReserve").notNullable();
    table.float("examNBARReserve").notNullable();
    table
      .bigInteger("examineeId")
      .notNullable()
      .index()
      .unsigned()
      .references("examinees.examineeId");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("exams");
};
