import app from './app.js';
import connectDB from './src/config/dbConfig.js';
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => console.log(`listening to the given port no ${PORT}`));
