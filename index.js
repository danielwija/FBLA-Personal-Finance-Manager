let timer_going = null;
let mode = "add";
let current_id;

// render cat dropdown list
const txnCatEl = document.querySelector("#txn_cat");
for (let i=0; i<cat_li.length; i++) {
    txnCatEl.innerHTML += `<option id="cat_${cat_li[i].id}" value="${cat_li[i].id}">${cat_li[i].name}</option>`
}

// helper function to replace class
const replaceClass = (id, c1, c2) => {
    if (document.querySelector(id).classList.contains(c1)) {
        document.querySelector(id).classList.remove(c1);
    }
    document.querySelector(id).classList.add(c2);
}

// clear success mesage a while after succesfully sumbited or user already start a new txn
const clearSuccessMessage = () => {
    document.querySelector("#new_txn_alert").classList.add("d-none");
}

const params = new URLSearchParams(window.location.search);
if (params.has("update")) {
    id = parseInt(params.get("update"));
    mode = "update";

    current_id = findID(id, txn);

    document.querySelector("#txn_date").value = formatDate(txn[current_id].date);
    document.querySelector("#txn_type").value = txn[current_id].typ;
    document.querySelector("#txn_amt").value = parseInt(txn[current_id].amt);
    document.querySelector("#txn_cat").value = txn[current_id].cat;
    document.querySelector("#txn_note").value = txn[current_id].note;

    document.querySelector("#mode_display").innerHTML = "Update";
    document.querySelector("#new_txn_submit").innerHTML = "Update";
    document.querySelector("#new_txn_submit").classList.replace("btn-primary", "btn-warning");


}

// new txn sumbission
document.querySelector("#new_txn").addEventListener("submit", (e) => {
    e.preventDefault();

    // Stop succesful message from last time's submission
    if (timer_going) {
        clearTimeout(timer_going);
        clearSuccessMessage();
    }

    // Get Form Data
    let newTxnForm = document.querySelector("#new_txn");
    const newTxnFormData = new FormData(newTxnForm);

    let txn_type = newTxnFormData.get("txn_type");
    let txn_date = newTxnFormData.get("txn_date");
    let txn_amt = newTxnFormData.get("txn_amt");
    let txn_cat = newTxnFormData.get("txn_cat");
    let txn_note = newTxnFormData.get("txn_note");


    // validation
    let isValid = true;

    // type
    if (txn_type !== "1" && txn_type !== "2") {
        replaceClass("#txn_type", "is-valid", "is-invalid");
        isValid = false;
    } else {
        replaceClass("#txn_type", "is-invalid", "is-valid");
    }

    // date
    if (!(/^\d{4}-\d{2}-\d{2}$/.test(txn_date))) {
        replaceClass("#txn_date", "is-valid", "is-invalid");
        isValid = false;
    } else {
        replaceClass("#txn_date", "is-invalid", "is-valid");
    }

    // category
    if (!/^\d+$/.test(txn_cat)) {
        replaceClass("#txn_cat", "is-valid", "is-invalid");
        isValid = false;
    } else {
        let cat_li_idx = -1;

        for (let i=0; i<cat_li.length; i++) {
            if (cat_li[i].id === Number(txn_cat)) {
                cat_li_idx = i;
                break;
            }
        }
        
        if (cat_li_idx  === -1) {
            replaceClass("#txn_cat", "is-valid", "is-invalid");
            isValid = false;
        } else {
            replaceClass("#txn_cat", "is-invalid", "is-valid");
        }     
    }

    // amount
    if (!/^\d+$/.test(txn_amt)) {
        replaceClass("#txn_amt", "is-valid", "is-invalid");
        isValid = false;
    } else if (parseInt(txn_amt) < 0) {
        replaceClass("#txn_amt", "is-valid", "is-invalid");
        isValid = false;
    } else{
        replaceClass("#txn_amt", "is-invalid", "is-valid");
    }

    // exit if any validation is not passed
    if (!isValid) return;

    let nBalance = 0;
    let changeInBalance = 0;
    
    // build new txn in LocalStorage
    if (mode === "add") {
        let new_txn = {
            id: parseInt(Date.now()),
            typ: txn_type === "1" ? 1 : 2,
            date: txn_date,
            amt: parseInt(txn_amt),
            cat: parseInt(txn_cat),
            note: txn_note,
        };
    
        txn.push(new_txn);
        localStorage.setItem("txn", JSON.stringify(txn));

        changeInBalance = txn_type === "1" ? new_txn.amt : 0 - new_txn.amt;
        
    } else {
        // update txn
        if (txn[current_id].typ === 1) {
            changeInBalance = 0 - txn[current_id].amt;
        } else {
            changeInBalance = txn[current_id].amt;
        }

        txn[current_id].typ = txn_type === "1" ? 1 : 2;
        txn[current_id].date = txn_date;
        txn[current_id].amt = parseInt(txn_amt);
        txn[current_id].cat = parseInt(txn_cat);
        txn[current_id].note = txn_note;

        if (txn[current_id].typ === 1) {
            changeInBalance = changeInBalance + txn[current_id].amt;
        } else {
            changeInBalance = changeInBalance - txn[current_id].amt;
        }

        localStorage.setItem("txn", JSON.stringify(txn));


    }
    
    // update balance
    nBalance = parseInt(localStorage.getItem("balance")) + changeInBalance;
    localStorage.setItem("balance", nBalance);

    // clear form after submit
    document.querySelector("#new_txn").reset();
    document.querySelector("#txn_type").classList.remove("is-valid");
    document.querySelector("#txn_date").classList.remove("is-valid");
    document.querySelector("#txn_amt").classList.remove("is-valid");
    document.querySelector("#txn_cat").classList.remove("is-valid"); 

    // succesful message 
    document.querySelector("#new_txn_alert").classList.remove("d-none"); 

    // clear succesful message after 3 seconds
    timer_going = setTimeout(() => {
        clearSuccessMessage();
    }, 3*1000)
        
    }

)



