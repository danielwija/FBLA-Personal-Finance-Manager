// total
let t_income = 0;
let t_expenses = 0;

let t_cat_count = {};

for (let i = 0; i < txn.length; i++) {
    if (txn[i].typ === 1){
        t_income += txn[i].amt;
    } else {
        t_expenses += txn[i].amt;
        if (!(txn[i].cat in t_cat_count)) {
            t_cat_count[txn[i].cat] = txn[i].amt;
        } else {
            t_cat_count[txn[i].cat] += txn[i].amt;
        }
    }
}

document.querySelector("#t_income").innerHTML = `Total Income: $${t_income}`;
document.querySelector("#t_expenses").innerHTML = `Total Expenses: $${t_expenses}`;

let t_cat = "";
for (const [key, value] of Object.entries(t_cat_count)) {
    let index = findID(parseInt(key), cat_li);
    t_cat += `<li class="m-2" id="t_cat">${cat_li[index].name}: ${value}</li>`
}

document.querySelector("#t_cat").innerHTML = t_cat;


// month
let m_income = 0;
let m_expenses = 0;

let m_cat_count = {};

const thisMonth = (d) => {
    let date = new Date(d);
    let current_date = new Date();

    if (date.getFullYear() === current_date.getFullYear() && date.getMonth() === current_date.getMonth()) {
        return true;
    }
    return false;
}

for (let i = 0; i < txn.length; i++) {
    if (txn[i].typ === 1 && thisMonth(txn[i].date)){
        m_income += txn[i].amt;
    } else if (thisMonth(txn[i].date)){
        m_expenses += txn[i].amt;
        if (!(txn[i].cat in m_cat_count)) {
            m_cat_count[txn[i].cat] = txn[i].amt;
        } else {
            m_cat_count[txn[i].cat] += txn[i].amt;
        }
    }
}

document.querySelector("#m_income").innerHTML = `Total Income: $${m_income}`;
document.querySelector("#m_expenses").innerHTML = `Total Expenses: $${m_expenses}`;

let m_cat = "";
for (const [key, value] of Object.entries(m_cat_count)) {
    let index = findID(parseInt(key), cat_li);
    m_cat += `<li class="m-2" id="m_cat">${cat_li[index].name}: ${value}</li>`
}

document.querySelector("#m_cat").innerHTML = m_cat;




// weekly
let w_income = 0;
let w_expenses = 0;

let w_cat_count = {};

const thisWeek = (d) => {
    let date = new Date(d).getTime();

    let start = new Date().getTime() - 7*24*60*60*1000;
    let current= new Date().getTime();

    if (date >= start && date <= current) {
        return true;
    }
    return false;
}

for (let i = 0; i < txn.length; i++) {
    if (txn[i].typ === 1 && thisWeek(txn[i].date)){
        w_income += txn[i].amt;
    } else if (thisWeek(txn[i].date)){
        w_expenses += txn[i].amt;
        if (!(txn[i].cat in w_cat_count)) {
            w_cat_count[txn[i].cat] = txn[i].amt;
        } else {
            w_cat_count[txn[i].cat] += txn[i].amt;
        }
    }
}

document.querySelector("#w_income").innerHTML = `Total Income: $${w_income}`;
document.querySelector("#w_expenses").innerHTML = `Total Expenses: $${w_expenses}`;

let w_cat = "";
for (const [key, value] of Object.entries(w_cat_count)) {
    let index = findID(parseInt(key), cat_li);
    w_cat += `<li class="m-2" id="m_cat">${cat_li[index].name}: ${value}</li>`
}

document.querySelector("#w_cat").innerHTML = w_cat;



