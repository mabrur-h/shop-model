module.exports = async (Sequelize, sequelize) => {
    return await sequelize.define('orders', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4()
        }
    });

}