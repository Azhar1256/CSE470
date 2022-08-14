import { FETCH_ALL, CREATE, UPDATE} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getProfile = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProfile = (post) => async (dispatch) => {
  try {
    const { data } = await api.createProfile(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};