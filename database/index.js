const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let repoSchema = mongoose.Schema({
  repoId: {type: Number, unique: true, required: true, dropDups: true},
  name: String,
  url: String,
  description: String,
  forks: Number,
  stars: Number,
  watchers: Number,
  ownerName: String,
  score: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (details) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  Repo.findOne({repoId: details[0]}, (err, repo) => {
    if (err) {
      console.log(err);
    }
    if (repo) {
      console.log('this repo has already been saved');
    } else {
      const newRepo = new Repo({
        repoId: details[0],
        name: details[1],
        url: details[2],
        description: details[3],
        forks: details[4],
        stars: details[5],
        watchers: details[6],
        ownerName: details[7],
        score: details[8],
      });
      newRepo.save();
    }
  })
}


//ask how to use error first here, err wasn't a given value in the cb here
let retrieve = (callback) => {
  Repo.find({}).sort({score: -1}).limit(25).then((results) => {
    callback(results);
  })
}

module.exports.save = save;
module.exports.retrieve = retrieve;