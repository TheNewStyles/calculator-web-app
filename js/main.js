$(function(){
    var $clearAll = $("#clearAll, #clear");
    var $equals = $("#equals");
    var $numButtons = $(":button").not("#equals, #clear, #clearall");
    var _infix = "";
    var _displayString = "";
    var opsArr = ["*", "/", "+", "-"]

    $numButtons.on({
        "click":function () {
            var number = $(this).attr('id')

            if ($(this).hasClass("operator")) {
                if ( opsArr.includes(_infix[_infix.length - 1]) && _infix[_infix.length - 1] !== "(" && _infix[_infix.length - 1] !== ")") {
                    return;
                }
                _infix += number;
            }else {
                _infix += number;
            }

            htmlEntities(_infix);

            $(display).html(_displayString);
        }
    });

    $equals.on({
        "click": function () {

            var postfix = toPostFix(_infix);
            postfix = postfix.split(" ");
            postfix.clean("");

            var rpn = evalRPN(postfix);

            $(display).text(rpn);
            _infix = rpn;
            _displayString = rpn;
        }
    });

    $clearAll.on({
        "click": function () {
            $(display).text("");
            _displayString = "";
            _infix = "";
        }
    });

    function htmlEntities(str) {
        _displayString = str.replace(/\*/g, '&times;').replace(/-/g, '&minus;').replace(/\+/g, '&plus;');
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

        while(count < infixStr.length){
            if(isOperand(infixStr[count])) {
                postfixStr += infixStr[count];
            } else {
                postfixStr += " ";
                if(infixStr[count] !== '(' && infixStr[count] !== ")"){
                    while(stack.length > 0){
                        if(prec(stack[stack.length-1]) >= prec(infixStr[count])){
                            postfixStr += stack.pop();
                        } else {
                            break;
                        }
                    }
                    stack.push(infixStr[count]);
                } else {
                    if(infixStr[count] === "("){
                        stack.push(infixStr[count]);
                    } else {
                        while(stack[stack.length-1] !== '(' && stack[stack.length-1] !== undefined){
                            postfixStr += stack.pop();
                        }
                        stack.pop();
                    }
                }
            }
            count++;
        }
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
                var a = parseFloat(stack.pop());
                var b = parseFloat(stack.pop());
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

        var returnValue = parseFloat(stack.pop());

        return returnValue;
    }

    function isOperand(ch) {
        return !(opsArr.includes(ch));
    }

});