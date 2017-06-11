$(function(){
    var display = $("#display");
    var number = "";
    var newNumber = "";
    var total=0;
    var equalsPressed = false;

    var buttons = $(":button").not("#equals, #clear, #clearall");
    buttons.on({
        "click":function () {
            newNumber = $(this).attr('id');

            //TODO allow one decimal
            //TODO CE button

            if(display.text() == "Cannot divide by zero"){
                display.text(' ');
                total = '';
            }

            if ($(this).hasClass("operator")) {
                if (isNaN(number[number.length - 1])) {
                    return;
                }
                if(number.length <= 10){
                    number += newNumber;
                }
            } else {
                if(number.length <= 10) {
                    number += newNumber;
                }
            }

            //allows chaining after totals have been calculated
            if(equalsPressed){
                total += newNumber;
                $(display).text(total);
            }else{
                $(display).text(number);
            }
        }
    });

    //on equals click
    var equals = $("#equals");
    equals.on({
        "click": function () {
            var split = splitStringOnOperators(number);
            for(var i=0; i<split.length; i++){
                // console.log(i, split[i], split);
                switch(split[i]){
                    case '+':
                        doMath(split,i, '+');
                        i=0;
                        break;
                    case '-':
                        doMath(split,i);
                        i=0;
                        break;
                    case '/':
                        doMath(split, i);
                        i=0;
                        break;
                    case '*':
                        doMath(split, i);
                        i=0;
                        break;
                    default:
                        break;
                }
            }
            $(display).text(total);
            equalsPressed = true;
        }
    });

    function splitStringOnOperators(num) {
        var splitString = num.replace(/\-/g, ",-,");
        splitString = splitString.replace(/\+/g, ",+,");
        splitString = splitString.replace(/\*/g, ",*,");
        splitString = splitString.replace(/\//g, ",/,");
        var newStringReplaced = splitString.split(",");
        removeOperatorsFromEndOfInput(newStringReplaced);

        return newStringReplaced;
    }

    function removeOperatorsFromEndOfInput(num) {
        while
        (
            num[num.length-1] == '+' ||
            num[num.length-1] == '-' ||
            num[num.length-1] == '*' ||
            num[num.length-1] == '/' ||
            num[num.length-1] == ''
        )
        {
            num.pop();
        }
    }

    function doMath(splitArr, index) {
        var firstNum = parseFloat(splitArr[index-1]);
        var secondNum = parseFloat(splitArr[index+1])
        total = eval( firstNum + splitArr[index] + secondNum );
        splitArr.splice(index-1,index+2);

        if(total == Infinity){
            total = "Cannot divide by zero";
            number=0;
        }

        splitArr.unshift(total);
    }

    var clearAll = $("#clearAll, #clear");
    clearAll.on({
        "click": function () {
            total = '';
            number = '';
            $(display).text('');
        }
    });


    // var clear = $("#clear");
    // clear.on({
    //     "click": function () {
    //         $(display).text('');
    //     }
    // });
});