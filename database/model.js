import { Model, DataTypes } from 'sequelize'
import util from 'util'
import connectToDB from './db.js'


export const db = await connectToDB('postgresql:///stock')

export class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

export class StockList extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

export class Stock extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        modelName: 'user',
        sequelize: db,
    },
)

StockList.init(
    {
        stockListId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },

    },
    {
        modelName: 'stockLists',
        sequelize: db,
    }
)

Stock.init(
    {
        stockId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        ticker: {
            type: DataTypes.STRING,
        },
        price: {
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        dollarChange: {
            type: DataTypes.FLOAT,
            allowNull:false,
        },
        percentChange: {
            type: DataTypes.STRING,
            allowNull: false,
        },



    },
    {
        modelName: 'stock',
        sequelize: db,
    }
)

User.hasOne(StockList, { foreignKey: 'userId' })
StockList.belongsTo(User, { foreignKey: 'userId' });

StockList.hasMany(Stock, { foreignKey: 'stockListId' });
Stock.belongsTo(StockList, { foreignKey: 'stockListId' });


// await db.sync({ force: true })

// const testUser1 = await User.create({ username: 'jojo22', email: 'test@email.com', password: 'test'})

// console.log(testUser1)

// const testStock = await Stock.create({ stockId: '1', stockSymbol: 'AAPL'})

// console.log(testStock)   


// await db.close()