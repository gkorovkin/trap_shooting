//--------------
const Direction = { LEFT: 1, CENTER: 2, RIGHT: 3 };

//randomize array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const machineBin = [ Direction.LEFT, Direction.LEFT, Direction.CENTER, Direction.RIGHT, Direction.RIGHT ];

//@param startingPosition - from 0 to 5 - possible starting position
function generateProgramm(startingPosition)
{
	var numbersPull = [ machineBin.slice(), machineBin.slice(), machineBin.slice(), machineBin.slice(), machineBin.slice() ];

	//now shuffle within numbers
	for (let idx = 0; idx < numbersPull.length; idx++) {
		shuffleArray(numbersPull[idx]);
	}	

	let programm = new Array();
	
	//now generate whole programm
	for (let idx = 0; idx < 25; idx++)
	{
		let currentIteration = parseInt(idx / 5);
		let currentPosition = (idx + startingPosition) % 5;
		programm.push(currentPosition * 3 + numbersPull[currentPosition].pop());
	}

	return programm;
}

function buildShootingPlan(positions)
{
	if (positions.length != 6)
	{
		throw 'Invalid number of positions filled';
	}

	let shootingPlan = new Map();

	for (let idx = 0; idx < positions.length; idx++)
	{
		shootingPlan.set(idx, positions[idx] ? generateProgramm(idx) : null);
	}

	return shootingPlan;
}
			
//--------------
