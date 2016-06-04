import React from 'react'
import Flex from 'flex-component'
import { ToolbarButton } from './ToolbarButton.scss'

export default props => (
  <Flex className={ToolbarButton} alignItems='center' justifyContent='center'>
    {props.label}
  </Flex>
)
