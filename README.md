
This repository contains a full-stack URL shortening service built with:

-Node.js + Express.js
-MySQL (Relational Database)
- HTML, CSS & JavaScript (Frontend)

---

Setup Instructions

> All code is in the `dev` branch.

---

1. Clone the Repository & Switch to `dev` Branch

bash
git clone https://github.com/FizaSarfraz16/Fiza-innovaxel-Sarfraz.git
cd Fiza-innovaxel-Sarfraz
git checkout dev

2. Project Structure

url-shortener/
├── app.js
├── package.json
├── public/
│   └── index.html
├── config/
│   └── db.js
├── controllers/
│   └── urlController.js
├── models/
│   └── urlModel.js
├── routes/
│   └── urlRoutes.js
├── utils/
│   └── generateShortCode.js
└── README.md
3. Install Dependencies
bash
npm install
4. Set Up the MySQL Database

CREATE DATABASE IF NOT EXISTS url_shortener;
USE url_shortener;
CREATE TABLE IF NOT EXISTS urls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(2048) NOT NULL,
  short_code VARCHAR(10) NOT NULL UNIQUE,
  access_count INT DEFAULT 0,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  INDEX idx_short_code (short_code)
);
5. Configure DB Connection
Update config/db.js with your MySQL credentials:

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'url_shortener'
});
 6. Run the App

npm run dev

Open in browser: http://localhost:3000

 API Endpoints
Method	    Endpoint                Description
POST	    /shorten	            Create new short URL
GET	    /shorten/:shortCode    	    Get original URL
PUT	    /shorten/:shortCode	        Update existing short URL
DELETE	/shorten/:shortCode	    Delete short URL
GET	    /shorten/:shortCode/stats    Get access statistics
GET	    /:shortCode                	Redirect to original URL

You can Test you API using curl or postman.