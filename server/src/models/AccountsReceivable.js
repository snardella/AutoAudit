const Model = require("./Model");
const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
  fields: ["customerName"],
  identifiers: ["accountsReceivableId"],
});

class AccountsReceivable extends unique(Model) {
  static get tableName() {
    return "accountsReceivables";
  }
  static get relationMappings() {
    const { Exam } = require("./index");
    return {
      exam: {
        relation: Model.BelongsToOneRelation,
        modelClass: Exam,
        join: {
          from: "accountsReceivables.examId",
          to: "exams.examId",
        },
      },
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["customerName"],
      customerName: { type: "string" },
    };
  }
}

module.exports = AccountsReceivable;
