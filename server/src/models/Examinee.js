const Model = require("./Model");
const uniqueFactor = require("objection-unique");

const unique = uniqueFactory({
  fields: ["examineeName"],
  identifiers: ["id"],
});

class Examinee extends unique(Model) {
  static get tableName() {
    return "examinees";
  }
  static get relationMappings() {
    const { Exam } = require("./index.js");
    return {
      exams: {
        relation: Model.HasManyRelation,
        modelClass: Exam,
        join: {
          from: "examinees.id",
          to: "exams.examineesId",
        },
      },
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["examineeName"],
      examineeName: { type: "string" },
    };
  }
}
