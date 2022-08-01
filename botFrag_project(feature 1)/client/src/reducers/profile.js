import { FETCH_ALL, CREATE, UPDATE } from '../constants/actionTypes';

export default (profile = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...profile, action.payload];
    case UPDATE:
      return profile.map((post) => (post._id === action.payload._id ? action.payload : post));
    default:
      return profile;
  }
};