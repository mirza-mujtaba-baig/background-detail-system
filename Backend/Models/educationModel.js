module.exports=(sequelize,DataTypes)=>{
    const educationDetails = sequelize.define("emp_education_details", {
        emp_id: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        education: {
          type: DataTypes.TEXT,
          allowNull:false,
        },
        start_date: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull:false,
          },
          roll_no: {
            type: DataTypes.STRING,
            allowNull:false,
          },
          name_address_college: {
            type: DataTypes.TEXT,
            allowNull:false,
          },
          name_address_university: {
            type: DataTypes.TEXT,
            allowNull:false,
          },
          

          
      });
      return educationDetails;
}