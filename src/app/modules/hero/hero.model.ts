import { model, Schema } from "mongoose";
import { IHeroSection, Stat } from "./hero.interface";


export const statSchema = new Schema<Stat>({
    count: { type: Number, required: true },
    label: { type: String, required: true },
  }, { _id: false });
  


 const heroSectionSchema = new Schema<IHeroSection>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  stats: [{ type: statSchema, required: true }],
},{
    timestamps: true,
    versionKey: false
});

export const HeroSectionModel = model<IHeroSection>('HeroSection', heroSectionSchema);



