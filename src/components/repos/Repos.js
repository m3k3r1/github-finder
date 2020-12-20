import React, {useContext}  from 'react'
import RepoItem from './RepoItem'
import GitHubContext from '../../context/github/githubContext';

const Repos = () => {
    const githubContext =  useContext(GitHubContext)

    return githubContext.repos.map(repo => 
        <RepoItem key={repo.id} repo={repo} />
    )
}

export default Repos
