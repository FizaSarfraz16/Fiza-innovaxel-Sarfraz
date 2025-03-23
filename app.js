import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import urlRoutes from './routes/url.js';
import { redirectToOriginal } from './controllers/urlController.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/shorten', urlRoutes);

// Redirect route
app.get('/:shortCode', redirectToOriginal);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
