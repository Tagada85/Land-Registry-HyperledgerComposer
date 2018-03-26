const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection

const contractInsurance = (async function(){
	try{
		this.bizNetworkConnection = new BusinessNetworkConnection()
		let connection = await this.bizNetworkConnection.connect('admin@land-registry')
		const args = process.argv.slice(2)
		const pIdBuyer = args.shift()
		const pIdSeller = args.shift()
		const realEstateId = args.shift()
		const loanId = args.shift()
		const realEstateAgentId = args.shift()
		const notaryId = args.shift()
		const insuranceId = args.shift()
		let transaction = {
			"$class": "org.acme.landregistry.BuyingRealEstate"
		}
		transaction.buyer = pIdBuyer
		transaction.seller = pIdSeller
		transaction.realEstate = realEstateId
		transaction.loan = loanId
		transaction.realEstateAgent = realEstateAgentId
		transaction.notary = notaryId
		transaction.insurance = insuranceId
		transaction.isNewOwnerMainResidence = false

		let serializer = connection.getSerializer()
		let resource = serializer.fromJSON(transaction)
		await this.bizNetworkConnection.submitTransaction(resource)
		console.log('Transaction Completed!')
		process.exit()
	}catch( err ){
		console.log(err)
		process.exit()
	}
})()

module.exports = contractInsurance