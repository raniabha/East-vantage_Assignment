import { useEffect,useState } from 'react';
import "../App.css"

function ApiFetch() {

  let [data, setData] = useState([])
  let [refreshComponent, setRefreshComponent] = useState(false)

  useEffect(()=>{
    fetchApi()
    getLocalStorageData()
    return () => {
      setRefreshComponent(false)
    };
  },[refreshComponent])


  let fetchApi = async() => {
    try {
      const response = await fetch('https://randomuser.me/api');
      const jsonData = await response.json();
      const jsonString = JSON.stringify(jsonData?.results);
      localStorage.setItem("storeData",jsonString)
    }catch (error) {
      console.error('Fetch error:', error);
    }
  }

  let getLocalStorageData = () => {
    const retrievedData = localStorage.getItem("storeData")
    const storeRetrievedData = JSON.parse(retrievedData);
    setData(storeRetrievedData)
   
  }

  const ShowDatafetch = () => {
    return (
      <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item?.name?.first+" "+item?.name?.last}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
      </table>
    );
  };

  return (
    <div className='cont'>
      <h3>Display Full Name and Email Address</h3>
      <ShowDatafetch/>
      <div className='vert'>
      <button className='App' onClick={() =>setRefreshComponent(true)}>Refresh</button>
      </div>
    </div>
  );
}
export default ApiFetch;