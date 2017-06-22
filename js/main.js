$(function(){
    var $display = $("#display");
    //var $clearAll = $("#clearAll, #clear");
    var $equals = $("#equals");
    var $numButtons = $(":button").not("#equals, #clear, #clearall");
    var _infix = '';
    var _displayString = '';

    $numButtons.on({
        "click":function () {
            var number = $(this).attr('id')

            if ($(this).hasClass("operator")) {
                if (isNaN(_infix[_infix.length - 1])) {
                    return;
                }
                if(_infix.length <= 10){
                    _infix += number;
                }
            }else {
                if(_infix.length <= 10) {
                    _infix += number;
                }
            }

             function htmlEntities(str) {
                 _displayString = str.replace(/\*/g, '&times;').replace(/-/g, '&minus;').replace(/\+/g, '&plus;');
            }

            htmlEntities(_infix);

            $(display).html(_displayString);// .text(_displayString);
        }
    });

    $equals.on({
        "click": function () {

            var postfix = toPostFix(_infix);
            //var htmlEntities = htmlEntities(postfix);

            postfix = postfix.split(" ");
            postfix.clean("");

            var rpn = evalRPN(postfix);

            $(display).text(rpn);
        }
    });

    function htmlEntities(str) {
        return str.replace(/&times;/g, '*'); //.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    Array.prototype.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };

    function toPostFix(infixStr) {
        var count =0;
        var postfixStr = "";
        var stack = [];

        //loop through the length of the infix string
        while(count < infixStr.length){
            //check of it is operand or not
            if(isOperand(infixStr[count])) {
                postfixStr += infixStr[count];
            } else {
                postfixStr += " ";
                //if operator is other than ( )
                if(infixStr[count] !== '(' && infixStr[count] !== ")"){
                    while(stack.length > 0){
                        //Till the time stack's top operator greater than equal to infixStr operator than add to postfixStr else break
                        if(prec(stack[stack.length-1]) >= prec(infixStr[count])){
                            postfixStr += stack.pop();
                        } else {
                            break;
                        }
                    }
                    //push the current infixStr operator to stack
                    stack.push(infixStr[count]);
                } else {
                    //if infixStr operator is ( than simply push it to stack
                    if(infixStr[count] === "("){
                        stack.push(infixStr[count]);
                    } else {
                        //if infixStr operator is ) than push all the elements from stack to postfixStr till we get ( from stack
                        while(stack[stack.length-1] !== '(' && stack[stack.length-1] !== undefined){
                            postfixStr += stack.pop();
                        }
                        stack.pop();
                    }
                }
            }
            count++;
        }

        //Adding the rest of the operand in stack to postfix string
        while(stack.length > 0){
            postfixStr += " ";
            postfixStr += stack.pop();
        }
        return postfixStr;
    }

    function prec(operator) {
        switch (operator){
            case "^":
                return 3;
            case "*":
            case "/":
                return 2;
            case "+":
            case "-":
                return 1;
            default:
                return 0;
        }
    }

    function evalRPN(tokens) {
        var operators = "+-*/";

        var stack = [];
        for (var i=0; i<tokens.length; i++) {
            if (operators.indexOf(tokens[i]) == -1) {
                stack.push(tokens[i]);
            } else {
                var a = parseInt(stack.pop());
                var b = parseInt(stack.pop());
                switch (tokens[i]) {
                    case "+":
                        stack.push(a + b);
                        break;
                    case "-":
                        stack.push(b - a);
                        break;
                    case "*":
                        stack.push(a * b);
                        break;
                    case "/":
                        stack.push(b / a);
                        break;
                }
            }
        }

        var returnValue = parseInt(stack.pop());

        return returnValue;
    }

    function isOperand(ch) {
        return ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <='Z') || (ch >= 0 && ch <= 9));
    }

});