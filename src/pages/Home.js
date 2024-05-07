import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import Table from 'react-bootstrap/Table';

const Home = () => {
  const [fuels, setFuels] = useState([]);
  const [news, setNews] = useState([]);
  const [loadingFuels, setLoadingFuels] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`http://localhost/api/fuels`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setFuels(response.data.data);
      setLoadingFuels(false);
    })
    .catch((err) => {
      console.error("Error fetching fuels:", err);
      setLoadingFuels(false);
    });
    
    axios.get(`http://localhost/api/news`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setNews(response.data.data);
      setLoadingNews(false);
    })
    .catch((err) => {
      console.error("Error fetching news:", err);
      setLoadingNews(false);
    });
  }, []);

  const tableStructure = () => {
    if (loadingFuels) return <p>Loading fuel info...</p>;
    if (!fuels.length) return <p>No fuel info available.</p>;

    const chunkedFuels = [];
    for (let i = 0; i < fuels.length; i += 5) {
      chunkedFuels.push(fuels.slice(i, i + 5));
    }

    return (
      <Table responsive className="custom-table bg-light">
        <thead>
          <tr>
            {chunkedFuels[0].map((fuel, index) => (
              <th key={index} style={{ borderTop: '2px solid black', borderLeft: '1px solid black' }} className="vertical-line">Fuel Type: {fuel.fuel_type}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chunkedFuels.map((chunk, rowIndex) => (
            <tr key={rowIndex}>
              {chunk.map((fuel, cellIndex) => (
                <td key={cellIndex} style={{ borderLeft: '1px solid black', borderBottom: '2px solid black' }}>Price: {fuel.price} | Rating: {fuel.rating}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div className='bg-light'>
      <h1 className="text-center text-dark pt-5">Welcome to Fuel Finder</h1>

      <div className="container mt-5 pt-5 pb-4">
        <h2 className="text-start text-dark">Fuel Information</h2>
      </div>
      {tableStructure()}

      <div className="container mt-5 pt-5 pb-4">
        <h2 className="text-start text-dark pb-4">Latest News</h2>
        <div className="row">
          {news.slice(0, 3).map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <NewsCard title={item.title} description={item.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
