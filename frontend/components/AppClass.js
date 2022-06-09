import React from 'react'
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  x: 2,
  y: 2
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = {...initialState};
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState)
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

      if(direction === "reset"){
        this.reset();
      }
      if(direction === "left"){
        if(this.state.index % 3){
          this.setState({
            ...this.state,
            index: this.state.index - 1,
            message: initialMessage,
            steps: this.state.steps + 1,
            x: this.state.x - 1
          })
        } else {
          this.setState({
            ...this.state,
            message: "You can't go left"
          })
        }
      }
      if(direction === "right"){
        if((this.state.index+1) % 3){
          this.setState({
          ...this.state,
          index: this.state.index + 1,
          message: initialMessage,
          steps: this.state.steps + 1,
          x: this.state.x + 1
         })
        } else {
          this.setState({
            ...this.state,
            message: "You can't go right",
          })
        }
        
      }
      if(direction === "up"){
        if(this.state.index > 2){
            this.setState({
            ...this.state,
            index: this.state.index - 3,
            message: initialMessage,
            steps: this.state.steps + 1,
            y: this.state.y - 1
           })
        } else {
          this.setState({
            ...this.state,
            message: "You can't go up"
          })
        }
      }
      if(direction === "down"){
        if(this.state.index < 6) {
          this.setState({
            ...this.state,
            index: this.state.index + 3,
            message: initialMessage,
            steps: this.state.steps + 1,
            y: this.state.y + 1
          })
        } else {
          this.setState({
            ...this.state,
            message: "You can't go down"
          })
        }
      }
      
    }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.getNextIndex(evt.target.id)

  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios.post(`http://localhost:9000/api/result`, { "x": this.state.x, "y": this.state.y, "steps": this.state.steps, "email": this.state.email })
    .then(res => this.setState({...this.state, message: res.data.message, email: initialEmail}))
    .catch(err => this.setState({...this.state, message: err.response.data.message}))
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} time{this.state.steps !== 1 && "s"}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 
             3, 4, 5, 
             6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.move}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
