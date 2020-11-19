const fs = require('fs');

//step_counter is a helper function used to increment or decrement the floor level based on the shape of the parantheses
function step_counter(step, counter){
		if(step === '('){
			counter ++;
		}
		else if(step === ')'){
			counter --;
		}
		return counter;
}


//part 1

// the floor_finder function takes an array of opening and closing parantheses and returns the aggregate of their values where the opening is +1 and the closing is -1
function floor_finder(steps){
	let counter = 0;
	steps.forEach( step => {
		counter = step_counter(step, counter);
	})
		return counter;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//part 2

//the char_position_finder function takes an array of opening & closing parantheses and a base, calculates the aggregate, and finds the position of the char where we first hit the base
function char_position_finder(steps, base){
	let counter = 0,
			position;
		// "arr.some" is used instead of "arr.forEach" so we can break out of the loop as soon as we find the position we're searching for
		steps.some( (step, i) => {
		counter = step_counter(step, counter);
		if(counter === base) {
			position = i+1;
			return true;
		}
	})
		return position || "Santa Never Reaches the Base";
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fs.readFile('Day1.txt', 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	data = data.split('');
	console.log(floor_finder(data)); //part 1 -- solution is 280
	console.log(char_position_finder(data, -1)); //part 2 -- solution is 1797
})
