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
	TokenId,
	ContractCreateFlow
} = require("@hashgraph/sdk");
const fs = require("fs");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromStringECDSA(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
	// Import the compiled contract bytecode
	const contractBytecode = fs.readFileSync("NFTCreator_sol_NFTCreator.bin");
	//console.log("Network=",NetworkName);

	//Create a file on Hedera and store the hex-encoded bytecode

	const createContract = new ContractCreateFlow()
    .setGas(500000) // Increase if revert
    .setBytecode(contractBytecode); // Contract bytecode
const createContractTx = await createContract.execute(client);
const createContractRx = await createContractTx.getReceipt(client);
const contractId = createContractRx.contractId;

console.log(`Contract created with ID: ${contractId} \n`);
}
main();