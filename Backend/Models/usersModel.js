module.exports=(sequelize,DataTypes)=>{
    const User = sequelize.define("users_table", {
        emp_id: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
          },
          role: {
            type: DataTypes.STRING
          },
          application_status: {
            type: DataTypes.STRING
          }
      });
      return User;
}