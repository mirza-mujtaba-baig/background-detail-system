const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const uploader = require("express-fileupload");
const userRouter = require("./Routes/userRoute");
const basicDetailsRouter = require("./Routes/basicDetailsRoute");
const addressRouter = require("./Routes/addressRoute");
const educationRouter = require("./Routes/educationRoute");
const employementRouter = require("./Routes/employementRoute");
const miscellaneousRouter = require("./Routes/miscellaneousRoute");
const managerRouter = require("./Routes/managerRoute");

//connection
// const connection=mysql.createConnection({
//    user:'root',
//    host:'localhost',
//    password:'Root@123',
//    database:'ebgv'
// })
// connection.connect((err) => {
//   if (err) throw err;
// });

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(uploader());

app.use("/api/user", userRouter);
app.use("/api/basicDetails", basicDetailsRouter);
app.use("/api/address", addressRouter);
app.use("/api/education", educationRouter);
app.use("/api/employement", employementRouter);
app.use("/api/miscellaneous", miscellaneousRouter);
app.use("/api/manager", managerRouter);

// app.use(
//   "/files",
//   express.static(
//     "C:Usersmirza.baigDesktopFull Stack Assessment Project\bgv-system-managementpublic\files"
//   )
// );

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
