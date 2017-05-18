$(function(){
    var display = $("#display");
    var number = "";
    var newNumber = "";

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

        }
    });

    //on addition click
    var addition = $("#addition");
    addition.on({
        "click": function () {
            
        }
    });

    //on subtraction click
    var subtraction = $("#subtraction");
    subtraction.on({
        "click": function () {
            //do subtraction
        }
    })

    //on multiplication click
    var multiplication = $("#multiplication");
    multiplication.on({
        "click": function () {
            //do multiplication
        }
    })

    //on allclear

    //on clear

});