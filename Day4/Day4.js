const fs  = require('fs'),
      md5 = require('md5') ;


//we need to find the lowest decimal number that should be added to the given input (secret key) so that when we MD5 hash it we get a hash starting with 5 zeroes for part 1 and 6 zeroes for part 2


//the decimal_finder function takes a secret_key that when concatenated with a certain decimal and hashed using MD5 hashing, produces a hex output starting with hash_start
//and returns the desired decimal that'd be concatenated to the secret_key
function decimal_finder(secret_key, hash_start){
  let decimal;
  for(i = 0; i < Infinity; i++){
    if(md5(secret_key.concat(i)).slice(0, hash_start.length) === hash_start){
      decimal = i;
      break;
    }
  }
  return decimal;
}


fs.readFile('Day4.txt', 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
  console.log(decimal_finder(data, '00000')); //part 1 answer 254575
  console.log(decimal_finder(data, '000000')); //part 2 answer 1038736

})
