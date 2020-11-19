const fs  = require('fs');


//the command extractor function takes a string and returns an array containing the command, the starting point, and the ending point
function command_extractor(str){

//breaking down the string at each space
  arr = str.split(' ');
  let command   = [],
  //defining the positions of the first and second co-ordinates
  index         = arr.indexOf('through'),
  first         = arr[index - 1],
  second        = arr[index + 1];

//pushing the command (the words before the first number) to the command array
  for( i = 0; i < arr.length; i++){
    if (!parseInt(arr[i])){
      command.push(arr[i]);
    }
    else{
      break;
    }
  }
//re-joining the command to a string
  command = command.join('');
//reshaping the co-ordinates string into an array of numbers; [x,y]
  first   = first.split(',').map(i => +i);
  second  = second.split(',').map(i => +i);

  return [command, first, second]; //if 'turn off 812,389 through 865,874' was given as input, it would return [ 'turnoff', [ 812, 389 ], [ 865, 874 ] ]
}



//the command_array_creator function takes an array of strings and returns an array of commands
function command_array_creator(arr){
  let new_arr = [];
  arr.forEach(str => {
    new_arr.push(command_extractor(str));
  })
  return new_arr;
  //if ['turn off 812,389 through 865,874', 'toggle 205,417 through 703,826'] was given as input
  //the function would return [ [ 'turnoff', [ 812, 389 ], [ 865, 874 ] ], [ 'toggle', [ 205, 417 ], [ 703, 826 ] ] ]
}

fs.readFile('Day6.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data = data.split('\n');
  console.log(command_array_creator(data));
})
