const fs = require('fs');

//we're simulating a logic circuit taking input as a string formatted in (input -> output) format such as (x -> y), (NOT x -> y),  (x >> 2 -> y), (x AND y -> z)
let op_obj = {
  'AND'    : '&',
  'OR'     : '|',
  'NOT'    : '~',
  'LSHIFT' : '<<',
  'RSHIFT' : '>>'
}

//takes a string in the form ( x AND y -> z) and returns it in a valid js format ( z = x & y)
function string_reformatter(str){
  let arr  = str.split(/\s+/),
      arrow_index = arr.indexOf('->'),
      input = arr.slice(0, arrow_index);
      input.some((item) => {
        if(op_obj[item]){
          op = input.indexOf(item);
          input[op] = op_obj[item];
          return true;
        }
      })
  let new_str = `${arr[arrow_index +1]} = ${input.join(' ')}`;
  return new_str;
}

//takes an array of unordered data and returns them ordered based on the dependency of the variables
function sequence_handler(arr){
  let op_arr = Object.values(op_obj); // an array containing all the operators defined in the op_obj
      defined_vars_array = [],
      sorted_array = [],
      reshaped_array =  arr.map((str, i) => {
                          obj = {
                            equation: str,
                            left_side: str.slice(0, str.indexOf('=') - 1),
                            right_side: str.slice(str.indexOf('=') + 2)
                          }
                          op_arr.some((op, i) => {
                            if (obj.right_side.includes(op)){
                              obj.vars_arr = obj.right_side.split(op).filter(e => e);
                              obj.op = op;
                              return true;
                            }
                            if(i === op_arr.length -1){
                              obj.vars_arr = [obj.right_side]
                            }
                          })
                          obj.vars_arr = obj.vars_arr.map(e => e.trim());
                          return obj;
                        }),
      validity_checker = (variable) => {
    return (defined_vars_array.includes(variable) || Number.isInteger(parseInt(variable)))
  }

do{

  reshaped_array.some(obj=>{
    if(obj.vars_arr.every(variable => validity_checker(variable))){
      defined_vars_array.push(obj.left_side);
      sorted_array.push(obj);
      delete reshaped_array[reshaped_array.indexOf(obj)];
    }
  })
}while(arr.length !== sorted_array.length)


  //handling the NOT operator equations
  sorted_array.forEach(obj => {
    if(obj.op === '~'){
      obj.equation = obj.left_side.concat(' = 2**16 + ', obj.right_side)
    }
  })
  return sorted_array;

}


fs.readFile('Day7.txt', 'utf8', (err, data) => {
  if(err){
    console.error(err)
    return;
  }
  data = sequence_handler(data.split('\n').map(string_reformatter));
  // data.forEach(obj => eval(obj.equation))//the code breaks at index 120 of the sorted_array because of a variable named do which is a reserved word in JS
  console.log(data)
})
