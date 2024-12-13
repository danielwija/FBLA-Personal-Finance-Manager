document.querySelector("#balance").innerHTML = "Current Balance: " + localStorage.getItem("balance");

// sort the txn history based on time
txn.sort((t1, t2) => {
    let d1 = new Date(t1.date).getTime();
    let d2 = new Date(t2.date).getTime();
    return d2 - d1
})

// render txn history
const renderTxn = (term) => {
    document.querySelector("#txn_li").innerHTML = "";

    for (let i = 0; i < txn.length; i++) {
        let index = findID(parseInt(txn[i].cat), cat_li);
        
        if (!cat_li[index].name.includes(term)) {
            console.log(cat_li[index].name)
            continue;
        }

        let date_text = formatDate(txn[i].date)

        let typ_icon = txn[i].typ === 1 ? `<i class="bi bi-plus-circle text-primary"></i>` : `<i class="bi bi-dash-circle text-danger"></i>`
        
        let cat = "";
        for (let j = 0; j < cat_li.length; j++) {
            if (cat_li[j].id === parseInt(txn[i].cat)) {
                cat = cat_li[j].name;
                break;
            }
        }

        document.querySelector("#txn_li").innerHTML += 
        `<li class='list-group-item d-flex justify-content-between align-items-center'>
            <p class="m-0">${typ_icon} &nbsp ${date_text} -- ${cat}: &nbsp $${txn[i].amt}</p>
            <div><button type="button" class="btn btn-warning btn-sm me-2" id="btn_update_${txn[i].id}" onclick="txn_update(${txn[i].id})">Update</button><button type="button" class="btn btn-danger btn-sm" id="btn_delete_${txn[i].id}" onclick="txn_delete(${txn[i].id})">Delete</button></div>
        </li>`;
    }
}   


// delete
const txn_delete = (id) => {
    for (let i = 0; i < txn.length; i++) {
        if(txn[i].id === id) {
            let dTxn = txn.splice(i,1)[0];
            localStorage.setItem("txn", JSON.stringify(txn));
            if (dTxn.typ === 1) {
                localStorage.setItem("balance", parseInt(localStorage.getItem("balance")) - dTxn.amt);
            } else {
                localStorage.setItem("balance", parseInt(localStorage.getItem("balance")) + dTxn.amt);
            }
            break;
        }
    }
}


// update (when user click update)
const txn_update = (id) => {
    console.log(id);
    // redirect to add new but passed "update=??" to tell index.js this is for update
    window.location.replace(`./index.html?update=${id}`);
}


// search and filter
document.querySelector("#search").addEventListener("change", (e) => {
    term = document.querySelector("#search").value;
    // re render txn history, but only show those that has match or include search term
    renderTxn(term);
})

// first time render the txn history
renderTxn("");