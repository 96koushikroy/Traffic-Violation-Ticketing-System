module.exports = (sequelize, type) => {
    return sequelize.define('driver', {
        id: {
          type: type.STRING,
          primaryKey: true
        },
        email: type.STRING,
        password: type.STRING,
        name: type.STRING,
        car_number: type.STRING
    },{
        timestamps: false
    })
}