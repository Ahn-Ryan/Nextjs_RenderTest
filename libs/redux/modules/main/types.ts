import { TBrands, TCars, TGroups, TModels } from '@libs/models/main';

export type TBrandsRes = TBrands;

export type TModelGroupsReq = {
  brand_id: string;
};

export type TModelGroupsRes = TGroups;

export type TModelsReq = {
  model_group_id: string;
};

export type TModelsRes = TModels;

export type TCarsReq = {
  order: 'recent' | 'bids_count';
  type: 'brand' | 'model_group' | 'model' | 'all';
  id: number;
  page: number;
};

export type TCardRes = TCars;
