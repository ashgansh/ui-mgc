import { Card } from 'antd'
import { useContractExistsAtAddress, useContractLoader } from 'eth-hooks'
import React, { useMemo, useState } from 'react'
import Address from '../Address'
import Balance from '../Balance'
import DisplayVariable from './DisplayVariable'
import FunctionForm from './FunctionForm'
import { Contract as EtherContract } from 'ethers'

const noContractDisplay = (
  <div>
    Loading...{' '}
    <div style={{ padding: 32 }}>
      You need to run{' '}
      <span
        className="highlight"
        style={{ marginLeft: 4, /* backgroundColor: "#f1f1f1", */ padding: 4, borderRadius: 4, fontWeight: 'bolder' }}
      >
        yarn run chain
      </span>{' '}
      and{' '}
      <span
        className="highlight"
        style={{ marginLeft: 4, /* backgroundColor: "#f1f1f1", */ padding: 4, borderRadius: 4, fontWeight: 'bolder' }}
      >
        yarn run deploy
      </span>{' '}
      to see your contract here.
    </div>
    <div style={{ padding: 32 }}>
      <span style={{ marginRight: 4 }} role="img" aria-label="warning">
        ☢️
      </span>
      Warning: You might need to run
      <span
        className="highlight"
        style={{ marginLeft: 4, /* backgroundColor: "#f1f1f1", */ padding: 4, borderRadius: 4, fontWeight: 'bolder' }}
      >
        yarn run deploy
      </span>{' '}
      <i>again</i> after the frontend comes up!
    </div>
  </div>
)

const isQueryable = fn => (fn.stateMutability === 'view' || fn.stateMutability === 'pure') && fn.inputs.length === 0

export default function Contract({
  customContract,
  account,
  gasPrice,
  signer,
  provider,
  name,
  show,
  price,
  blockExplorer,
  chainId,
  contractConfig,
  address,
}) {
  const displayedContractFunctions = useMemo(() => {
    const contract = new EtherContract(address, contractConfig[1].contracts.DAI.abi, provider)
    const results = contract
      ? Object.entries(contract.interface.functions).filter(
          fn => fn[1]['type'] === 'function' && !(show && show.indexOf(fn[1]['name']) < 0)
        )
      : []
    return results
  }, [show, address, contractConfig, provider])

  const [refreshRequired, triggerRefresh] = useState(false)
  console.log(displayedContractFunctions)
  const contractDisplay = displayedContractFunctions.map(contractFuncInfo => {
    const contract = new EtherContract(address, contractConfig[1].contracts.DAI.abi, provider)
    console.log('test', contractFuncInfo)
    const contractFunc =
      contractFuncInfo[1].stateMutability === 'view' || contractFuncInfo[1].stateMutability === 'pure'
        ? contract[contractFuncInfo[0]]
        : contract.connect(signer)[contractFuncInfo[0]]

    if (typeof contractFunc === 'function') {
      if (isQueryable(contractFuncInfo[1])) {
        // If there are no inputs, just display return value
        return (
          <DisplayVariable
            key={contractFuncInfo[1].name}
            contractFunction={contractFunc}
            functionInfo={contractFuncInfo[1]}
            refreshRequired={refreshRequired}
            triggerRefresh={triggerRefresh}
            blockExplorer={blockExplorer}
          />
        )
      }

      // If there are inputs, display a form to allow users to provide these
      return (
        <FunctionForm
          key={'FF' + contractFuncInfo[0]}
          contractFunction={contractFunc}
          functionInfo={contractFuncInfo[1]}
          provider={provider}
          gasPrice={gasPrice}
          triggerRefresh={triggerRefresh}
        />
      )
    }
    return null
  })

  console.log('render')
  console.log(address)
  return (
    <div style={{ margin: 'auto', width: '70vw' }}>
      <Card
        title={
          <div style={{ fontSize: 24 }}>
            {name}
            <div style={{ float: 'right' }}>
              <Address value={address} blockExplorer={blockExplorer} />
              {/* <Balance address={address} provider={provider} price={price} /> */}
            </div>
          </div>
        }
        size="large"
        style={{ marginTop: 25, width: '100%' }}
        loading={false}
        className="gap-3"
      >
        <div className="flex flex-col gap-3">{true ? contractDisplay : noContractDisplay}</div>
      </Card>
    </div>
  )
}
