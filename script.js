function calculateNetSalary(grossSalary) {
   return parseInt(grossSalary * 0.45);
}

function sumSalaries(salaries) {
    let sum = 0;
    for(let i = 0; i<salaries.length; i++){
        sum+=salaries[i];
    }
    return sum;
}

function inputToNumber(elementID) {
    let inp = document.getElementById(elementID);
    let val = parseInt(inp.value)

    if (isNaN(val)){
        return 0;
    }
    return val;
}

function capitalizeFirstLastName(text1, text2) {
    let txt1 = text1[0].toUpperCase() + text1.substring(1);
    let txt2 = text2[0].toUpperCase() + text2.substring(1);;
    let final = txt1 + " " + txt2;
    return final;
}

function sumSubsetSalaries(allSalaries, start, end) {
    let sum=0;
    for(let i = start -1; i<end; i++){
        sum+=allSalaries[i];
    }
    return sum;
}

function getHighestSalary(list) {
    let max = 0;
    for(let i = 0; i<=list.length; i++){
        if(list[i] > max){
            max = list[i];
        }
    }
    return max;
}

function getMatchingPersons(employees, find) {
    let str = [];
    for(let i = 0; i<employees.length; i++){
        if(employees[i].includes(find)){
            str.push(employees[i]);
        }
    }
    return str;
}

function isValideNumber(input) {
    if(input.indexOf(".") === input.length-1){
        return false; 
    }   
    if( input.indexOf("+") > 0){
        return false;
    }   
    if( input.indexOf("-") > 0){
        return false;
    }  
    

    let allowedCharacters = "1234567890+-.";
    
    for(let i=0; i<input.length; i++){
        if(allowedCharacters.indexOf(input[i]) === -1){
            return false;
        }
    }

    return true;
}

function isValideEmail(text) {
    
    let foundAt = 0;
    let foundDot = 0;
    let atPosition = text.indexOf("@");
    let subText = text.substring(atPosition);


//@- symbol
    for(let i = 0; i<text.length; i++){
        if(text[i]==="@"){
            foundAt++
            if(i===0){
                return "Missing username"
            }   else if(i=== text.length-1){
                return "Missing domain"
            }
        }
    }
    if(foundAt >1){
        return "Can only have 1 '@' symbol";
    }   else if(foundAt<1){
        return "Missing @ Symbol";
    }
// .-symbol

    for(let i =0; i<subText.length; i++){
        if(subText[i]==="."){
            foundDot++;
            if(i===1){
                return "Missing domain name before '.'";
            } else if(i===subText.length-1){
                return "Missing domain after '.'";
            }
        }
    }
    if(foundDot>1){
        return "Can only have 1 '.' symbol";
    } else if( foundDot<1){
        return "Missing '.' symbol";
    }

    return "Valid email";
}

document
    .getElementById("compute-gross-salary")
    .addEventListener("click", (e) => {
        e.preventDefault();

        let salary = inputToNumber("gross-salary");

        const rez = document.getElementById("result-gross-salary");
        rez.innerText = calculateNetSalary(salary);
    });

document.getElementById("compute-number-sum")
        .addEventListener("click", (e) => {
            e.preventDefault();
            let input = [];
            
            for (let i = 1; i <= 5; i++) {
                input.push(inputToNumber("number-" + i));
            }
            
            document.getElementById("number-sum").innerText = sumSalaries(input);
        });

document
    .getElementById("compute-salary-index")
    .addEventListener("click", (e) => {
        e.preventDefault();
        let from = inputToNumber("index-1");
        let until = inputToNumber("index-2");

        let salaries = [];
        for (let i = 1; i < 11; i++) {
            let row = document.getElementsByTagName("tr")[i];
            let value = row.getElementsByTagName("td")[1];
            value = value.innerText;
            salaries.push(parseInt(value));
        }

        document.getElementById("result-salary-index").innerText = sumSubsetSalaries(salaries, Math.min(from, until), Math.max(from, until));
    });

document.getElementById("capitalize").addEventListener("click", (e) => {
    e.preventDefault();

    let text1 = document.getElementById("to-capitalize-1").value;
    let text2 = document.getElementById("to-capitalize-2").value;

    document.getElementById("result-to-capitalize").innerText = capitalizeFirstLastName(
        text1,
        text2
    );
});

document
    .getElementById("compute-is-a-number")
    .addEventListener("click", (e) => {
        e.preventDefault();
        let text = document.getElementById("is-a-number").value;
        let rez = document.getElementById("result-is-a-number");

        if (isValideNumber(text)) {
            rez.innerText = "Valid number";
        } else {
            rez.innerText = "Not a number";
        }
    });

document.getElementById("compute-is-email").addEventListener("click", (e) => {
    e.preventDefault();
    let text = document.getElementById("is-email").value;
    let rez = document.getElementById("result-is-email");

    rez.innerText = isValideEmail(text);
});

document.getElementById("compute-find-max").addEventListener("click", (e) => {
    e.preventDefault();
    let list = [];

    for (let i = 1; i < 6; i++) {
        list.push(inputToNumber("find-max-" + i));
    }

    document.getElementById("result-find-max").innerText = getHighestSalary(list);
});

document
    .getElementById("compute-contains-filter")
    .addEventListener("click", (e) => {
        e.preventDefault();

        let list = [];
        let max = document.getElementsByClassName('list-group')[0].children.length
        for (let i = 0; i<max; i++) {
            list.push(document.getElementsByClassName('list-group')[0].children[i].innerText)
        }
        let filtered = getMatchingPersons(
            list,
            document.getElementById("contains-filter").value
        );

        let out = "";
        for (let i = 0; i < filtered.length; i++) {
            out += '<li class="list-group-item">' + filtered[i] + "</li>";
        }

        document.getElementById("contains-output").innerHTML = out;
    });

