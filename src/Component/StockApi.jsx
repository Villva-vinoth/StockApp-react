import React, { useEffect, useState } from "react";
import "./Stock.css";
import axios from "axios";

const Stockapi = () => {

  
  //single api multi symbols

  const symbols = ["cipla", "hdfcbank","sbin","techm"];
  // const symbols = ["cipla",];
  const updateInterval = 10000; 

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "nse-market.p.rapidapi.com",
      "X-RapidAPI-Key": "",
    },
  };

  const [symbolData, setSymbolData] = useState([]);

  const fetchData = async (symbol) => {
    const url = `https://nse-market.p.rapidapi.com/stocks?symbol=${symbol}`;

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      setSymbolData((prevData) => [
        ...prevData,
        { symbol: symbol, data: result },
      ]);
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
    }
  };

  const updateData = () => {
  
    setSymbolData([]);

    symbols.forEach((symbol) => {
      fetchData(symbol);
    });
  };

  useEffect(() => {
   
    updateData();

    
    // const intervalId = setInterval(updateData, updateInterval);
 
    // return () => clearInterval(intervalId);
  }, []); 

  const [showLive,setLive]=useState(true)
  const [showHome,setHome]=useState(false)

  console.log("All data:", symbolData);

  return (
    <div className="main_display">
      <div className="content-1">Stocks</div>
      <div className="content-3">
        <div className="livedata" onClick={()=>{setLive(true);setHome(false)}}>Live data</div>
        <div className="Home" onClick={()=>{setHome(true);setLive(false)}}>Demo</div>
      </div>
      <div className={showLive ? "content-2" :"content-2-hide"}>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Open</th>
              <th>Low</th>
              <th>High</th>
              <th>Last Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {symbolData.map((item) => (
              <tr key={item.symbol}>
                <td>{item.symbol}</td>
                <td>{item.data.Open}</td>
                <td>{item.data.DayLow}</td>
                <td>{item.data.DayHigh}</td>
                <td>{item.data.LastPrice}</td>
                <td>{item.data.LastUpdateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={showHome ?"content-4":"content-2-hide"}>
        {
            symbolData.map((item)=> { return (
            <div>{item.symbol}</div>
            )})
        }
      </div>
    </div>
  );
};

export default Stockapi;