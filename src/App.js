import './App.css';
import { useState, useContext, useEffect } from 'react';
import { AgeContext } from './AgeContext.js';


const url = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:3000";


function App() {
  const [toysList, setToysList] = useState([]);
  

  useEffect(() => {
    async function getToysList() {
      const response = await fetch(`${url}/items`);
      const data = await response.json(response);
      console.log(data);
      setToysList(data.payload);
    }
    getToysList();
  }, []);
  
  function List() {
    const toyItems = toysList.map(item =>
      <li key={item.id}>
        <ToyItem props={item} />
      </li>
    );
    return <ul>{toyItems}</ul>;
  }
  

  function ToyItem({ props }) {
    return (
      <>
      <h3>{props.title}</h3>
      <h4>{props.age}</h4>
      <ToyImage props={props} />
      </>
    );
  }


  function ToyImage({ props }) {
    const imageSize = useContext(AgeContext);
    console.log(props)
    return (
      <img
        src={props.imageurl}
        alt={props.title}
        width={imageSize}
        height={imageSize}
      />
    );
  }



  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;

  return (
    // <AgeContext.Provider
    //   value={imageSize}
    // >
      <>

        <label>
          <input
            type="checkbox"
            checked={isLarge}
            onChange={e => {
              setIsLarge(e.target.checked);
            }}
          />
          Use large images
        </label>
        <hr />
        <List />
      </>
    // </AgeContext.Provider>
  )
}


export default App;