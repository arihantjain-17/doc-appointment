import React, { useState,useEffect } from 'react'
var data;//require data

function SearchBar() {

  const [value,setValue] = useState('');
  const [data, setData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const onChange = (e)=>{
    setValue(e.target.value);
  }

  const onSearch=(searchTerm)=>{
    setValue(searchTerm);
    //our api to fetch the search results
    console.log('search ',searchTerm);
  }
  

  return (
    <div className='container'>
      <h1>Search</h1>
      <div className="Search-container">
        Searchbar
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={()=> onSearch(value)}>Search</button>
        </div>
        {/* <div className="dropdown">
        {data.filter(item => {
          const searchTerm = value.toLowerCase();
          const fullName = item.full_name.toLowerCase();

          return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm;
        }).slice(0,10)
          .map((item) => <div onClick={()=>(item.full_name)} className='dropdown-row'>
          {item.full_name} key={item.id}
        </div>)}
        </div>
      </div> */}
      <div className="dropdown">
  {data.filter((item) => {
      const searchTerm = value.toLowerCase();
      const fullName = item.title.toLowerCase(); // Adjusted to use the correct property 'title'

      return (
        searchTerm &&
        fullName.startsWith(searchTerm) &&
        fullName !== searchTerm
      );
    })
    .slice(0, 10)
    .map((item) => (
      <div
        key={item.id} // Place the key prop directly on the outermost element
        onClick={() => onSearch(item.title)} // Corrected the onClick function to call onSearch
        className="dropdown-row"
      >
        {item.title}
      </div>
    ))}
</div>
</div>
      
    </div>
  )
}

export default SearchBar
