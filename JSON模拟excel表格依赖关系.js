//输出D E C F B A
var test = {"A":["B","C"],"B":["D","C","F"],"C":["E"],"D":[],"E":["D"],"F":["E","C"]}
function parseTable(test){
    var all = [];
    var result = [];
    for(let key in test){
        all.push(key);
    }
    var length = all.length;
    for(let i = 0; i < length; i++){
        for(let key in test){
            if(compareArr(result, test[key])){
                result.push(key);
                delete test[key];
            }
        }
    }
    console.log(result);
}
function compareArr(arr1, arr2){

    var temp = {};
    for(let i of arr1){
        temp[i] = 1;
    }
    //bconsole.log(temp);
    for(let i of arr2){
        if(temp[i]!=1){
            return false;
        }
    }
    return true;
}
parseTable(test);