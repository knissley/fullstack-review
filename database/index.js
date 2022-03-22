const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

let repoSchema = mongoose.Schema({
  _id: Number,
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

let save = (data, callback) => {
  //   Repo.findOne({repoId: repo.repoId}, (err, repo) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (repo) {
  //       console.log('this repo has already been saved');
  //     } else {
  //       newRepo.save();
  //     }
  //   })
  // })


  Repo.insertMany(data, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}


let retrieve = (callback) => {
  Repo.find({})
  .sort({score: -1})
  .limit(25)
  .then((repos) => {
    callback(repos);
  });
}

module.exports.save = save;
module.exports.retrieve = retrieve;