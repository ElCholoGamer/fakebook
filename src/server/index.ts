import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('common'));

app.get('/', (req, res) => {
	res.json({
		status: 200,
		message: 'heya',
	});
});

// Listening
const { PORT = 5000 } = process.env;
app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
