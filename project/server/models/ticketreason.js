module.exports = (sequelize, type) => {
    return sequelize.define('ticket_reason', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        reason_name: type.STRING,
        reason_details: type.STRING,
    },{
        timestamps: false
    })
}