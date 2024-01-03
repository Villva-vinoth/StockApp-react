import react, { useEffect, useState } from 'react'
import axios from 'axios';

const Global = () => {



    const accessKey = ''


    const endpoint = 'http://test.lisuns.com:4531/GetLastQuoteArray'
    const exchange = 'NSE';
    const instrumentIdentifier = 'CIPLA+SBIN'
    const xml = true;



    const options = {
        method: 'GET',
        url: `${endpoint}?accessKey=${accessKey}&exchange=${exchange}&instrumentIdentifier=${instrumentIdentifier}`,
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
                        // const response = await axios.request(options);
                        const request =await axios.get('http://test.lisuns.com:4531/GetLastQuoteArray/?accessKey=0f3c78d4-5328-4abe-bf15-11a09db30816&exchange=NSE&instrumentIdentifiers=CIPLA+SBIN')
                        // console.log(response);
                        console.log(request)
                
                        // setStockData(response.data)

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
                    <div className={showLive ? "livedata" : ""} onClick={() => { setLive(true); setHome(false); setOption(false) }}>Live data</div>
                    <div className={showHome ? "Home" : ""} onClick={() => { setHome(true); setLive(false); setOption(false) }}>Derivative</div>
                    <div className={showOption ? "option" : ""} onClick={() => { setOption(true); setLive(false); setHome(false) }}>Option chain</div>

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
                                    <td> <svg style={{ width: "20px", height: "20px" }}>
                                        <circle cx={10} cy={10} r={10} className={item.open < item.lastPrice ? 'svg-circle-pos' : 'svg-circle-nev'} />
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
export default Global