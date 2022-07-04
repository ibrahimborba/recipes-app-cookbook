import { getCategories, getNationalities } from '../../services/api';

export const CATEGORY_RESULTS = 'CATEGORY_RESULTS';
export const NATIONALITY_RESULTS = 'NATIONALITY_RESULTS';
export const IS_FETCHING_OPTIONS = 'IS_FETCHING_OPTIONS';
export const REQUISITION_FAILED = 'REQUISITION_FAILED';

const isFetching = () => ({
  type: IS_FETCHING_OPTIONS,
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

export const nationalityResults = (results) => ({
  type: NATIONALITY_RESULTS,
  payload: [...results],
});

export const fetchNationalityResults = () => async (dispatch) => {
  dispatch(isFetching());
  try {
    const nationalitiesResult = await getNationalities();
    dispatch(nationalityResults(nationalitiesResult));
  } catch (error) {
    dispatch(requisitionFailed(error));
  }
};
