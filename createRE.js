const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection

const createRE = (async function(){
	try {
		this.bizNetworkConnection = new BusinessNetworkConnection()
		let connection = await this.bizNetworkConnection.connect('admin@land-registry')
		const args = process.argv.slice(2)
		const reId = args.shift()
		const address = args.shift()
		const squareMeters = args.shift()
		const price = args.shift()
		const ownerId = args.shift()
		let factory = connection.getFactory()
		let re = factory.newResource('org.acme.landregistry', 'RealEstate', reId)
		re.address = address
		re.squareMeters = parseFloat(squareMeters)
		re.price = parseFloat(price)

		this.reRegistry = await this.bizNetworkConnection.getAssetRegistry('org.acme.landregistry.RealEstate')

		let ownerRelationship = factory.newRelationship('org.acme.landregistry', 'PrivateIndividual', ownerId)
		re.owner = ownerRelationship

		await this.reRegistry.add(re)
		console.log('Real Estate asset created!')
		process.exit()

	}catch( err ){
		console.log(err)
		process.exit()
	}
})()

module.exports = createRE