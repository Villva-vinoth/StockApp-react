import react, { useEffect, useState } from 'react'
import axios from 'axios';

const NewStockapi = () => {

  // api multiple

  const options = {
    method: 'GET',
    url: 'https://latest-stock-price.p.rapidapi.com/any',
    params: {
      Identifier: 'CIPLAEQN,M&MEQN,HDFCBANKEQN,SBINEQN,TECHMEQN,HAVELLSEQN'
    },
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
    }
  };

  const [Stocksdata, setStockData] = useState([])
  const [showLive, setLive] = useState(true)
  const [showHome, setHome] = useState(false)
  const [showOption, setOption] = useState(false)

  useEffect(
    () => {
      (
        async () => {
          try {
            const response = await axios.request(options);
            console.log(response.data);
            setStockData(response.data)
          } catch (error) {
            console.error(error);
          }
        }
      )()
    }, []
  )

  return (
    <>
      <div className="main_display">
        <div className="content-1">Stocks</div>
        <div className="content-3">
          <div className={showLive ? "livedata" :""} onClick={() => { setLive(true); setHome(false);setOption(false) }}>Live data</div>
          <div className={showHome ? "Home" :""} onClick={() => { setHome(true); setLive(false);setOption(false) }}>Derivative</div>
          <div className={showOption ? "option" :""} onClick={() => { setOption(true); setLive(false); setHome(false) }}>Option chain</div>

        </div>
        <div className={showLive ? "content-2" : "content-2-hide"}>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Open</th>
                <th>Low</th>
                <th>High</th>
                <th>Last Price</th>
                <th>Previous Closes</th>
                <th className='positive-head'>+0.3%</th>
                <th className='negative-head'>-0.3%</th>
                <th>Time</th>
                <th>
                  Indicator
                </th>

              </tr>
            </thead>
            <tbody>
              {Stocksdata.map((item) => (
                <tr key={item.symbol}>
                  <td>{item.symbol}</td>
                  <td>{item.open}</td>
                  <td>{item.dayLow}</td>
                  <td>{item.dayHigh}</td>
                  <td>{item.lastPrice}</td>
                  <td>{item.previousClose}</td>
                  <td className='positive'>{(Number((item.open) * (0.3 / 100)) + Number(item.open)).toFixed(2)}</td>
                  <td className='negative'>{(Number(item.open) - Number((item.open) * (0.3 / 100))).toFixed(2)}</td>
                  <td>{item.lastUpdateTime}</td>
                  <td> <svg style={{width:"20px",height:"20px"}}>
                    <circle cx={10} cy={10} r={10} className={item.open < item.lastPrice   ?'svg-circle-pos':'svg-circle-nev'} />
                  </svg></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={showHome ? "content-4" : "content-2-hide"}>
          {
            Stocksdata.map((item) => {
              return (
                <div>{item.symbol}</div>
              )
            })
          }
        </div>

        <div className={showOption ? "content-5" : "content-2-hide"}>
          {
            Stocksdata.map((item) => {
              return (
                <div>{item.symbol}</div>
              )
            })
          }
        </div>
      </div>
    </>
  )

}
export default NewStockapi