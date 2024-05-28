import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
      });

      
      
const UserModel = mongoose.model('newdata', userSchema);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    await UserModel.create({ name, email, password });
    res.redirect('/login');
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  