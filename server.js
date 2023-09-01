//console.log("Hello");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
 
// //middleware
 app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
                res.send('Blog')                                                                                                                                                                                                                                                                                                                                                                                                                                                             
})
app.use('/api',require("./routes/app.route"))


mongoose.set("strictQuery", false)
mongoose.connect('mongodb://127.0.0.1/CRUD')
.then(() => {
  console.log('connected to MongoDB')
  app.listen(3000, () => {
    console.log('Node API app is running on port 3000');
  })
}).catch((error) => {
  console.log(error);
})

// const mongoose = require("mongoose");
// //configure mongoose
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/CRUD",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Connected to MongoDB");
//     }
//   }
// );


  


// module.exports = app;

