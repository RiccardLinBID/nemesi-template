import mongoose from "mongoose";
import { Structure } from "./schema/structure";
import { NC } from "./schema/nc";

const MONGO_URL =
  "mongodb://root:example@localhost:27017/mydb?authSource=admin";

type NCData = {
  nome: string;
  description?: string;
  imageUrl?: string;
};

type StructureData = {
  nome: string;
  data_costruzione: Date;
  ncList: NCData[];
};

const randomName = (prefix: string) =>
  `${prefix} ${Math.floor(Math.random() * 1000)}`;
const randomDescription = () =>
  `Descrizione generata casualmente ${Math.floor(Math.random() * 1000)}`;
const randomImage = () =>
  `http://example.com/image${Math.floor(Math.random() * 100)}.jpg`;

export const seedDB = async () => {
  // Connessione a MongoDB
  await mongoose.connect(MONGO_URL);
  console.log("✅ MongoDB connected!");

  // Genera 10 strutture
  const structuresData: StructureData[] = Array.from({ length: 10 }, () => ({
    nome: randomName("Struttura"),
    data_costruzione: new Date(
      1990 + Math.floor(Math.random() * 30),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    ),
    ncList: [],
  }));

  // Genera 20 NC casuali
  const ncData: NCData[] = Array.from({ length: 20 }, () => ({
    nome: randomName("NC"),
    description: randomDescription(),
    imageUrl: randomImage(),
  }));

  // Distribuisci le NC tra le strutture
  ncData.forEach((nc) => {
    const structureIndex = Math.floor(Math.random() * structuresData.length);
    structuresData[structureIndex].ncList.push(nc);
  });

  // Pulisci il database
  await Structure.deleteMany();
  await NC.deleteMany();

  // Inserisci strutture e NC
  for (const s of structuresData) {
    const structure = await Structure.create({
      nome: s.nome,
      data_costruzione: s.data_costruzione,
    });

    if (s.ncList.length > 0) {
      const ncDocs = await Promise.all(
        s.ncList.map((nc: NCData) =>
          NC.create({ ...nc, structure: structure._id })
        )
      );
      structure.ncList = ncDocs.map((nc) => nc._id);
      await structure.save();
    }
  }

  console.log("✅ Database semipopolato con 10 strutture e circa 20 NC!");
  mongoose.connection.close();
};

// Esegui la funzione async
seedDB().catch((err) => {
  console.error("❌ Errore durante il seeding:", err);
  mongoose.connection.close();
});
