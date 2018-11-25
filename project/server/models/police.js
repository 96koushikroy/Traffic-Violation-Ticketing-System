module.exports = (sequelize, type) => {
    return sequelize.define('police', {
        id: {
          type: type.STRING,
          primaryKey: true
        },
        email: type.STRING,
        password: type.STRING,
        name: type.STRING
    },{
        timestamps: false
    })
}