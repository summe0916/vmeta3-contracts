import { DeployConfig } from '../src/deploy-config'

const config: DeployConfig = {
  numDeployConfirmations: 1,
  gasPrice: 5_000_000_000,
  l1BlockTimeSeconds: 15,
  l2BlockGasLimit: 15_000_000,
  l2ChainId: 8848,
  ctcL2GasDiscountDivisor: 32,
  ctcEnqueueGasCost: 60_000,
  sccFaultProofWindowSeconds: 10,
  sccSequencerPublishWindowSeconds: 12592000,
  ovmSequencerAddress: '0x93F08242E01c770873e0603eC695A8f571290ae3',
  ovmProposerAddress: '0x1B25aD36Ad5954D7A82A59298F4117EB02f6211e',
  ovmBlockSignerAddress: '0x243e014e5ED2405aF68FfFe43EcaE60C71b87113',
  ovmFeeWalletAddress: '0x82537217f002fb22CD44CbC8cb553c2d341a95ed',
  ovmAddressManagerOwner: '0x90e4297f5cBD00ca5AaE6D4232FECaB7a5cfD26F',
  ovmGasPriceOracleOwner: '0xeB298cf81Bdb54A58D7a06aFe4647Df6EA7D675c',
}

export default config
