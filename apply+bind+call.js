//call用法：
//obj.func.call(test,arg1,arg2,...) => 让test调用obj的func方法
Function.prototype.myCall = function (context) {

	//如果context没有传值或者传值为空，则指向window
	context = context || window;
	//使用context.fn保存当前调用mycall的方法，为了之后能以对象调用的方式绑定this
	context.fn = this;
	console.log(Object.keys(arguments))
	//从第二位之后截取需要传入fn的参数
	let args = [...arguments].slice(1)
	//调用fn
	context.fn(...args);
	//删掉方法，避免污染传入的对象（方法被添加到该对象）
	delete context.fn;
}

//apply用法：
//obj.func.call(test,[args]) => 让test调用obj的func方法
Function.prototype.myApply = function (context) {
	context = context || window;
	context.fn = this;
	let args = arguments['1'];
	console.log(args);
	if(args){
		//如果不使用...扩展运算符，可以使用eval()函数
		eval(`context.fn(${args})`);
	}else{
		context.fn();
	}
	delete context.fn;
}

//bind用法：
//obj.fn.bind(test,arg1,arg2)() 或者 let func = obj.fn.bind(test,arg1); func(arg2) （柯里化传参）
//返回的是一个绑定this的函数，不立即执行
Function.prototype.myBind = function(context){
	context = context || window;
	context.fn = this;
	//args类型: Array
	var args = [...arguments].slice(1);
	return function(){
		let newArgs = [...arguments];
		return context.fn.apply(context,args.concat(newArgs));
	}
}

let Person = {
            name: 'Tom',
            say(age,yesr) {
                console.log(`我叫${this.name}我今年${age},我喜欢${yesr}岁的女人`)
            }
        }

let mary = {
            name: 'mary'
        }

let suc = Person.say.myBind(mary,18)
suc(45)