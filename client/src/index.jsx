import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    axios('/repos').then( (res) => {
      this.setState({
        repos: res.data
      })
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.repos !== prevState.repos) {
  //     this.setState({
  //       repos: this.state.repos
  //     })
  //   }
  // }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {username: term}).then( () => {
      axios.get('/repos').then( (res) => {
        this.setState({
          repos: res.data
        })
      })
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));