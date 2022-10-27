import { PrimaryButton } from 'components/Button'
import { Card } from 'components/Card'
import { Label, Input } from 'components/Input'
import { Fragment } from 'ethers/lib/utils'
import React, { useState } from 'react'
import Blockies from 'react-blockies'
import { useForm } from 'react-hook-form'
import { useProvider } from 'wagmi'

const { utils, BigNumber, Contract } = require('ethers')

const getFunctionInputKey = (functionInfo, input, inputIndex) => {
  const name = input?.name ? input.name : 'input_' + inputIndex + '_'
  return functionInfo.name + '_' + name + '_' + input.type
}

const isReadable = fn => fn.stateMutability === 'view' || fn.stateMutability === 'pure'

export default function ReadFunctionForm({ functionSig, chainId, contractAddress }) {
  const provider = useProvider({ chainId: chainId })
  const { register, handleSubmit, errors } = useForm()
  const [result, setResult] = useState()
  const onSubmit = async data => {
    const contract = new Contract(contractAddress, [functionSig], provider)
    const params = []
    Object.keys(data).forEach(key => {
      params[key] = data[key]
    })
    console.log(params)
    console.log(contract[functionSig.name])

    const res = await contract[functionSig.name](...params)
    console.log(res)
    setResult(res)
  }
  const inputs = functionSig?.inputs.map((input, inputIndex) => {
    const key = getFunctionInputKey(functionSig, input, inputIndex)
    if (input.type === 'bytes32') {
    } else if (input.type === 'bytes') {
    } else if (input.type === 'uint256') {
    } else if (input.type === 'address') {
    }

    return (
      <div style={{ margin: 2 }} key={key}>
        <Label className="capitalize">{input.name ? input.type + ' ' + input.name : input.type}</Label>
        <Input
          size="large"
          placeholder={input.name ? input.type + ' ' + input.name : input.type}
          autoComplete="off"
          {...register(String(inputIndex), { required: true })}
        />
      </div>
    )
  })
  const buttonIcon = isReadable(functionSig) ? 'Read📡' : 'Send💸'

  return (
    <div>
      <Card>
        <h3 className="text-medium mb-3 text-xl capitalize">{functionSig.name}</h3>
        <div span={16}>{inputs}</div>
        <PrimaryButton type="submit" onClick={handleSubmit(onSubmit)}>
          {buttonIcon}
        </PrimaryButton>

        {String(result)}
      </Card>
    </div>
  )
}
