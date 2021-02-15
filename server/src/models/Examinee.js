const Model = require("./Model");
const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
  fields: ["examineeName"],
  identifiers: ["examineeId"],
});

class Examinee extends unique(Model) {
  static get tableName() {
    return "examinees";
  }
  static get idColumn() {
    return "examineeId";
  }
  static get relationMappings() {
    const { Exam } = require("./index.js");
    return {
      exams: {
        relation: Model.HasManyRelation,
        modelClass: Exam,
        join: {
          from: "examinees.examineeId",
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

module.exports = Examinee;
