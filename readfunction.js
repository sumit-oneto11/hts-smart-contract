require("dotenv").config();
const {
	AccountId,
	PrivateKey,
	Client,	
	FileCreateTransaction,
	FileAppendTransaction,
	ContractCreateTransaction,
	ContractFunctionParameters,
	ContractExecuteTransaction,
	ContractCallQuery,
	Hbar,
	TokenId
} = require("@hashgraph/sdk");
const fs = require("fs");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromStringECDSA(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
	// Import the compiled contract bytecode
	//const contractBytecode = fs.readFileSync("SpheraHeadNFT_sol_SpheraHeadNFT.bin");


	 const contractId="0.0.3625732";
	 	//  const accountId="0.0.2278316";

	//================================ read function start ===========================================

	const contractQueryTx = new ContractCallQuery()
		.setContractId(contractId)
		.setGas(100000)
		.setFunction("getValue");//,new ContractFunctionParameters().addAddress("0000000000000000000000000000000002da42d6").addUint256(13));  // ,new ContractFunctionParameters().addAddress("0000000000000000000000000000000002da42d6").addUint256(2)
	const contractQuerySubmit = await contractQueryTx.execute(client);
	const contractQueryResult = contractQuerySubmit.getUint256(0);
	console.log(`Result: ${contractQueryResult}\n`);

	//========== for id to address convert
	//const contractAddress = TokenId.fromString(accountId).toSolidityAddress();
	//console.log(`Result: ${contractAddress}\n`);		
}
main();