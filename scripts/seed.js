import { User, StockList, Stock, db } from '../database/model.js'
import stockData from './data/stock.json' assert { type: 'json' }

console.log('Syncing database...')

await db.sync ({force: true})

console.log('Seeding database...')


const usersToCreate = []
for(let i = 0; i < 10; i++){
    
    let user = await User.create({
        username:`sampleUser${i}`,
        email: `test${i}@email.com`,
        password:'test'
    })

    usersToCreate.push(user)
    let stockList = await user.createStockList()
    

    const sampleStock = [
      {
        symbol: 'AAPL',
        price: 150.25,
        dollarChange: 2.50,
        percentageChange: '1.69%',
      },
      {
        symbol: 'GOOG',
        price: 2700.75,
        dollarChange: -5.25,
        percentageChange: '0.19%',
      },
      {
        symbol: 'MSFT',
        price: 305.50,
        dollarChange: 1.20,
        percentageChange: '0.39%',
      },
      {
        symbol: 'TSLA',
        price: 750.80,
        dollarChange: -3.75,
        percentageChange: '-0.50%',
      },
      {
        symbol: 'ZOOM',
        price: 250.00,
        dollarChange: 0.00,
        percentageChange: '0.00%',
      },
    ];


    for (const stock of sampleStock){
      await stockList.createStock({
        ticker: stock.symbol,
        price: stock.price,
        dollarChange: stock.dollarChange,
        percentChange: stock.percentageChange
      })
    }

    console.log(`User: ${user.username} - StockList ID: ${stockList.stockListId}`)

}

const usersInDB = await Promise.all(usersToCreate)
console.log(usersInDB)


for (const user of usersInDB) {
    console.log(`User: ${user.username}`);
    const stockList = await user.getStockList();
    const stocks = await stockList.getStocks();
    for (const stock of stocks) {
      console.log(`- Stock Symbol: ${stock.ticker}`);
      console.log(`  - Price: $${stock.price}`);
      console.log(`  - Dollar Change: $${stock.dollarChange}`);
      console.log(`  - Percent Change: ${stock.percentChange}%`);
    }
  }



await db.close()
console.log('Finished seeding database!')