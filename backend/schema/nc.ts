import mongoose from "mongoose";

const NcSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  date_creation: {
    type: Date,
    default: Date.now,
  },
  structure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Structure",
    required: true,
  },
});
const NC = mongoose.model("NC", NcSchema);

export { NC };
