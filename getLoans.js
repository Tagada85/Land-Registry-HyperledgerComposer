const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection
const Table = require('cli-table2')

const getLoans = (async function(){
	try {
		this.bizNetworkConnection = new BusinessNetworkConnection()
		let connection = await this.bizNetworkConnection.connect('admin@land-registry')
		let registry = await this.bizNetworkConnection.getAssetRegistry('org.acme.landregistry.Loan')
		let resources = await registry.getAll()
		let table = new Table({
			head: ['LoanID', 'DebtorId', 'BankId', 'RealEstateId', 'InterestRate', 'Duration']
		})
		let arrayLength = resources.length
		
		for(let i = 0; i < arrayLength; i++) {
			let tableLine = []
			tableLine.push(resources[i].id)
			tableLine.push(resources[i].debtor.$identifier)
			tableLine.push(resources[i].bank.$identifier)
			tableLine.push(resources[i].realEstate.$identifier)
			tableLine.push(resources[i].interestRate)
			tableLine.push(resources[i].durationInMonths)
			table.push(tableLine)
		}
		console.log(table.toString())
		process.exit()
	}catch(err){
		console.log(err)
		process.exit()
	}
})()

module.exports = getLoans