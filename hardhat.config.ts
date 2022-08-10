import { HardhatUserConfig } from 'hardhat/types'
import 'solidity-coverage'
import * as dotenv from 'dotenv'

// Hardhat plugins
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import '@primitivefi/hardhat-dodoc'
import '@typechain/hardhat'
import 'hardhat-deploy'
import 'hardhat-gas-reporter'
import 'hardhat-output-validator'

// Hardhat tasks
import './tasks'

// Load environment variables from .env
dotenv.config()

const enableGasReport = !!process.env.ENABLE_GAS_REPORT
const privateKey = process.env.PRIVATE_KEY || '0x' + '11'.repeat(32) // this is to avoid hardhat error
const deploy = process.env.DEPLOY_DIRECTORY || 'deploy'

const config: HardhatUserConfig | any = {
    networks: {
        hardhat: {
            live: false,
            saveDeployments: false,
            tags: ['local'],
        },
        'vmeta3': {
            url: 'https://local-chain.vmeta3.com/rpc/',
            deploy,
            saveDeployments: false,
            accounts: [privateKey],
        },
    },
    mocha: {
        timeout: 50000,
    },
    solidity: {
        compilers: [
            {
                version: '0.8.9',
                settings: {
                    optimizer: { enabled: true, runs: 10_000 },
                },
            },
            {
                version: '0.5.17', // Required for WETH9
                settings: {
                    optimizer: { enabled: true, runs: 10_000 },
                },
            },
        ],
        settings: {
            metadata: {
                bytecodeHash: 'none',
            },
            outputSelection: {
                '*': {
                    '*': ['metadata', 'storageLayout'],
                },
            },
        },
    },
    typechain: {
        outDir: 'dist/types',
        target: 'ethers-v5',
    },
    paths: {
        deploy: './deploy',
        deployments: './deployments',
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    gasReporter: {
        enabled: enableGasReport,
        currency: 'USD',
        gasPrice: 100,
        outputFile: process.env.CI ? 'gas-report.txt' : undefined,
    },
    etherscan: {
        apiKey: {
            mainnet: process.env.ETHERSCAN_API_KEY,
            kovan: process.env.ETHERSCAN_API_KEY,
	    vmeta3Ethereum: process.env.VMETA3_ETHERSCAN_API_KEY,
        },
    },
    dodoc: {
        runOnCompile: true,
        exclude: [
            'Helper_GasMeasurer',
            'Helper_SimpleProxy',
            'TestERC20',
            'TestLib_CrossDomainUtils',
            'TestLib_OVMCodec',
            'TestLib_RLPReader',
            'TestLib_RLPWriter',
            'TestLib_AddressAliasHelper',
            'TestLib_MerkleTrie',
            'TestLib_SecureMerkleTrie',
            'TestLib_Buffer',
            'TestLib_Bytes32Utils',
            'TestLib_BytesUtils',
            'TestLib_MerkleTree',
        ],
    },
    outputValidator: {
        runOnCompile: true,
        errorMode: false,
        checks: {
            events: false,
            variables: false,
        },
        exclude: ['contracts/test-helpers', 'contracts/test-libraries'],
    },
}

if (
    process.env.CONTRACTS_TARGET_NETWORK &&
    process.env.CONTRACTS_DEPLOYER_KEY &&
    process.env.CONTRACTS_RPC_URL
) {
    config.networks[process.env.CONTRACTS_TARGET_NETWORK] = {
        accounts: [process.env.CONTRACTS_DEPLOYER_KEY],
        url: process.env.CONTRACTS_RPC_URL,
        live: true,
        saveDeployments: true,
        tags: [process.env.CONTRACTS_TARGET_NETWORK],
        gas: 2100000,
        gasPrice: 8000000000,
        gasMultiplier: 2,
    }
}

export default config
