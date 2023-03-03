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
	//const contractBytecode = fs.readFileSync("SpheraHeadNFT_sol_SpheraHeadNFT.bin");
	


	 const contractId="0.0.3625634";
	

	//================================ write function start ===========================================

// Create NFT from precompile
const createToken = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(300000) // Increase if revert
    .setPayableAmount(20) // Increase if revert
    .setFunction("createNft",
        new ContractFunctionParameters()
        .addString("Fall Collection") // NFT name
        .addString("LEAF") // NFT symbol
        .addString("Just a memo") // NFT memo
        .addInt64(250) // NFT max supply
        .addUint32(7000000) // Expiration: Needs to be between 6999999 and 8000001
        );
const createTokenTx = await createToken.execute(client);
const createTokenRx = await createTokenTx.getRecord(client);
const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
const tokenId = AccountId.fromSolidityAddress(tokenIdSolidityAddr);

console.log(`Token created with ID: ${tokenId} \n`);
	
}
main();