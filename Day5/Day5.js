const fs  = require('fs');


//part 1

//the vowel_counter function takes a string and returns the number of vowels that it has
function vowel_counter(str){
  str = str.split("");
  let vowels = ['a', 'e', 'i', 'o', 'u'],
  counter = 0;
  str.forEach(char => {
    if (vowels.includes(char)){
      counter++
    }
  })
  return counter
}

//the has_three_vowels function checks if a string has 3 vowels or more
function has_three_vowels(str){
  if(vowel_counter(str) >= 3){
    return true;
  }
  return false
}


//the duplicate_letter_counter function counts the number of times a letter comes twice in a row through the string
function duplicate_letter_counter(str){
  str = str.split("");
  let counter = 0;
  for ( i = 0; i < str.length; i++){
    if (str[i] === str[i+1]){
      counter ++;
    }
  }
  return counter;
}


//the has has_one_letter_twice_in_a_row function returns true if the string has a duplicate letter e.g. 'aa'
function has_one_letter_twice_in_a_row(str){
  if(duplicate_letter_counter(str) >= 1){
    return true;
  }
  return false;
}

//the doesnt_contain_naughty_strings function takes a string and checks whether it contains any of the naughty_strings defined in the array, and returns true if it doesn't
function doesnt_contain_naughty_strings(str){
  let naughty_strings = ['ab', 'cd', 'pq', 'xy'];
  for( i = 0; i < naughty_strings.length; i++){
    if (str.includes(naughty_strings[i])){
      return false;
    }
  }
  return true;
}

//the is_nice_string function utilises the 3 predefined helper functions to check whether a string is nice or not;
function is_nice_string(str){
  if(has_three_vowels(str) && has_one_letter_twice_in_a_row(str) && doesnt_contain_naughty_strings(str)){ return true;}
  return false;
}

//the number_of_nice_strings function takes an array of strings and a filtering function and returns the number of nice strings in the given array
function number_of_nice_strings(arr, is_nice_function){
  let counter = 0;
  arr.forEach(str => {
    if(is_nice_function(str)){ counter++ }
  })
  return counter;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//part 2

//the pair_creator function takes a string and returns an array of pairs of neighboring characters in the original string
function pair_creator(str){
  let arr = [];
  for( i = 0; i < str.length -1; i++){
      arr.push([str[i], str[i+1]])
  }
  return arr;
}

//the has_pair_that_appears_twice function takes a str and returns true if the string has 2 non-overlapping pair of characters e.g. 'axax' but not 'aaa'
function has_pair_that_appears_twice(str){
  let arr = pair_creator(str),
      counter = 0;

  for (i = 0; i < arr.length -1; i++){
    for(j = i+2; j < arr.length; j++){
      if (arr[i][0] === arr[j][0] && arr[i][1] === arr[j][1] ){
        counter ++;
      }
    }
  }

  return (counter >= 1);
}

//the has_letter_repeated_with_one_letter_in_between function takes a string and checks whether it has a letter repeated with exactly one letter in between e.g. 'xyx'
function has_letter_repeated_with_one_letter_in_between(str){
  let counter = 0;
  for(i = 0; i < str.length; i++){
    if(str[i] === str[i+2]){
      counter ++;
    }
  }
  return (counter >= 1);
}


//the is_nice_part_2 function utilises the 2 predefined helper functions to check whether a string is nice or not;
function is_nice_part_2(str){
  if(has_pair_that_appears_twice(str) && has_letter_repeated_with_one_letter_in_between(str)){ return true;}
  return false;
}



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fs.readFile('Day5.txt', 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
  data = data.split('\n');
  console.log(number_of_nice_strings(data, is_nice_string)); //part 1 answer 238
  console.log(number_of_nice_strings(data, is_nice_part_2)); //part 2 answer 69
})
