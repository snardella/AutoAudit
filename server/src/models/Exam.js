const Model = require("./Model");
const uniqueFactory = require("objection-unique");

/* const unique = uniqueFactory({
  fields: ["examId"],
  identifiers: ["examId"],
}); */

class Exam extends Model {
  static get tableName() {
    return "exams";
  }
  static get idColumn() {
    return ["examId"];
  }
  static get relationMappings() {
    const { Examinee, AccountsReceivable } = require("./index");
    return {
      examinee: {
        relation: Model.BelongsToOneRelation,
        modelClass: Examinee,
        join: {
          from: "exams.examineeId",
          to: "examinees.examineeId",
        },
      },
      accountsReceivables: {
        relation: Model.HasManyRelation,
        modelClass: AccountsReceivable,
        join: {
          from: "exams.examId",
          to: "accountsReceivables.examId",
        },
      },
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["examDate"],
      examName: { type: "string" },
      examDate: { type: ["date", "string"] },
    };
  }
}

module.exports = Exam;
