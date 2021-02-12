const Model = require("./Model");
const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
  fields: ["examName"],
  identifiers: ["id"],
});

class Exam extends unique(Model) {
  static get tableName() {
    return "exams";
  }
  static get relationMappings() {
    const { Examinee, AccountsReceivable } = require("./index");
    return {
      examinee: {
        relation: Model.BelongsToOneRelation,
        modelClass: Examinee,
        join: {
          from: "exams.examineeId",
          to: "examinees.id",
        },
      },
      accountsReceivables: {
        relation: Model.HasManyRelation,
        modelClass: AccountsReceivable,
        join: {
          from: "exams.id",
          to: "accountsReceivables.examId",
        },
      },
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["examName", "examDate"],
      examName: { type: "string" },
      examDate: { type: ["date", "string"] },
    };
  }
}

module.exports = Exam;
