$(function(){
    var display = $("#display");
    var number = "";
    var newNumber = "";
    var newstringreplaced;
    var total=0;

    var buttons = $(":button").not("#equals, #clear, #clearall");
    buttons.on({
        "click":function () {
            newNumber = $(this).text();

            if (!$(this).hasClass("operator")) {
                number += newNumber;
            } else {
                if (isNaN(number[number.length - 1])) {
                    return;
                }
                number += newNumber;
            }

            $(display).text(number);
        }
    });


    //on equals click
    var equals = $("#equals");
    equals.on({
        "click": function () {
            var split = splitStringOnOperators(number);
            for(var i=0; i<split.length; i++){
                console.log(i, split[i], split);
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
                        //don't do anything
                        //break;
                }
            }
        }
    });

    function splitStringOnOperators(num) {
        var splitString = num.replace(/\-/g, ",-,");
        splitString = splitString.replace(/\+/g, ",+,");
        splitString = splitString.replace(/\*/g, ",*,");
        splitString = splitString.replace(/\//g, ",/,");
        newstringreplaced = splitString.split(",");
        removeOperatorsFromEndOfInput(newstringreplaced);

        // console.log("split string", splitString);
        // console.log("new string", newstringreplaced);

        return newstringreplaced;
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

    //on addition click
    function doMath(splitArr, index) {
        var firstNum = parseFloat(splitArr[index-1]);
        var secondNum = parseFloat(splitArr[index+1])
        total = eval( firstNum + splitArr[index] + secondNum );
        splitArr.splice(index-1,index+2);
        splitArr.unshift(total);

        console.log("total", total);
        console.log("split arr after add", splitArr);
    }


    
    //on allclear

    //on clear

});