const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection
const Table = require('cli-table2')

const getBanks = (async function(){
	try {
		this.bizNetworkConnection = new BusinessNetworkConnection()
		let connection = await this.bizNetworkConnection.connect('admin@land-registry')
		let registry = await this.bizNetworkConnection.getParticipantRegistry('org.acme.landregistry.Bank')

		let resources = await registry.getAll()

		let table = new Table({
			head: ['BankID', 'Name', 'Balance']
		})
		let arrayLength = resources.length
			
		for(let i = 0; i < arrayLength; i++) {
			let tableLine = []
			tableLine.push(resources[i].id)
			tableLine.push(resources[i].name)
			tableLine.push(resources[i].balance)
			table.push(tableLine)
		}
		console.log(table.toString())
		process.exit()
	} catch( err ){
		console.log(err)
		process.exit()
	}
	
})()