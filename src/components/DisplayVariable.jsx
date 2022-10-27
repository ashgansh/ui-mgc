import { Label } from 'components/Input'
import React, { useCallback, useEffect, useState } from 'react'
import { PrimaryButton } from './Button'

import { tryToDisplay } from './teset/components/Contract/utils'

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
      <div>
        <h2>{tryToDisplay(variable, false, blockExplorer)}</h2>
      </div>
      <div>
        <h2>
          <PrimaryButton type="link" onClick={refresh}>
            🔄
          </PrimaryButton>
        </h2>
      </div>
    </div>
  )
}

export default DisplayVariable
