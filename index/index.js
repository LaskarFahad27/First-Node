// const express = require('express');
// const fs = require('fs');
// const cors = require('cors');

// const app = express();
// app.use(cors()); // ✅ Enable CORS
// app.use(express.json()); // Optional: to handle JSON body if needed

// const PORT = process.env.PORT || 3000;

// // File saving function
// const saveFile = (filename, data) => {
//   if (fs.existsSync(filename)) {
//     fs.appendFile(filename, data + "\n", function (err) {
//       if (err) return false;
//       console.log('Appended!');
//     });
//     return true;
//   } else {
//     fs.writeFile(filename, data + "\n", function (err) {
//       if (err) return false;
//       console.log('Written!');
//     });
//     return true;
//   }
// };

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello from Express!');
// });

// app.post('/register', (req, res) => {
//     const filename = req.body.filename|| "default.txt";
//     delete req.body.filename;
//     const jsonData = JSON.stringify(req.body); 
//     const result = saveFile(filename, jsonData);
//     res.json({"Saved_to_file: ":filename});
//   });

// // Server start
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });
