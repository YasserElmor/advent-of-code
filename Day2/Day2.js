const fs = require('fs');

//part 1

//the surface_area_calculator function takes length, width, and height respectively and returns the surface area of a given box
function surface_area_calculator(l, w, h){
	let surface_area = 2*l*w + 2*w*h + 2*h*l + Math.min(l*w, h*w, l*h);
	return surface_area;
}

//the aggregate_area_calculator function takes an array of box dimensions arrays [[l, w, h], [l1,w1,h1]...] and returns the aggregate surface area of all boxes
function aggregate_area_calculator(arr){
	let aggregate_area = 0;
	arr.forEach(item => { aggregate_area += surface_area_calculator(item[0], item[1], item[2])})
	return aggregate_area;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//part 2

//the indexed_minimumm_calculator function takes an array of numbers and returns the nth least value
function indexed_minimumm_calculator(arr, n){
	let least;
	for(i = 0; i < n; i++){
		least = Math.min(...arr);
		least_index = arr.indexOf(least);
		arr.splice(least_index, 1);
	}
	return least
}

//the perimeter_calculator function takes the 3 dimensions of a box and calculates its smallest side perimeter
function perimeter_calculator(l, w, h){
	let perimeter = 2*(indexed_minimumm_calculator([l, w, h], 1) + indexed_minimumm_calculator([l, w, h], 2))
	return perimeter;
}

//the volume_calculator function takes the 3 dimensions of a box and calculates its volume
function volume_calculator(l, w, h){
	let volume = l*w*h;
	return volume;
}

//the total_feet_per_box_calculator function takes the 3 dimensions of a box and returns the total feet needed per box
function total_feet_per_box_calculator(l, w, h){
	let total = volume_calculator(l, w, h) + perimeter_calculator(l, w, h);
	return total;
}

//the aggregate_feet_calculator function takes an array of box dimensions arrays [[l, w, h], [l1,w1,h1]...] and returns the aggregate feet needed to wrap all boxes
function aggregate_feet_calculator(arr){
	let aggregate_feet = 0;
	arr.forEach(item => { aggregate_feet += total_feet_per_box_calculator(item[0], item[1], item[2])})
	return aggregate_feet;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


fs.readFile('Day2.txt', 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	data = data.split("\n"); //this gets us an array of box dimensions in the format LxWxH
	let arr = [];
	data.forEach( item => { arr.push(item.split("x").map(i => +i)) } ); //this gets us an array of arrays each containing the 3 dimensions of one box [l, w, h] in numeric form
	console.log(aggregate_area_calculator(arr)); //part 1 solution 1586300
	console.log(aggregate_feet_calculator(arr)); //part 2 solution 3737498

})
