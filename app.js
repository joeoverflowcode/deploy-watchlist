import { User, StockList, Stock } from './database/model.js'
import dotenv from 'dotenv'
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import axios from 'axios';

dotenv.config()
//T76N7RFQYS9CGP9F

const app = express();
const port = '8000';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));



app.get('/stock', async (req,res) => {
    const { data } = await axios.get(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`) 
    console.log(data)
    res.status(200).send(data.most_actively_traded)
})

app.get('/userstock', async (req, res) => {
    const watchlist = await StockList.findOne({where:{userId:req.session.userId}, include:{model:Stock, attributes:['ticker']}})
    res.json(watchlist.stocks)

})


app.get('/api/auth/status', (req, res) => {
    if ( req.session.userId ) {
        res.json({loggedIn: true }) 
    } else {
        res.json({loggedIn: false})
    }

})



app.post('/api/signup', async (req, res) => {
    //create new user
    const {username, email, password } = req.body
        let user = await User.create({
            username: username,
            email: email,
            password: password
            })
            
            //create new stocklist for user created
        await user.createStockList()   

    console.log(user)

    if( user && email && password ){
        req.session.userId = user.userId
        res.status(200).json({message:'user created!', success: true})
    } else {
        res.json({ success: false })
    }
    

    
    
    }
)




app.post('/api/auth', async ( req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email}})
    console.log(user,password,email)
    if(user && user.password === password && !req.session.userId) {
        req.session.userId = user.userId
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
})




// app.get('/', async (req, res) => {
//     req.session.userId = user.userId
//     if(req.session.userId) {
//         res.status(200).json({loggedIn: true})
//     } else {

//     }
// }) 


app.post('/api/logout', ( req, res ) => {
    if (!req.session.userId) {
        res.status(401).json({ error: 'Unauthorized'})
    } else {
        req.session.destroy()
        res.json({ success: true})
    }
})


// app.post('/api/watchlist', (req, res) => {

// })

app.get('/api/watchlist', async ( req, res) => {
    const {userId} = req.session
    if(!userId) {
        res.status(401).json({error: 'Unauthorized'})
    } else {
        const watchlist = await StockList.findOne(
            {
                where: {
                    userId: userId
                },
                include: {
                    model: Stock,
                    attributes: ['ticker', 'price', 'dollarChange', 'percentChange']
                }
            }
        )
        let {stocks} = watchlist 
        

        res.json(stocks)

    }
})



app.post('/api/watchlist', async ( req, res ) => {
    const { userId } = req.session 
    if(!userId) {
        res.status(401).json({ error: 'Unauthorized'})
    } else {
        const { 
            ticker, 
            price, 
            change_amount: dollarChange, 
            change_percentage:percentChange } = req.body

        const stocklist = await StockList.findOne(
            {where:
            {userId:userId},
            include: {
                model: Stock,
                attributes: ['ticker','stockId', 'price', 'dollarChange', 'percentChange']
            }
        })
        let {stocks} = stocklist
        const stockCheck = stocks.filter(stock=> stock.ticker === ticker)
        if(stockCheck.length >= 1){
            res.status(401)
            return
        }
        console.log(percentChange)
        await stocklist.createStock({ 
            ticker:ticker,
            price,
            dollarChange,
            percentChange,

        })
        const watchlist = await StockList.findOne(
            {
                where: {
                    userId: userId
                },
                include: {
                    model: Stock,
                    attributes: ['ticker','stockId', 'price', 'dollarChange', 'percentChange']
                }
            }
        )
        res.json(watchlist)
    }
})

app.post('/api/deleteStock', async ( req, res ) => {
    const { userId } = req.session 
    if(!userId) {
        res.status(401).json({ error: 'Unauthorized'})
    } else {
        const {ticker } = req.body

        const stocklist = await StockList.findOne(
            {where:
            {userId:userId}
    })
        await Stock.destroy({ where: 
        { 
            stockListId: stocklist.stockListId,
            ticker: ticker 
        } })

        const watchlist = await StockList.findOne(
            {
                where: {
                    userId: userId
                },
                include: {
                    model: Stock,
                    attributes: ['ticker','stockId', 'price', 'dollarChange', 'percentChange']
                }
            }
        )
        res.json(watchlist)


}
})



ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));

