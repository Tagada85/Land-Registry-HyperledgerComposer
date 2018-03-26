const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection

const contractLoan = (async function(){
	try{
		this.bizNetworkConnection = new BusinessNetworkConnection()
		let connection = await this.bizNetworkConnection.connect('admin@land-registry')
		const args = process.argv.slice(2)
		const privateId = args.shift()
		const bankId = args.shift()
		const realEstateId = args.shift()
		const interestRate = args.shift()
		const duration = args.shift()
		let transaction = {
			"$class": "org.acme.landregistry.ContractingLoan"
		}
		transaction.debtor = privateId
		transaction.bank = bankId
		transaction.realEstate = realEstateId
		transaction.interestRate = parseFloat(interestRate)
		transaction.durationInMonths = parseInt(duration)

		let serializer = connection.getSerializer()
		let resource = serializer.fromJSON(transaction)
		await this.bizNetworkConnection.submitTransaction(resource)
		console.log('Loan created!')
		process.exit()
	}catch( err ){
		console.log(err)
		process.exit()
	}
})()

module.exports = contractLoan