import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import { useLoaderData } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TableRow from '../TableRow/TableRow'


export default function LandingChart() {
    const navigate = useNavigate()
    
    const [watchlist, setWatchlist] = useState([])

    const handleAddToWatchlist = async (stock) => {

        let {data} = await axios.post('/api/watchlist', stock)
        console.log(data)
        let {stocks} = data 
        setWatchlist(stocks)
    }


    const {stock} = useLoaderData()
    console.log(stock)
   
    const stockListItems = stock.map((stock, index) => {
      
          return(
<TableRow 
    key={index}
    stock={stock}
    handleAdd={handleAddToWatchlist}
/>
               ) 
   
    })

    const handleGoToWatchlist = () => {
        navigate('watchlist')
      }

    return (
        <Container fluid className='text-center bg-light'>
            <div>
                <h4>Sample Stock List</h4>

                    <p> Take a look through each listed stock. The 'Stock Symbol' represents the company that the Symbol represents. You will see the resective price, price change for the day, and then the price change represented as a percentage change.</p>
                    <p>When you click on the respective 'add' button for each stock, they will be added to your own personal stock list. The stock will be saved to your account and you can login and monitor how each stock is doing over time.</p>
                    <p>At the bottom you will find a button that takes you to your Watchlist.</p>
            </div>
                <Table className='table table-striped'>
                    <thead>
                        <tr>

                            <th scope="col">Stock Symbol</th>
                            <th scope="col">Price</th>
                            <th scope="col">$ Change</th>
                            <th scope="col">% Change</th>
                            <th scope="col"> Add to Watchlist </th>
                        </tr>
                    </thead>

                    <tbody>
                        
                    {stockListItems}

                    </tbody>
                </Table>


        </Container>
    )
}