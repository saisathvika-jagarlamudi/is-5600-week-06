import React, { useState, useEffect } from "react";
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({data}) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [products, setProducts] = useState(data.slice(0, limit));

  const handlePrevious = () => {
    setOffset(offset - 10);
  }

  const handleNext = () => {
    setOffset(offset + 10);
  }

  const filterTags = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredData(data);
      setOffset(0);
    } else {
      const filtered = data.filter(product => 
        product.tags && product.tags.some(tag => 
          tag.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
      setOffset(0);
    }
  }

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, limit, filteredData]);

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      
      <div className="flex items-center justify-center pa4">   
        <button 
          onClick={handlePrevious} 
    disabled={offset === 0}
    className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4"
    style={{ opacity: offset === 0 ? 0.5 : 1, cursor: offset === 0 ? 'not-allowed' : 'pointer' }}
  >
    <span className="pl1">Previous</span>
  </button>
  
  <button 
    onClick={handleNext} 
    disabled={offset + limit >= filteredData.length}
    className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box"
    style={{ opacity: offset + limit >= filteredData.length ? 0.5 : 1, cursor: offset + limit >= filteredData.length ? 'not-allowed' : 'pointer' }}
  >
    <span className="pl1">Next</span>
  </button>
</div>
    </div>
  )
}

export default CardList;