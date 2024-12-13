# Personal Finance Manager

## Introduction  
Welcome to **Personal Finance Manager** where you can keep track of your income and spending and understand your spending habbits.

---

## Table of Contents  
- [Project Overview](#project-overview)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [LocalStorage Data](#localstorage-data)  

---

## Project Overview  
The program can do multiple task:

- Track transactions (income and expenses)  
- View financial balance
- View transaction history
- Search and filter transactions by category
- Update or delete transactions

--- 

## Tech Stack  

- HTML5  
- CSS3 (Bootstrap 5 for styling)  
- JavaScript  
- LocalStorage

---

## Installation  

### Prerequisites  
- A modern web browser  
- No need for any server or extra installations

### Steps  
1. Download the project from GitHub.  
2. Open `index.html` directly in your browser to run the project locally.

---

## Usage  

### 1. Add Transactions  
- Use the **Add New Transaction** form to input income or expenses.

### 2. View Transaction History  
- The **History Page** lists all transactions organized by date and category.

### 3. Search and Filter Transactions  
- Use the **Search Bar** to find transactions by date, category, or description.

### 4. Update and Delete Transactions  
- Click on a transaction to **edit or delete it** directly from the list view. And it would lead you to Update Page.

### 5. View Recap from total, monthly, or weekly view 
- The **History Page** lists all transactions organized by date and category.

---

## LocalStorage Data  

Data is stored directly in your browser's LocalStorage for quick access and persistence. Here’s a quick look at the structure:

### localStorage:
```"
txn": [
    {
      "id": 1,
      "date": "2023-05-05",
      "amt": 50,
      "typ": 1,
      "cat": 2
    }
],
"balance": 1200,
"cat_li": [
    { "id": 1, "name": "Food" },
    { "id": 2, "name": "Rent" }
]
```


## Templates and Library Usage
- Bootstrap 5
- Unspash
- Chatgpt: only for use for style.css
