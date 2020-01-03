const chalk = require('chalk')

const wsic = require('./modules/wsic')

const INTRO = [
	'                                           ',
	'                                           ',
	' _                                       _ ',
	'| |                                     | |',
	'| |__  _   _    __   _____  ___ _______ | |',
	"| '_ \\| | | |   \\ \\ / / __|/ _ \\_  / _ \\| |",
	'| |_) | |_| |    \\ V /\\__ \\  __// / (_) | |',
	'|_.__/ \\__, |     \\_/ |___/\\___/___\\___/|_|',
	'        __/ |                              ',
	'       |___/                               ',
	'                                           ',
	'                                           ',
	'                                           '
]

console.log(chalk.white.bold(INTRO.join('\n')))

const arguments = process.argv

if (arguments.length <= 2) {
	console.log(
		chalk.red(
			'You need to run this app with arguments.\n' +
				"Run this app '--help' for more info"
		)
	)
} else if (arguments[2] === '--help') {
	console.log(
		chalk.green.bold('Arguments:\n') +
			chalk.green(
				'    --update X     --    Update mode, where X is the time in ms.\n'
			) +
			chalk.green('    --no-update    --    Without updating.')
	)
} else if (arguments[2] === '--no-update') {
	if (arguments[3]) {
		console.log(
			chalk.red('More arguments than necessary.\n') +
				chalk.red('Please run this app using --help')
		)
	} else {
		setTimeout(() => console.log('\x1Bc'), 1000)
		setTimeout(() => wsic(false, undefined), 1001)
	}
} else if (arguments[2] === '--update') {
	if (isNaN(arguments[3])) {
		console.log(
			chalk.red('Delay is not a number.\n') +
				chalk.red(
					'Please enter the number or run this app using --help.'
				)
		)
	} else {
		setTimeout(() => console.log('\x1Bc'), 1000)
		setTimeout(() => wsic(true, parseInt(arguments[3])), 1001)
	}
}
