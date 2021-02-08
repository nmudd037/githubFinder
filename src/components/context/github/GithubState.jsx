import axios from 'axios';
import React, { useReducer } from 'react';

import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

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
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubID}$client_secret=${githubSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubID}$client_secret=${githubSecret}`
    );

    dispatch({ type: GET_USER, payload: res.data });
  };

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubID}$client_secret=${githubSecret}`
    );

    dispatch({ type: GET_REPOS, payload: res.data });
  };

  // Clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
