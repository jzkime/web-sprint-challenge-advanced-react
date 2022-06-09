import React, { useState } from 'react'
import axios from 'axios';
import * as yup from 'yup';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [ index, setIndex ] = useState(initialIndex);
  const [ email, setEmail ] = useState(initialEmail);
  const [ steps, setSteps ] = useState(initialSteps);
  const [ message, setMessage ] = useState(initialMessage);
  const [ x, setX ] = useState(2);
  const [ y, setY ] = useState(2);
  
  // const formSchema = yup.object().shape({
  //   email: yup.string().required(setMessage("Ouch: email must be a valid email"))
  // })

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
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
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    setMessage("")
    getNextIndex(evt.target.id);
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
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
          [0, 1, 2, 
           3, 4, 5, 
           6, 7, 8].map(idx => (
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
