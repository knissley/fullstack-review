const axios = require('axios');
const config = require('../config.js');
const {save} = require('../database/index.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios(options).then((res) => {
    const repoList = res.data;
    repoList.forEach( (repo) => {
      const details = [];
      const score = (repo.stargazers_count + (.5 * (repo.watchers_count + repo.forks_count)));
      details.push(repo.id, repo.name, repo.html_url, repo.description, repo.forks_count, repo.stargazers_count, repo.watchers_count, repo.owner.login, score);
      save(details);
    })
    callback(null);
  }).catch((err) => {
    callback(err);
  })

}

module.exports.getReposByUsername = getReposByUsername;