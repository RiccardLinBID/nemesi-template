"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Structure = void 0;
var mongoose_1 = require("mongoose");
// Schema Structure
var StructureSchema = new mongoose_1.default.Schema({
    nome: {
        type: String,
        required: true,
    },
    data_costruzione: {
        type: Date,
        required: true,
    },
    ncList: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "NC",
        },
    ],
});
// Virtual per hasNc
StructureSchema.virtual("hasNc").get(function () {
    return this.ncList && this.ncList.length > 0;
});
StructureSchema.set("toJSON", { virtuals: true });
StructureSchema.set("toObject", { virtuals: true });
var Structure = mongoose_1.default.model("Structure", StructureSchema);
exports.Structure = Structure;
