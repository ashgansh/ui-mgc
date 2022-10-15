import { Col, Divider, Row, Tooltip } from 'antd'
import { PrimaryButton } from 'components/Button'
import { Card } from 'components/Card'
import { Label, Input } from 'components/Input'
import React, { useState } from 'react'
import Blockies from 'react-blockies'

import { Transactor } from '../../helpers'
import { tryToDisplay, tryToDisplayAsText } from './utils'

const { utils, BigNumber } = require('ethers')

const getFunctionInputKey = (functionInfo, input, inputIndex) => {
  const name = input?.name ? input.name : 'input_' + inputIndex + '_'
  return functionInfo.name + '_' + name + '_' + input.type
}

const isReadable = fn => fn.stateMutability === 'view' || fn.stateMutability === 'pure'

export default function FunctionForm({ contractFunction, functionInfo, provider, gasPrice, triggerRefresh }) {
  const inputs = functionInfo.inputs.map((input, inputIndex) => {
    const key = getFunctionInputKey(functionInfo, input, inputIndex)
    if (input.type === 'bytes32') {
    } else if (input.type === 'bytes') {
    } else if (input.type === 'uint256') {
    } else if (input.type === 'address') {
    }
    console.log(input)

    return (
      <div style={{ margin: 2 }} key={key}>
        <Label className="capitalize">{input.name ? input.type + ' ' + input.name : input.type}</Label>
        <Input size="large" placeholder={input.name ? input.type + ' ' + input.name : input.type} autoComplete="off" />
      </div>
    )
  })
  const buttonIcon = isReadable(functionInfo) ? (
    <PrimaryButton style={{ marginLeft: -32 }}>Read📡</PrimaryButton>
  ) : (
    <PrimaryButton style={{ marginLeft: -32 }}>Send💸</PrimaryButton>
  )

  return (
    <div>
      <Card>
        <h3 className="text-medium mb-3 text-xl capitalize">{functionInfo.name}</h3>
        <Col span={16}>{inputs}</Col>
      </Card>
    </div>
  )
}
