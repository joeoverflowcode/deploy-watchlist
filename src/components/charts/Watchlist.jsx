

import {useLoaderData} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import './style/Watchlist.css'


export default function Watchlist() {

  const {myStock} = useLoaderData()

  
  const [watchlist, setWatchlist] = useState(myStock)

  
  

  const deleteStock = async (ticker) =>{

    let {data} = await axios.post('/api/deleteStock', {ticker})
    console.log(data)


  setWatchlist(data.stocks)
  }



const myList = watchlist.map((stock) => (
  <tr key={stock.ticker}> 
  <th scope='row'>{stock.ticker}</th>
<th scope='row'> {stock.price}</th>
<th scope='row'>{stock.dollarChange}</th>
<th scope='row'>{stock.percentChange}</th>



  <td><Button onClick={(e) => {
    e.preventDefault()
    deleteStock(stock.ticker)}}>Delete</Button></td>
  </tr>


))


  return (
    <>

    <Container className='chart'>
      <h1>Watchlist Chart</h1>

          <Table className='table table-striped'>
             <thead>
                  <tr>

                    <th scope="col">Stock Symbol</th>
                    <th scope="col">Price</th>
                    <th scope='col'> $ Change</th>
                    <th scope='col'> % Change</th>
                    <th scope='col'>Delete from Watchlist</th>
                    </tr>
                    </thead>

                    <tbody>
                        
                    {myList}

              </tbody>
        </Table>
    </Container>
    </>
  )
}
