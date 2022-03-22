import React from 'react';

const RepoEntry = ({repo, rank}) => {

  return (
    <div className="repo-entry">
      <div className="repo-rank">{rank}</div>
      <div className="repo-score">{repo.score}</div>
      <div>
        <a href={repo.url}>{repo.name}</a>
      </div>
      <div className="repo-owner-name">{repo.ownerName}</div>
    </div>
  )
}

export default RepoEntry;