import React from 'react'
import Flex from 'flex-component'

import style from './Sidebar.scss'

const Section = ({ label, children }) => (
  <Flex direction='column' shrink={0}>
    <Flex className={style.Label} alignItems='flex-end'>{label}</Flex>
    {children}
  </Flex>
)
const Item = ({ label }) => (
  <Flex alignItems='center' className={style.Item}>{label}</Flex>
)

export default ({ children }) => (
  <Flex className={style.Sidebar} direction='column'>
    {children({ Section, Item })}
  </Flex>
)
