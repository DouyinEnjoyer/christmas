const jssection = document.createElement("div");
jssection.id = "jssection";
document.body.appendChild(jssection);

const table = document.createElement("table");
jssection.appendChild(table);
table.classList.add("hide");

const thead = document.createElement("thead");
table.appendChild(thead);

const trHead = document.createElement("tr");
thead.appendChild(trHead);
["osztaly", "mano", "muszak"].forEach(headerText => {
    const th = document.createElement("th");
    th.innerText = headerText;
    trHead.appendChild(th);
});

const tbody = document.createElement("tbody");
tbody.id = "jstbody";
table.appendChild(tbody);

const elves = [
    {what:"logisztika", who1:"Charlie Kirk", shift1:"deleltttos", who2:"Charlie Kirk clone", shift2:"delutanos"},
    {what:"konyveles", who1:"Markus Rühl", shift1:"ejszakai"},
    {what:"jatekfejelesztes", who1:"Brezsnyev", shift1:"delutanos", who2:"Narancslé", shift2:"ejszakai"}
];

initSelect(elves);

function renderTbody(data) {
    tbody.innerHTML = "";
    data.forEach(el => {
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const tdWhat = document.createElement("td");
        tdWhat.innerText = el.what;
        tr.appendChild(tdWhat);

        const tdWho1 = document.createElement("td");
        tdWho1.innerText = el.who1;
        tr.appendChild(tdWho1);

        const tdShift1 = document.createElement("td");
        tdShift1.innerText = el.shift1;
        tr.appendChild(tdShift1);

        if(el.who2 && el.shift2){
            tdWhat.rowSpan = 2;
            const tr2 = document.createElement("tr");
            tbody.appendChild(tr2);

            const tdWho2 = document.createElement("td");
            tdWho2.innerText = el.who2;
            tr2.appendChild(tdWho2);

            const tdShift2 = document.createElement("td");
            tdShift2.innerText = el.shift2;
            tr2.appendChild(tdShift2);
        }
    });
}
renderTbody(elves);

const formElements = [
    {id:"osztaly", label:"osztály", name:"osztaly"},
    {id:"mano1", label:"1", name:"mano1"},
    {id:"muszak1", label:"1", name:"muszak1", type:"select", optionList:[
        {value:"1", label:"delelott"},
        {value:"2", label:"delutan"},
        {value:"3", label:"ejszakai"}
    ]},
    {id:"masodikmano", label:"keto mano", name:"masodikmano", type:"checkbox"},
    {id:"mano2", label:"2", name:"mano2"},
    {id:"muszak2", label:"2", name:"muszak2", type:"select", optionList:[
        {value:"1", label:"delelott"},
        {value:"2", label:"delutan"},
        {value:"3", label:"ejszakai"}
    ]}
];

function createForm(fields) {
    const form = document.createElement("form");
    form.id = "jsform";

    fields.forEach(field => {
        const div = document.createElement("div");

        if(field.type === "checkbox") {
            const input = document.createElement("input");
            input.type = "checkbox";
            input.id = field.id;
            input.name = field.name;
            div.appendChild(input);

            const label = document.createElement("label");
            label.innerText = field.label;
            label.htmlFor = field.id;
            div.appendChild(label);
        }
        else if(field.type === "select") {
            const label = document.createElement("label");
            label.innerText = field.label;
            label.htmlFor = field.id;
            div.appendChild(label);

            const select = document.createElement("select");
            select.id = field.id;
            select.name = field.name;

            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.innerText = "muszak";
            select.appendChild(defaultOption);

            field.optionList.forEach(opt => {
                const option = document.createElement("option");
                option.value = opt.value;
                option.innerText = opt.label;
                select.appendChild(option);
            });

            div.appendChild(select);
        }
        else {
            const label = document.createElement("label");
            label.innerText = field.label;
            label.htmlFor = field.id;
            div.appendChild(label);

            const input = document.createElement("input");
            input.id = field.id;
            input.name = field.name;
            div.appendChild(input);
        }

        form.appendChild(div);
    });

    const btn = document.createElement("button");
    btn.innerText = "hozzaadasd";
    form.appendChild(btn);

    return form;
}

const form = createForm(formElements);
jssection.appendChild(form);
initCheckbox(form.querySelector("#masodikmano"));

form.addEventListener("submit", e => {
    e.preventDefault();

    const osztaly = form.querySelector("#osztaly").value;
    const mano1 = form.querySelector("#mano1").value;
    const muszak1 = mapMuszak(form.querySelector("#muszak1").value);
    const masodik = form.querySelector("#masodikmano").checked;
    const mano2 = form.querySelector("#mano2").value;
    const muszak2 = mapMuszak(form.querySelector("#muszak2").value);

    const newElf = {what: osztaly, who1: mano1, shift1: muszak1};
    if(masodik) {
        newElf.who2 = mano2;
        newElf.shift2 = muszak2;
    }

    createNewElement(newElf, form, elves);
});
