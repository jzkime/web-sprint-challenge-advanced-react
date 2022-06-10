import React, { useState } from 'react'
import axios from 'axios';
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 


export default function AppFunctional(props) {
  const [ index, setIndex ] = useState(initialIndex);
  const [ email, setEmail ] = useState(initialEmail);
  const [ steps, setSteps ] = useState(initialSteps);
  const [ message, setMessage ] = useState(initialMessage);
  const [ x, setX ] = useState(2);
  const [ y, setY ] = useState(2);

  function reset() {
    setIndex(initialIndex);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setX(2);
    setY(2);
  }

  function getNextIndex(direction) {
    if(direction === "reset") {
      reset();
    }
    if(direction === "left") {
      if(index % 3 !== 0){
        setIndex(index - 1);
        setSteps(steps +1)
        setX(x-1)
      } else {
        setMessage("You can't go left")
    }
  }
    if(direction === "right") {
      if((index + 1) % 3 !== 0){
        setIndex(index + 1);
        setSteps(steps +1)
        setX(x+1);
      } else {
        setMessage("You can't go right")
      }
    }
    if(direction === "up") {
      if( !(index < 3) ){
        setIndex(index - 3);
        setSteps(steps +1)
        setY(y-1)
      } else {
        setMessage("You can't go up")
      }
    }
    if(direction === "down") {
      if(index <= 5){
        setIndex(index + 3);
        setSteps(steps +1)
        setY(y+1)
      } else {
        setMessage("You can't go down")
      }
    }
  }


  function move(evt) {
    setMessage("")
    getNextIndex(evt.target.id);
  }

  function onChange(evt) {
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    evt.preventDefault();
    axios.post("http://localhost:9000/api/result", { "x": x, "y": y, "steps": steps, "email": email })
    .then(res => setMessage(res.data.message))
    .catch(err => setMessage(err.response.data.message))

    setEmail(initialEmail);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">{steps !== 1 ? `You moved ${steps} times` : `You moved ${steps} time`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={move}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
