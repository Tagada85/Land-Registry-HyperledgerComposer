const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection
const Table = require('cli-table2')

const getREregistry = (async function(){
	
	try {
		this.bizNetworkConnection = new BusinessNetworkConnection()
		let connection = await this.bizNetworkConnection.connect('admin@land-registry')
		let registry = await this.bizNetworkConnection.getAssetRegistry('org.acme.landregistry.RealEstate')
		let resources = await registry.getAll()
		let table = new Table({
			head: ['TitleID', 'OwnerID', 'Square Meters', 'Price', 'Address']
		})
		let arrayLength = resources.length
		
		for(let i = 0; i < arrayLength; i++) {
			let tableLine = []
			tableLine.push(resources[i].id)
			tableLine.push(resources[i].owner.$identifier)
			tableLine.push(resources[i].squareMeters)
			tableLine.push(resources[i].price)
			tableLine.push(resources[i].address)
			table.push(tableLine)
		}
		console.log(table.toString())
		process.exit()
			
	} catch(error) {
		console.log(error)
		process.exit()
	}
}())

module.exports = getREregistry