const shell = require('shelljs')
const args = process.argv.slice(2)
const getREregistry = require('./getREregistry')
const getPIregistry = require('./getPIregistry')
const getPI = require('./getPI')
const contractLoan = require('./contractLoan')
const getLoans = require('./getLoans')
const getBanks = require('./getBanks')
const createPI = require('./createPI')
const createRE = require('./createRE')
const contractInsurance = require('./contractInsurance')
const getInsurances = require('./getInsurances')
const buyRealEstate = require('./buyRealEstate')
const getREAgents = require('./getREAgents')
const getNotaries = require('./getNotaries')

// get first argument
let arg = args.shift()
let realEstateId, duration, bankId, privateId, address, insuranceId

switch( arg ){
	case 'getAllRE':
		shell.exec('node getREregistry.js')
		process.exit()
		break
	case 'getAllPI': 
		shell.exec('node getPIregistry.js')
		process.exit()
		break
	case 'getREAgents':
		shell.exec('node getREAgents.js')
		process.exit()
		break
	case 'getInsurances':
		shell.exec('node getInsurances.js')
		process.exit()
		break
	case 'getNotaries': 
		shell.exec('node getNotaries.js')
		process.exit()
		break
	case 'getPI':
		const id = args.shift()
		shell.exec(`node getPI.js ${id}`)
		process.exit()
		break
	case 'getLoans':
		shell.exec('node getLoans.js')
		process.exit()
		break
	case 'getBanks':
		shell.exec('node getBanks.js')
		process.exit()
		break
	case 'createPI':
		privateId = args.shift()
		let name = args.shift()
		address = args.shift()
		let balance = args.shift()
		shell.exec(`node createPI.js ${privateId} ${name} ${address} ${balance}`)
		process.exit()
		break
	case 'createRE':
		let reId = args.shift()
		address = args.shift()
		let reSquareMeters = args.shift()
		let price = args.shift()
		let ownerId = args.shift()
		shell.exec(`node createRE.js ${reId} ${reAddress} ${reSquareMeters} ${price} ${ownerId}`)
		process.exit()
		break
	case 'contractLoan':
		let debtorId = args.shift()
		let bankId = args.shift()
		realEstateId = args.shift()
		let insterestRate = args.shift()
		duration = args.shift()
		shell.exec(`node contractLoan.js ${debtorId} ${bankId} ${realEstateId} ${insterestRate} ${duration}`)
		process.exit()
		break
	case 'contractInsurance':
		let insuredId = args.shift()
		insuranceId = args.shift()
		realEstateId = args.shift()
		cost = args.shift()
		duration = args.shift()
		shell.exec(`node contractInsurance.js ${insuredId} ${insuranceId} ${realEstateId} ${cost} ${duration}`)
		process.exit()
		break
	case 'buyRealEstate':
		let buyer = args.shift()
		let seller = args.shift()
		realEstateId = args.shift()
		let loan = args.shift()
		let realEstateAgent = args.shift()
		let notary = args.shift()
		insuranceId = args.shift()
		shell.exec(`node buyRealEstate.js ${buyer} ${seller} ${realEstateId} ${loan} ${realEstateAgent} ${notary} ${insuranceId}`)
		process.exit()
		break
	default:
		console.log('Wrong argument')
		process.exit()
		break
}

shell.exec('node index.js')