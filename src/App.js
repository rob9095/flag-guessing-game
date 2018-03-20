import React, { Component } from 'react';
import './App.css';
let answerArr = [];
let randCountries = [];
let answerIndex = null;
let answerFlag = null;
let guess = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      answerArr: [],
      answerCountry: null,
      guessed: false,
      guessCorrect: false
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.optionChange = this.optionChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    
  }
  
  handleNext(e) {
    window.location.reload();    
  }
  
  handleClick(e) {
    e.preventDefault();
    this.setState({
        guessed: true
    })
    if (guess === answerArr[0].name) {
      console.log('winner!')
    this.setState({
        guessCorrect: true
    })
    } else {
      console.log('loser!')
    }
  }
  
  optionChange(e) {
    guess = e.target.value;
  }  
  
  componentDidMount() {
    const url = 'https://restcountries.eu/rest/v2/all';
    fetch(url)
      .then(data => data.json())
      .then(promises => Promise.all(promises))
      .then(function(countries) {
      randCountries = countries.sort( function() { return 0.5 - Math.random() } ).slice(0,4);
      answerIndex = Math.floor(Math.random() * Math.floor(3));
      answerArr.push(randCountries[answerIndex]);
      this.setState({
        countries: randCountries,
        answerArr,
        answerCountry: answerArr[0].name
      })
      }.bind(this));
    
  }
      
  render() {
    let options = <div>Loading...</div>;
    let {countries, answerCountry, guessed, guessCorrect} = this.state;
    options = countries.map(c => (
      <div className='option' key={c.alpha2Code}>
        <label>
          <input
          value={c.name}
          type='radio'
          name='radio-option'
          id={c.alpha2Code}
          />
          {c.name}
        </label>
      </div>
    ))
    
    randCountries.forEach(function(c,i) {
      if (i === answerIndex) {
        answerFlag = <img className='flag' src={c.flag} alt='random-flag' />;
      }
    })
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Flag Guessing Game</h1>
        </header>
        <div className="App-intro">
          <div className='options' onChange={this.optionChange}>
            {options}
          </div>
          <div>
          {guessed ? <p><button onClick={this.handleNext} type='submit'>next</button></p> : <p><button onClick={this.handleClick} type='submit'>guess</button></p>}
          {guessed ? guessCorrect ? <p>You were right, the answer was {answerCountry}!</p> : <p>You were wrong, the answer was {answerCountry}!</p> : null }
          </div>
          {answerFlag}
        </div>
      </div>
    );
  }
}

export default App;
