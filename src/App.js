import './App.css';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

function App() {
  //init the loading  state to true
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
        await axios
            .get('https://randomuser.me/api/?results=50')
            .then((response) => {
                setData(response.data);
                setLoadingData(false);
                console.log(response.data);
            });
    }
    if (loadingData) {
        getData();
    }
    //and...this time...only run it once or you get rate banned again...
  }, []);


  return (
    <div className='table-container'>
            {loadingData ? (
                <div>Loading...</div>
            ) : (
                <div>This is a placeholder</div>
            )}
        </div>
    )
  }
export default App;

