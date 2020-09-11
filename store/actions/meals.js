export const TOGGLE_FAVORITE = 'TOOGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, payload: id };
};

export const setFilters = (filterSettings) => {
  return { type: SET_FILTERS, payload: filterSettings };
};