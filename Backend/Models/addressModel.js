module.exports=(sequelize,DataTypes)=>{
    const addressDetails = sequelize.define("emp_address_details", {
        emp_id: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        residential_address: {
          type: DataTypes.TEXT,
          allowNull:false,
        },
        employement_address: {
          type: DataTypes.TEXT,
          allowNull:false,
        },

          
      });
      return addressDetails;
}