module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.STRING,
          primaryKey: true
        },
        email: type.STRING,
        password: type.STRING,
        user_type: type.INTEGER
    },{
        timestamps: false
    })
}