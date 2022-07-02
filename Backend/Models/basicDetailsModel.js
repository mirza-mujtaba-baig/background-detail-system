module.exports=(sequelize,DataTypes)=>{
    const basicDetails = sequelize.define("emp_basic_details", {
        emp_id: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        full_name: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        father_husband_name: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
          },
          contact_no: {
            type: DataTypes.BIGINT,
            allowNull:false,
          },
          date_of_birth: {
            type: DataTypes.STRING,
            allowNull:false,
          },
          marital_status: {
            type: DataTypes.STRING,
            allowNull:false,
          },
          createdAt: DataTypes.DATE,
          updatedAt: DataTypes.DATE,

          
      });
      return basicDetails;
}