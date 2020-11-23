const fs  = require('fs');

//part 1

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



//the Light constructor holds its on-state as a boolean property and has methods to turn it on, off, or toggle its state
function Light(){
  this.on = false;
  this['turnon'] = function turnon (){
    this.on = true;
  }
  this['turnoff'] = function turnoff(){
    this.on = false;
  }
  this['toggle'] = function toggle(){
    this.on = ! this.on;
  }
}

//the light_array_creator function returns an array of 999 * 999 light objects [0, 0] through [999, 999]
function light_array_creator(light_constructor){
  arr = [];
  for(i = 0; i < 1000; i++){
    arr.push([])
    for(j = 0; j < 1000; j++){
      arr[i].push(new light_constructor);
    }
  }
  return arr;
}


// the command_executor function takes an array of commands, modifies the array of lights using the commands, and returns the new array of lights.
function command_executor(arr, light_constructor){
  command_array = command_array_creator(arr);
  light_array = light_array_creator(light_constructor);
  command_array.forEach( command => {
     cmd = command[0],
     [x1, y1] = command[1],
     [x2, y2] = command[2];

     for( i = x1; i <= x2; i++){
       for( j = y1; j <= y2; j++){
         light_array[i][j][cmd]();
       }
     }
  })
  return light_array
}

// the command_executor function takes an array of commands, applies them to the light grid, and returns the number of on lights
function no_of_on_lights(arr){
  arr = command_executor(arr, Light);
  let on_lights_arr = [];
    for( i = 0; i < 1000; i++){
      for( j = 0; j < 1000; j++){
        if(arr[i][j].on){
          on_lights_arr.push(arr[i][j]);
        }
      }
    }
    let length = on_lights_arr.length;
    return length
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// part 2

//the new Light_2 constructor has a brightness property and 3 methods to increment or decrement the brightness of a light instance
function Light_2(){
  this.brightness = 0;
  this['turnon'] = function turnon (){
    this.brightness += 1 ;
  }
  this['turnoff'] = function turnoff(){
    if(this.brightness > 0){
      this.brightness -= 1;
    }
  }
  this['toggle'] = function toggle(){
    this.brightness += 2 ;
  }
}

function aggregate_brightness(arr){
  arr = command_executor(arr, Light_2);
  let brightness = 0;
  for ( i = 0; i < 1000; i++){
    for( j = 0; j < 1000; j++){
      brightness += arr[i][j].brightness;
    }
  }
  return brightness;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
fs.readFile('Day6.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data = data.split('\n');
  console.log(no_of_on_lights(data)) //part 1 ans 543903
  console.log(aggregate_brightness(data))
})
