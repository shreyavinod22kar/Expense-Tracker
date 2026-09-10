# 💰 Expense Tracker

A full-stack web application to track, manage, and visualize personal expenses — built as my first self-driven project.

🔗 **Live Demo:** https://shreya-expense-tracker.netlify.app/

## Features

- ➕ Add expenses with name, amount, and category
- 🗑️ Delete expenses
- 📊 Real-time total spending calculation
- 🥧 Visual breakdown of spending by category (pie chart)
- 💾 Persistent storage using a SQLite database
- 🌐 Fully deployed and accessible online

## Tech Stack

**Frontend:** HTML, CSS, JavaScript, Chart.js  
**Backend:** Python, Flask  
**Database:** SQLite  
**Deployment:** Netlify (frontend), Render (backend)

## How It Works

1. User adds an expense through the form on the frontend
2. Frontend sends the data to the Flask backend via a REST API (fetch + JSON)
3. Flask saves the data into a SQLite database
4. Frontend fetches and displays updated data, including a live-updating chart


## Running Locally

```bash
# Clone the repository
git clone https://github.com/shreyavinod22kar/Expense-Tracker.git
cd Expense-Tracker

# Install backend dependencies
pip install -r requirements.txt

# Run the backend
python database.py   # sets up the database
python app.py         # starts the Flask server

# Open index.html in your browser (or use Live Server)
```

## What I Learned

This was my first full-stack project, and I learned:
- How frontend and backend communicate via REST APIs
- Working with databases (SQLite) and writing SQL queries
- Using Git and GitHub for version control
- Deploying a full-stack application (Render + Netlify)
- Debugging real-world deployment issues

## Future Improvements

- User authentication (login/signup)
- Edit existing expenses
- Filter expenses by date range
- Export expenses as PDF/CSV

## Author

**Shreya Baviskar**  
[GitHub](https://github.com/shreyavinod22kar)
