import React, {useEffect, useState} from 'react';
import Choice from './components/Choice';
import './app.css'
import axios from 'axios';
import LeaderBoard from './components/LeaderBoard/'

function App() {
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [names, setNames] = useState({
    left: "",
    right: "",
  });

  const fetchData = () => {
    axios.post("/api/getRandom")
      .then((res) => {
        setLeft(res.data[0].name);
        setRight(res.data[1].name);
        setNames({
          left: res.data[0].name.split(" ").join("_").concat("_" + res.data[0].id + ".jpg"),
          right: res.data[1].name.split(" ").join("_").concat("_" + res.data[1].id + ".jpg")})
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchData()
  }, [ ]);

  const resetChoices = () => {
    setLeft(null);
    setRight(null);
		fetchData()
  }
  
  return (
    <div className="App">
      <div className="header">
        <div className="center">
          <h1>Choose</h1>
          <LeaderBoard />
        </div>
				{ right
					? <Choice left={left} right={right} names={names} onSubmit={() => resetChoices()} />
					: <p className="App-intro">Loading</p>
				}
      </div>
    </div>
  );
}

export default App;
