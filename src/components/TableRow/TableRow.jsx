import { useLoaderData } from "react-router-dom"
import { useState } from "react"
import { Button } from "react-bootstrap"


const TableRow = ( {stock, handleAdd}) => {

const {userStocks} = useLoaderData()
let stockCheck = userStocks.filter((userStock)=> userStock.ticker === stock.ticker)

const [isIncluded, setIsIncluded] = useState(stockCheck.length)


    return(<tr key={stock.ticker}>
                <th scope='row'>{stock.ticker}</th>
                <td>{stock.price}</td>
                <td>{stock.change_amount}</td>
                <td>{stock.change_percentage}</td>
                <td> {isIncluded ? <></> : <Button onClick={(e)=>{
                    handleAdd(stock)
                    setIsIncluded(true)
                    }}> add </Button>}</td>
            </tr>)
}

export default TableRow