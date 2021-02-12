const Model = require("./Model");
const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
  fields: ["customerName"],
  identifiers: ["id"],
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
          to: "exams.id",
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
