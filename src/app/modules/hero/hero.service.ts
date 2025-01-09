import { convertArrayIdToId, convertObjectIdToId } from '../../utils';
import { IHeroSection } from './hero.interface';
import { HeroSectionModel } from './hero.model';

const addHeroContent = async (payload: IHeroSection) => {
  const hero = await HeroSectionModel.create(payload);

  return hero;
};

const updateHeroContent = async (id: string, payload: IHeroSection) => {
  const hero = await HeroSectionModel.findByIdAndUpdate(id, payload, {
    new: true,
  }).lean();

  return convertObjectIdToId(hero);
};

const fetchHeroContent = async () => {
  const hero = await HeroSectionModel.find({}).lean();
  return convertArrayIdToId(hero)[0];
};

export const HeroService = {
  addHeroContent,
  updateHeroContent,
  fetchHeroContent
};
