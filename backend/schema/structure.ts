import mongoose from "mongoose";

// Schema Structure
const StructureSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
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

const Structure = mongoose.model("Structure", StructureSchema);

export { Structure };
