const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection

const createPI = (async function(){
	try{
		this.bizNetworkConnection = new BusinessNetworkConnection()
		let connection = await this.bizNetworkConnection.connect('admin@land-registry')
		const args = process.argv.slice(2)
		const privateId = args.shift()
		const name = args.shift()
		const address = args.shift()
		const balance = args.shift()

		let factory = connection.getFactory()
		let pi = factory.newResource('org.acme.landregistry', 'PrivateIndividual', privateId)

		pi.name = name
		pi.address = address
		pi.balance = parseFloat(balance)
		this.piRegistry = await this.bizNetworkConnection.getParticipantRegistry('org.acme.landregistry.PrivateIndividual')
		await this.piRegistry.add(pi)
		console.log('Private Individual Added to registry')
		process.exit()
	}catch(err){
		console.log(err)
		process.exit()
	}
})()