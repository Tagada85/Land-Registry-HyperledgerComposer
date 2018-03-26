const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection

const contractInsurance = (async function(){
	try{
		this.bizNetworkConnection = new BusinessNetworkConnection()
		let connection = await this.bizNetworkConnection.connect('admin@land-registry')
		const args = process.argv.slice(2)
		const privateId = args.shift()
		const insuranceId = args.shift()
		const realEstateId = args.shift()
		const monthlyCost = args.shift()
		const duration = args.shift()
		let factory = connection.getFactory()
		let transaction = {
			"$class": "org.acme.landregistry.ContractingInsurance"
		}
		transaction.insured = privateId
		transaction.insuranceCompany = insuranceId
		transaction.realEstate = realEstateId
		transaction.monthlyCost = parseFloat(monthlyCost)
		transaction.durationInMonths = parseInt(duration)

		let serializer = connection.getSerializer()
		let resource = serializer.fromJSON(transaction)
		await this.bizNetworkConnection.submitTransaction(resource)
		console.log('Insurance created!')
		process.exit()
	}catch( err ){
		console.log(err)
		process.exit()
	}
})()

module.exports = contractInsurance