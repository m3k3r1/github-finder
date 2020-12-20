import React ,{useReducer} from 'react';
import GitHubContext from './githubContext';
import GitHubReducer from './githubReducer';
import axios from 'axios';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types'

const GitHubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    const searchUsers = async text => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    const getUser = async username => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } 

    const getUserRepos = async username => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
      } 
     
    const clearUsers = () => dispatch({type: CLEAR_USERS})
    const setLoading = () => dispatch({type: SET_LOADING});

    return <GitHubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            getUser,
            getUserRepos,
            clearUsers
        }}
    >
        {props.children}
    </GitHubContext.Provider>
}

export default GitHubState;
