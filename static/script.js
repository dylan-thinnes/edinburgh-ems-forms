const CONSTANTS = require("../constants.js")

var state = {};

function updateState (newstate) {
    state = newstate;

    let table = document.querySelector("#table");

    let thead = document.createElement("thead");
    table.appendChild(thead);
    let tr = document.createElement("tr");
    table.appendChild(tr);

    for (var field of Object.values(CONSTANTS.TABLE_FIELDS)) {
        var th = document.createElement("th");
        th.innerHTML = field.show;
        tr.appendChild(th);
    }

    let tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for (let row of state) {
        let tr = document.createElement("tr");

        for (let field of Object.values(CONSTANTS.TABLE_FIELDS)) {
            var td = document.createElement("td");
            if (field.transform == null) continue;
            td.appendChild(field.transform(row[field.name]));
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
}

function updateFromAPI () {
    var req = new XMLHttpRequest();
    req.open("GET", "/api");
    req.onreadystatechange = () => {
        if (req.status == 200 && req.readyState == 4) {
            updateState(JSON.parse(req.response));
        }
    }
    req.send();
}

updateFromAPI();
