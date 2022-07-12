//--------------
const Direction = {
	LEFT: 1,
	CENTER: 2,
	RIGHT: 3
};

//randomize array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function fetchPullNumber(position, direction)
{
	if (position < 0 || 5 < position)
	{
		throw 'Invalid position passed ' + position;
	}

	return (position - 1) * 3 + direction;
}

function generateShooting(positions, defaultProgramm)
{
	let shootingPlan = new Array();

	if (positions.length != 6)
	{
		throw 'Invalid number of positions filled';
	}
	let totalCount = 0;
	let shootersCount = 0;

	for (let idx = 0; idx < positions.length; idx++)
	{
		let currentPrg = null;

		if (positions[idx])
		{
			currentPrg = defaultProgramm.slice();
			shuffleArray(currentPrg);
			//increase shooting count
			totalCount += currentPrg.length;
		}

		//store it
		shootingPlan[idx] = currentPrg;
	}

	return [totalCount, shootingPlan];
}
g

//console.log(fetchPullNumber(1, Direction.RIGHT));
function generateProgramm(shooters_positions)
{

	let standartProgramm = new Array();
	standartProgramm = standartProgramm.concat(Array(5).fill(Direction.CENTER));
	standartProgramm = standartProgramm.concat(Array(10).fill(Direction.LEFT));
	standartProgramm = standartProgramm.concat(Array(10).fill(Direction.RIGHT));

	let [launchCount, shootingProgram] = generateShooting( shooters_positions, standartProgramm);
	let shootersCount = parseInt(launchCount / standartProgramm.length);
	let shootingIsDone = false;
	let shootingIdx = 1;
	let currentShootingNumber = shootingProgram.keys().next().value + 1;
	let finalShootingProgram = new Map();

	while(!shootingIsDone)
	{
		for (let idx = 0; idx < shootingProgram.length; idx++)
		{
			const programm = shootingProgram[idx];

			if (programm != null)
			{
				let shooterCurrentShot = parseInt((shootingIdx - 1)/shootersCount) + 1;

				//console.log(`\tidx:${idx}, shooterCurrentShot: ${shooterCurrentShot}, currentShootingNumber:${currentShootingNumber}, pull:`, fetchPullNumber(currentShootingNumber, programm[shooterCurrentShot - 1]));
				programm[shooterCurrentShot - 1] = fetchPullNumber(currentShootingNumber, programm[shooterCurrentShot - 1]);;

				shootingIdx++;
			}

			currentShootingNumber++;

			if (5 < currentShootingNumber)
			{
				currentShootingNumber = 1;
			}
		}

		//console.log('-------');
		if (shootingIdx > launchCount)
		{
			shootingIsDone = true;
		}
	}

	return shootingProgram;
}

	  //generateProgramm([true, false, true, false, false, true]);
