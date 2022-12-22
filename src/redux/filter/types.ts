export enum SortPropertyEnum {
  RATING_ASC = '-rating',
  RATING_DESC = 'rating',
  TITLE_DESC = '-name',
  TITLE_ASC = 'name',
  PRICE_ASC = '-price',
  PRICE_DESC = 'price',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue?: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}
