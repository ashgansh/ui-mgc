import { Button, Col, Divider, Row } from 'antd'
import { Label } from 'components/Input'
import React, { useCallback, useEffect, useState } from 'react'

import { tryToDisplay } from './utils'

const DisplayVariable = ({ contractFunction, functionInfo, refreshRequired, triggerRefresh, blockExplorer }) => {
  const [variable, setVariable] = useState('')

  const refresh = useCallback(async () => {
    try {
      const funcResponse = await contractFunction()
      setVariable(funcResponse)
      triggerRefresh(false)
    } catch (e) {
      console.log(e)
    }
  }, [setVariable, contractFunction, triggerRefresh])

  useEffect(() => {
    refresh()
  }, [refresh, refreshRequired, contractFunction])

  return (
    <div>
      <Label>{functionInfo.name}</Label>
      <Col span={14}>
        <h2>{tryToDisplay(variable, false, blockExplorer)}</h2>
      </Col>
      <Col span={2}>
        <h2>
          <Button type="link" onClick={refresh} icon="🔄" />
        </h2>
      </Col>
      <Divider />
    </div>
  )
}

export default DisplayVariable
