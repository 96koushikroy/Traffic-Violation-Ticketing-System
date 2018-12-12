module.exports = (sequelize, type) => {
    return sequelize.define('ticket', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        car_number: type.STRING,
        police_id: type.STRING,
        driver_id: type.STRING,
        reason_id: type.INTEGER,
        amount: type.INTEGER,
        other_documents: type.STRING,
        issue_date: type.DATE,
        deadline_date: type.DATE,
        status: type.INTEGER,
    },{
        timestamps: false
    })
}