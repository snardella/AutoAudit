/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("examinees", (table) => {
    table.bigIncrements("id");
    table.string("examineeName");
    table.string("industryType");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {};
