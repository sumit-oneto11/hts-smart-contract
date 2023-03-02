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
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
	// Import the compiled contract bytecode
	const contractBytecode = fs.readFileSync("TokenCreateContract_sol_TokenCreateContract.bin");
	//console.log("Network=",NetworkName);

	//Create a file on Hedera and store the hex-encoded bytecode

	// const fileCreateTx   = new FileCreateTransaction().setKeys([operatorKey]);
	// const fileSubmit     = await fileCreateTx.execute(client);
	// const fileCreateRx   = await fileSubmit.getReceipt(client);
	// const bytecodeFileId = fileCreateRx.fileId;
	// console.log(`- The smart contract bytecode file ID is: ${bytecodeFileId}`);

	// // Append contents to the file
	

	// const fileAppendTx = new FileAppendTransaction()
	// 	.setFileId(bytecodeFileId)
	// 	.setContents(contractBytecode)
	// 	.setMaxChunks(10)
	// 	.setMaxTransactionFee(new Hbar(5));
	// const fileAppendSubmit = await fileAppendTx.execute(client);
	// const fileAppendRx = await fileAppendSubmit.getReceipt(client);
	// console.log(`- Content added: ${fileAppendRx.status} \n`);


	// // Instantiate the smart contract

	
	// const contractInstantiateTx = new ContractCreateTransaction()
	// 	.setBytecodeFileId(bytecodeFileId)
	// 	.setGas(500000);

	// const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
	// const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(client);
	// const contractId = contractInstantiateRx.contractId;
	// const contractAddress = contractId.toSolidityAddress();
	// console.log(`- The smart contract ID is: ${contractId} \n`);
	// console.log(`- The smart contract ID in Solidity format is: ${contractAddress} \n`);



		 const contractId="0.0.3603496";
	 	//  const accountId="0.0.6934"; // "0000000000000000000000000000000000001b16"=="0.0.6934"

	//================================ write function start ===========================================

	const contractExecuteTx = new ContractExecuteTransaction()
	.setContractId(contractId)
	.setGas(10000000)
	.setPayableAmount(10)
	.setFunction("createFungibleTokenPublic",new ContractFunctionParameters().addAddress("0000000000000000000000000000000000001b16"))
	.setMaxTransactionFee(new Hbar(10));
	const contractExecuteSubmit = await contractExecuteTx.execute(client);
	const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
	console.log(`- Contract function call status: ${contractExecuteRx.status} \n`);


	//================================ read function start ===========================================

	// const contractQueryTx = new ContractCallQuery()
	// 	.setContractId(contractId)
	// 	.setGas(100000)
	// //.setFunction("tokenOwner",new ContractFunctionParameters().addUint256(1))  
	// 	.setFunction("OwnerLastToken",new ContractFunctionParameters().addAddress("000000000000000000000000000000000022c3ac"));//,new ContractFunctionParameters().addAddress("0000000000000000000000000000000002da42d6").addUint256(13));  // ,new ContractFunctionParameters().addAddress("0000000000000000000000000000000002da42d6").addUint256(2)
	// const contractQuerySubmit = await contractQueryTx.execute(client);
	// const contractQueryResult = contractQuerySubmit.getUint256(0);

	//  console.log(`Result: ${contractQueryResult}\n`);

	//========== for id to address convert
	// const contractAddress = TokenId.fromString(accountId).toSolidityAddress();
	// console.log(`Result: ${contractAddress}\n`);		
}
main();