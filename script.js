$(function() { //using jquery and have multiple functions in one click format from 484 assignment 
    
    let expression = '';

    $('.number, .operator').on("click", function () {                   //for number buttons and the +-*/ operators
        const value = $(this).data('value');                            //adds them into the expression input in index.html
        expression += value;
        updateExpression();
    });

    $('.clear').on("click", function () {
        expression = '';                                                //replaces expression with empty string
        updateExpression();                                             //shows empty string in input
    });

    $('.backspace').on("click", function () {
        expression = expression.slice(0, -1);                           //using slice, takes one char off string
        updateExpression();
    });

    $('.equals').on("click", function () {
        try {
        let myExpression = expression
            .replace(/x/g, '*')                                         //fixes html symbols for js math expressions
            .replace(/÷/g, '/')
            .match(/(\d+|\+|\-|\*|\/)/g);

        expression = calculate(myExpression).toString();                //uses my defined function calculate
        $('.expression').val(expression);

        } catch (e) {                                                   //error handling
            expression = "Error";
            $('.expression').val(expression);
        }
    });

    function calculate(myExpression) {
        let values = [];
        let ops = [];

        const precedence = {                                            //set precedence for PEMDAS
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };

        function applyOp() {                                            //function in function to cut expression
            const b = values.pop();                                     //into smaller expressions with only two
            const a = values.pop();                                     //values and an operator
            const op = ops.pop();

            if (op === '+') values.push(a + b);                         //evaluate small expression and push back into values
            if (op === '-') values.push(a - b);
            if (op === '*') values.push(a * b);
            if (op === '/') values.push(a / b);
        }

        for (let i = 0; i < myExpression.length; i++) {                 //loop to push numbers into values
            let t = myExpression[i];                                    //and operators into ops 

            if (!isNaN(t)) {                                            //check for numbers, else it's an operator
                
                values.push(Number(t));                                 //change char/string to number value

            } else {

                while (ops.length && precedence[ops[ops.length - 1]] >= precedence[t]) {       //find greater precedence expressions
                    applyOp();
                }

                ops.push(t);
            }
        }

        while (ops.length) applyOp();                                   //check for remaining low precedence expressions 

        return values[0];                                               //values should only have one number left (answer)
    }

    function updateExpression(){
        $('.expression').val(expression);                               //put expression string into html input
    }
})


