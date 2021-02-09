import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Table from './Table';
import './App.css';

function App() {
  //init the loading  state to true
  const [loadingData, setLoadingData] = useState(true);

  const columns = useMemo(
    () => [
        {
            Header: 'First Name',
            accessor: 'name.first'
        },
        {
            Header: 'Last Name',
            accessor: 'name.last'
        },
        {
            Header: 'Gender',
            accessor: 'gender'
        },
        {
            Header: 'Age',
            accessor: 'dob.age',
            sortType: 'basic'
        },
        {
            Header: 'Email Address',
            accessor: 'email'
        },
        {
            Header: 'Phone Number',
            accessor: 'phone',
            sortType: 'basic'
        },
        {
            Header: 'Country',
            accessor: 'location.country'
        }
    ],
    []
);

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
              //replacing the place holder...
              <Table columns={columns} data={data.results} />
            )}
        </div>
    )
  }
export default App;

