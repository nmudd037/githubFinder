import axios from 'axios';
import { useContext, useReducer } from 'react';

import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';

// Create a custom hook to use the github context
export const useGithub = () => {
  const { state, dispatch } = useContext(GithubContext);
  return [state, dispatch];
};

let githubID, githubSecret;

if (process.env.NODE_ENV === 'development') {
  githubID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}

if (process.env.NODE_ENV === 'production') {
  githubID = process.env.GITHUB_CLIENT_ID;
  githubSecret = process.env.GITHUB_CLIENT_SECRET;
}

// Search Users
export const searchUsers = async (dispatch, text) => {
  setLoading(dispatch);
  const res = await axios.get(
    `https://api.github.com/search/users?q=${text}&client_id=${githubID}$client_secret=${githubSecret}`
  );

  dispatch({
    type: SEARCH_USERS,
    payload: res.data.items,
  });
};

// Get User
export const getUser = async (dispatch, username) => {
  setLoading(dispatch);
  const res = await axios.get(
    `https://api.github.com/users/${username}?client_id=${githubID}$client_secret=${githubSecret}`
  );

  dispatch({ type: GET_USER, payload: res.data });
};

// Get Repos
export const getUserRepos = async (dispatch, username) => {
  setLoading(dispatch);
  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubID}$client_secret=${githubSecret}`
  );

  dispatch({ type: GET_REPOS, payload: res.data });
};

// Clear users
export const clearUsers = (dispatch) => dispatch({ type: CLEAR_USERS });

// Set Loading
export const setLoading = (dispatch) => dispatch({ type: SET_LOADING });

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        state: state,
        dispatch,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
