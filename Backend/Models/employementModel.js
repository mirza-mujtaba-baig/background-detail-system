module.exports=(sequelize,DataTypes)=>{
    const employementDetails = sequelize.define("emp_employement_details", {
        emp_id: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        employer_name: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        previous_employee_id: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        employer_ph_no: {
            type: DataTypes.BIGINT,
            allowNull:false,
          },
          job_title: {
            type: DataTypes.STRING,
            allowNull:false,
          },
        date_of_joining: {
            type: DataTypes.STRING,
            allowNull:false,
          },
          date_of_leaving: {
            type: DataTypes.STRING,
            allowNull:false,
          },
          gross_ctc: {
            type: DataTypes.BIGINT,
            allowNull:false,
          },
          
      });
      return employementDetails;
}