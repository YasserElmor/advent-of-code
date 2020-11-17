const fs = require('fs');


//part1

//the direction_translator function takes the new direction and the previous coordinates where it modifies and sets the coordinates accordingly and returns the new coordinates
function direction_translator(direction, x, y){
		if(direction === '>') {x++;}
		else if(direction === '<') {x--;}
		else if(direction === '^') {y++;}
		else if(direction === 'v') {y--;}
		return [x,y];
}
//the coordinate_exists function takes an array of coordinates and a coordinate and checks whether it already exists in it
function coordinate_exists(arr, coordinate){
	hash = {}; //the hash is used since arrays can't be compared for equality and would always return false
	arr.forEach((val, i) => {
		hash[val] = i;
	})
	return hash.hasOwnProperty(coordinate);
}

//the coordinate_checker function utilises the direction_translator and the coordinate_exists functions to handle the incoming data
function coordinate_checker(direction, searching_array, pushing_array, x, y){
		[x, y] = direction_translator(direction, x, y);
		if(!coordinate_exists(searching_array, [x, y])) {pushing_array.push([x, y])};
		return [x, y, pushing_array];
}

//the coordinate_setter function takes an array of directions, translates it into coordinates, craetes an array of unique coordinates, and returns it
function coordinate_setter(directions_array){
	let [x, y] = [0, 0];
	let arr = [[x, y]];
	directions_array.forEach(direction => {
		[x, y, arr] = coordinate_checker(direction, arr, arr, x, y);
	})
	return arr;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//part 2

//the alternating_coordinate_setter function provides the same functionality as the coordinate_setter but handling two different data sets alternatingly
function alternating_coordinate_setter(directions_array){
	let [x1, y1] = [0, 0],
		[x2, y2] = [0, 0],
		santa_array = [[x1, y1]],
		robo_santa_array = [[x2, y2]],
		arr;
		directions_array.forEach((direction, i) => {
			arr = santa_array.concat(robo_santa_array);
			//a joined array of both arrays used to confirm that the new coordinate exists in neither data set
			if (i % 2 === 0){
				[x1, y1, santa_array] = coordinate_checker(direction, arr, santa_array, x1, y1);
			}
			else if (i % 2 !== 0){
				[x2, y2, robo_santa_array] = coordinate_checker(direction, arr, robo_santa_array, x2, y2);
			}
		})
		let total = santa_array.length + robo_santa_array.length -1;
		return total;
}







//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


fs.readFile('Day3.txt', 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	data = data.split("");
	// console.log(coordinate_setter(data).length); //part 1 answer 2592
	console.log(alternating_coordinate_setter(data)); //part 2 answer 2592

})
