const { Sequelize } = require('sequelize');
const UserModel = require('./models/UserModel');
const CategoryModel = require('./models/CategoryModel');
const ProductModel = require('./models/ProductModel');
const ParamsModel = require('./models/ParamsModel');
const CartModel = require('./models/CartModel');

const sequelize = new Sequelize('postgres://postgres:pgadmin@localhost:5432/shop_model', {
    logging: sql => console.log("SQL: ", sql)
});

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database');

        let db = {};
        db.users = await UserModel(Sequelize, sequelize);
        db.categories = await CategoryModel(Sequelize, sequelize);
        db.products = await ProductModel(Sequelize, sequelize);
        db.params = await ParamsModel(Sequelize, sequelize);
        db.carts = await CartModel(Sequelize, sequelize);

        db.categories.hasMany(db.products, {
            foreignKey: {
                name: "category_id",
                allowNull: false
            }
        })

        db.products.belongsTo(db.categories, {
            foreignKey: {
                name: "category_id",
                allowNull: false
            }
        })

        db.products.hasMany(db.params, {
            foreignKey: {
                name: "product_id",
                allowNull: false
            }
        })

        db.params.belongsTo(db.products, {
            foreignKey: {
                name: "product_id",
                allowNull: false
            }
        })

        db.users.hasMany(db.carts, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        db.carts.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        db.products.hasMany(db.cart, {
            foreignKey: {
                name: "product_id",
                allowNull: false
            }
        })

        db.carts.belongsTo(db.products, {
            foreignKey: {
                name: "product_id",
                allowNull: false
            }
        })


        await sequelize.sync({ force: true });

    } catch (e) {
        console.log('Connection error: ', e);
    }
}

main().then();