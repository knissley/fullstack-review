import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <p>There are {props.repos.length} repos.</p>

    <div className="table-header">
      <span>Rk</span>
      <span>Score</span>
      <span>Repo Name</span>
      <span>Repo Owner</span>
    </div>
    <div>
      {props.repos.map( (repo, i) => {
        return <RepoEntry repo={repo} key={i} rank={i + 1} />
      })}
    </div>
  </div>
)

export default RepoList;