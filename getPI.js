const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection
const Table = require('cli-table2')

const getPI = (async function(){
	try {
		this.bizNetworkConnection = new BusinessNetworkConnection()
		let connection = await this.bizNetworkConnection.connect('admin@land-registry')
		let registry = await this.bizNetworkConnection.getParticipantRegistry('org.acme.landregistry.PrivateIndividual')
		const privateId = process.argv.slice(2)[0]
		if( !privateId ){
			throw 'No id was specified!'
		}
		const private = await registry.get(privateId)
		let table = new Table({
			head: ['ID', 'Name', 'Address', 'Balance']
		})
		table.push([private.id, private.name, private.address, private.balance])
		console.log(table.toString())
		process.exit()

	} catch( error ){
		console.log(error)
		process.exit()
	}
})()

module.exports = getPI