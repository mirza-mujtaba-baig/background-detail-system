module.exports = (sequelize, DataTypes) => {
  const miscellaneousDetails = sequelize.define("emp_miscellaneous_details", {
    emp_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gap_details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    file_original_name: {
      type: DataTypes.TEXT,
      // allowNull:false,
    },
    file_name: {
      type: DataTypes.TEXT,
      // allowNull:false,
    },
    file_path: {
      type: DataTypes.TEXT,
      // allowNull:false,
    },
    additional_info: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return miscellaneousDetails;
};
