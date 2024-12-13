const default_cat_li = [
    { id: 1, name: "Food" },
    { id: 2, name: "Rent" },
    { id: 3, name: "Transportation" },
    { id: 4, name: "Utilities" },
    { id: 5, name: "Entertainment" },
    { id: 6, name: "Education" },
    { id: 7, name: "Healthcare" },
    { id: 8, name: "Shopping" },
    { id: 9, name: "Savings" },
    { id: 10, name: "Debt" },
    { id: 11, name: "Gifts" },
    { id: 12, name: "Insurance" },
    { id: 13, name: "Personal Care" },
    { id: 14, name: "Travel" },
    { id: 15, name: "Sports" },
    { id: 16, name: "Clothing" },
    { id: 17, name: "Technology" },
    { id: 18, name: "Miscellaneous" },
    { id: 19, name: "Investment" },
    { id: 20, name: "Tools" }
];



// Check localStorage
// cat_li
if (localStorage.getItem("cat_li") === null) {
    localStorage.setItem("cat_li", JSON.stringify(default_cat_li));
}

try {
    JSON.parse(localStorage.getItem("cat_li"));
} catch (e) {
    localStorage.setItem("cat_li", JSON.stringify(default_cat_li));
}

// balance
if(localStorage.getItem("balance") === null) {
    localStorage.setItem("balance", 0);
} 

if(isNaN(localStorage.getItem("balance") )) {
    localStorage.setItem("balance", 0);
}

// txn
if(localStorage.getItem("txn") === null) {
    localStorage.setItem("txn", "[]");
}

try {
    JSON.parse(localStorage.getItem("txn"));
} catch(e) {
    localStorage.setItem(JSON.stringify("[]"));
}

let txn = JSON.parse(localStorage.getItem("txn"));
let cat_li = JSON.parse(localStorage.getItem("cat_li"));

// format dagte to yyyy-mm-dd format
const formatDate = (d) => {
    let year = d.slice(0,4);
    let month = d.slice(5,7);
    let date = d.slice(8,10);

    let date_text = `${year}-${month}-${date}`;

    return date_text;
}

// find the index of the li based on id which is stored in the object.id
const findID = (id, li) => {
    for (let i = 0; i < li.length; i++) {
        if (li[i].id === id) {
            return i;
        }
    }
    return -1;
}