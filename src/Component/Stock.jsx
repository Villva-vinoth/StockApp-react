import React, { useEffect, useState } from 'react';
import './Stock.css'
import axios from 'axios';
const Stock = () => {
        //single stock
      const options = {
        method: 'GET',
        url: 'https://indian-stock-exchange-api1.p.rapidapi.com/stock_price/',
        params: {
          symbol: 'AXISBANK'
        },
        headers: {
          'X-RapidAPI-Key': '',
          'X-RapidAPI-Host': 'indian-stock-exchange-api1.p.rapidapi.com'
        }
      };
    let data = []
    // const options = {
    //     method: 'GET',
    //     url: 'https://nse-market.p.rapidapi.com/stocks',
    //     params: { symbol: 'axisbank' },
    //     headers: {
    //         'X-RapidAPI-Host': 'nse-market.p.rapidapi.com',
    //         'X-RapidAPI-Key': '85555dcaadmsh82d0587ac8c1088p1508f4jsn95fd3c92028f'
    //     }
    // };

    const [stockdata, setStockData] = useState([]);






    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.request(options);
            const datas = await response.data
            // console.log(datas)
            data = datas
            // console.log(data)
            setStockData(datas)
        }

        fetchdata();
    }, []);

    console.log("stockdata :", stockdata)

    return (
        <div className='main-dash'>
            <div className='inputs'> Stocks</div>

            <div className='display-dashboard'>
                <div className='item-1'>
                    Symbol  <span> {stockdata?.Symbol}</span>

                </div>
                <div className='item-1'>
                    Open <span>{stockdata?.Open}</span>
                    <div className='progress'>
                    {/* <ProgressBar />   */}
                    </div>
                </div>
                <div className='item-1'>
                    DayHigh <span>{stockdata?.DayHigh}</span>
                </div>
                <div className='item-1'>
                    DayLow <span> {stockdata?.DayLow}</span>
                </div>
                <div className='item-1'>
                    Last Price <span> {stockdata?.LastPrice}</span>
                </div>
                <div className='item-1'>
                    Updated time  <span>{stockdata?.LastUpdateTime}</span>
                </div>
            </div>

        </div>
    );
};

export default Stock;
