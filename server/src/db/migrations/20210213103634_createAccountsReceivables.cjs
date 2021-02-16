/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("accountsReceivables", (table) => {
    table.bigIncrements("accountsReceivableId").primary();
    table.string("customerName").notNullable();
    table.string("customerState").notNullable();
    table.float("customerNetEligible").notNullable();
    table.float("customerCurrent").notNullable();
    table.float("customer30Days").notNullable();
    table.float("customer60Days").notNullable();
    table.float("customer90Days").notNullable();
    table.float("customer120Days").notNullable();
    table.float("customerTotal").notNullable();
    table.float("customerGreaterThan90").notNullable();
    table.float("customerCAPercentage").notNullable();
    table.float("customerCAReserve").notNullable();
    table.float("customerACReserve").notNullable();
    table.float("customerIntercompanyReserve").notNullable();
    table.float("customerForeignReserve").notNullable();
    table.float("customerContraReserve").notNullable();
    table.float("customerGovernmentReserve").notNullable();
    table.float("customerNBARReserve").notNullable();
    table.float("customerConcentration").notNullable();
    table.bigInteger("examId").notNullable().index().unsigned().references("exams.examId");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("accountsReceivables");
};
