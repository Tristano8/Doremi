import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar.js';
//import Exercise from './components/Exercise.js';
import Footer from './components/Footer.js';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lessons: []
    }
  }

  componentDidMount() {
    this.loadLessonsFromServer();
  }

  loadLessonsFromServer() {
    fetch('/api/lessons')
    .then(data => data.json())
    .then((res) => {
      if (!res.success) this.setState({ error: res.error});
      else this.setState({ data: res.data});
    });
  }
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <div>
        <NavBar className="App-nav" buttons={['Home','About','Sign Up']}/>
        
        <Footer className="App-footer" />
        </div>
        </BrowserRouter>
        </div>

    )
  }
}

export default App;
