import React, { useState,useEffect } from 'react'
import './SearchBar.css'
import { FaSearch } from "react-icons/fa";

var data;//require data

function SearchBar() {

  const [value,setValue] = useState('');
  const [data, setData] = useState([]);

  // Fetch data on component mount
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/todos')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  const onChange = (e)=>{
    setValue(e.target.value);
  } 

  const onSearch=(searchTerm)=>{
    setValue(searchTerm);
    //our api to fetch the search results
    console.log('search ',searchTerm);
  }
  

  return (
      <div className="Search-container">
        <div className="search-inner">
          <input id="searchInput" type="text" value={value} onChange={onChange} placeholder='Search'/>
          <button onClick={()=> onSearch(value)}><FaSearch size={20}/></button>
          
        </div>
        <div className="dropdown">
          {data.filter(item => {
            const searchTerm = value.toLowerCase();
            const fullName = item.title.toLowerCase();

            return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm;
          }).slice(0,10)
            .map((item) => 
            <div onClick={()=>(item.id)} className='dropdown-row'>
              {item.title}
            </div>)}
        </div>
      </div>
      
  )
}

export default SearchBar
 