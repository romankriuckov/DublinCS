 let a = ''; //first input
 let b = ''; //second input
 let sign = ''; //matematical operation
 let finish = false; //pressed equals to calculate

 const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; //array of all digits
 const action = ['-', '+', 'X', '/']; //array of all operations

 const out = document.querySelector('.calc-screen p'); //output of number on a calculator screen
 
 //function of clear button to clear the screen
 function clearAll () {      
    let a = '';
    let b = '';
    let sign = '';
    let finish = false;
    out.textContent = 0;
 }
 
 document.querySelector('.clear').onclick = clearAll; //working clear button

 //if click is made outside any button or on clear button
 document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('clear')) return;

    out.textContent = ''; //initial empty screen

    const key = event.target.textContent; //getting the pressed button

    //if pressed button is a digit one
    if(digit.includes(key)) {
        if(b === '' && sign === '') {
            a+=key;
            out.textContent = a; //fill in the variable a
        }
        else if (a!=='' && b!=='' && finish) {
            b = key;
            finish = false;
            out.textContent = b; //fill in the variable b
        }
        else {
            b+= key;
            out.textContent = b;//fill in the variable b
        }
        console.table(a, b, sign);
        return;
    }
    //if pressed operation button
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.table(a, b, sign);
        return;
    }
    //if pressed equals button
    if (key === '=') {
        if (b ==='') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if (b === '0') {
                    out.textContent = 'Error';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        
        }
        finish = true;
        out.textContent = a;
        console.table(a, b, sign);
    }
 }


 
 
    
