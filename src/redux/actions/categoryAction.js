import { getCategories } from '../../services/api';

export const CATEGORY_RESULTS = 'CATEGORY_RESULTS';
export const IS_FETCHING_CAT = 'IS_FETCHING_CAT';
export const REQUISITION_FAILED = 'REQUISITION_FAILED';

const isFetching = () => ({
  type: IS_FETCHING_CAT,
});

const requisitionFailed = (error) => ({
  type: REQUISITION_FAILED,
  payload: { error },
});

export const categoryResults = (results) => ({
  type: CATEGORY_RESULTS,
  payload: [...results],
});

export const fetchCategoryResults = (pathname) => async (dispatch) => {
  dispatch(isFetching());
  try {
    const categoriesResult = await getCategories(pathname);
    dispatch(categoryResults(categoriesResult));
  } catch (error) {
    dispatch(requisitionFailed(error));
  }
};
