const os = require('os'),
	fs = require('fs'),
	chalk = require('chalk')

const getSysInfo = () => {
	const cpu = os.cpus()
	const cpu_model = os.cpus()[0].model + ''
	const upt = os.uptime()
	const hs = parseInt(upt / 3600)
	const ms = parseInt((upt - hs * 3600) / 60)
	const sc = upt - hs * 3600 - ms * 60
	return {
		static: {
			platform: os.platform(),
			architechture: os.arch(),
			processor: {
				model: cpu_model
					.split(' ')
					.slice(0, -4)
					.join(' '),
				frequency: cpu_model
					.split(' ')
					.slice(-1)
					.join(),
				cores: 'x' + cpu.length
			},
			'Total Memory': parseInt(os.totalmem() / Math.pow(1024, 2)) + ' Mb'
		},
		dinamic: {
			'Free Memory': parseInt(os.freemem() / Math.pow(1024, 2)) + ' Mb',
			'Up Time': `${hs} h ${ms} m ${sc} s`
		}
	}
}

const printSysInfo = info => {
	console.log('\n' + chalk.green.underline.bold('Static:') + '\n')
	console.log(
		'    ' +
		chalk.bgGreen.black(`Platform:`) +
		' ' +
		chalk.green(`${info.static.platform}`)
	)
	console.log(
		'    ' +
		chalk.bgGreen.black(`Architechture:`) +
		' ' +
		chalk.green(`${info.static.architechture}`)
	)
	console.log('    ' + chalk.bgGreen.black(`Processor:`))
	console.log(
		'        ' +
		chalk.bgRed.black(`Model:`) +
		' ' +
		chalk.green(`${info.static.processor.model}`)
	)
	console.log(
		'        ' +
		chalk.bgRed.black(`Frequency:`) +
		' ' +
		chalk.green(`${info.static.processor.frequency}`)
	)
	console.log(
		'        ' +
		chalk.bgRed.black(`Cores:`) +
		' ' +
		chalk.green(`${info.static.processor.cores}`)
	)
	console.log(
		'    ' +
		chalk.bgGreen.black(`Total Memory:`) +
		' ' +
		chalk.green(`${info.static['Total Memory']}`)
	)
	console.log(
		'\n' +
		chalk.green.bold('---------------') +
		chalk.blue.bold('---------------')
	)
	console.log('\n' + chalk.blue.underline.bold('Dinamic:') + '\n')
	console.log(
		'    ' +
		chalk.bgBlue.white(`Free Memory:`) +
		' ' +
		chalk.white(`${info.dinamic['Free Memory']}`)
	)
	console.log(
		'    ' +
		chalk.bgBlue.white(`Up Time:`) +
		' ' +
		chalk.white(`${info.dinamic['Up Time']}`)
	)
}

const writeSysInfoInConsole = (isUp, delay) => {
	const getPromise = new Promise((res, rej) => {
		res(getSysInfo())
	})
		.then(info => {
			return new Promise((res, rej) => {
				res(printSysInfo(info))
			})
		})
		.then(() => {
			return new Promise((res, rej) => {
				if (isUp) {
					setTimeout(() => {
						console.log('\x1Bc')
						res()
					}, delay)
				} else {
					rej()
				}
			})
		})
		.then(() => {
			writeSysInfoInConsole(isUp, delay)
		})
		.catch(err => {
			console.log()
		})
}

module.exports = writeSysInfoInConsole