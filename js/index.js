//necessary page elements
const saveBtn = document.getElementById("input-btn");
const inputField = document.getElementById("input-el");
const clearBtn = document.getElementById("clear-btn");

const list = document.getElementById("ul-l");
const tabBtn = document.getElementById("tab-btn");

let leads = {"content":[]};
if(localStorage.getItem("leads") == null){
    window.localStorage.setItem('leads', JSON.stringify(leads));
}
else{
    renderList();
}

saveBtn.addEventListener("click", () => {
    let lead = inputField.value;
    if (lead == "") {
        return;
    }

    leads.content.push(lead);
    addNewLeadToStorage(lead);

    inputField.value = null;
})

clearBtn.addEventListener("click", () => {
    leads = {"content":[]};
    window.localStorage.setItem('leads', JSON.stringify(leads));
    renderList();
})

tabBtn.addEventListener("click", () => {
    let lead = getCurrentTab();
    lead.then( c => addNewLeadToStorage(c.url));
    renderList();
})

list.addEventListener("click", (event) =>{
    let target = event.target;
    if(target.tagName == "I"){
        deleteItem(target.id)
    }
    else{
        return;
    }
})

function renderList() {
    let currentLeads = JSON.parse(window.localStorage.getItem('leads'));
    list.innerHTML = null;
    let counter = 0;
    currentLeads.content.forEach(lead => {
        list.innerHTML += `<li class='lead-item'><a href='${lead}' target="_blank">${lead}</a>
        <i class="fa fa-trash" id=${counter} aria-hidden="true"></i></li>`; 
        counter++;
    });
}

function addNewLeadToStorage(lead) {
    let currentLeads = JSON.parse(window.localStorage.getItem('leads'));
    currentLeads.content.push(lead);
    window.localStorage.setItem('leads', JSON.stringify(currentLeads));
    renderList()
}

function deleteItem(index) {
    let currentLeads = JSON.parse(window.localStorage.getItem('leads'));
    currentLeads.content.splice(index, 1);
    window.localStorage.setItem('leads', JSON.stringify(currentLeads));
    renderList()
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }