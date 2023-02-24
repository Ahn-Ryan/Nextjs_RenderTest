export type TBrands = Array<TBrand>;

export type TBrand = {
  id: number;
  name: string;
  auctions_count: number;
};

export type TGroups = Array<TGroup>;

export type TGroup = {
  id: number;
  name: string;
  auctions_count: number;
  brand: number;
};

export type TModels = Array<TModel>;

export type TModel = {
  id: number;
  name: string;
  auctions_count: number;
  model_group: number;
};

export type TCars = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<TCar>;
};

export type TCar = {
  id: number;
  detail: {
    name: string;
    model: number;
    location: string;
    car_number: string;
    year: number;
    fuel: string;
    color: string;
    mileage: number;
    transmission: string;
    initial_registration_date: string;
    main_image: TImage;
    images?: TImageSet;
  };
  auction: {
    started_at: string;
    end_at: string;
    expire_at: string;
    status: string;
    highest_bid: { id: number; price: number } | null;
    bids_count: number;
  };
};
export type TImageSet = Array<TImage>;

export type TImage = {
  url: string;
  is_main: boolean;
};
