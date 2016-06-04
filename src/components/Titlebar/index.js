import React from 'react'
import Flex from 'flex-component'
import classNames from 'classnames'
import styles from './Titlebar.scss'
const { Titlebar, TitlebarUnfocused, Toolbar, title } = styles

export default props => (
  <Flex
    className={classNames(
      props.isFocused ? Titlebar : TitlebarUnfocused,
      styles[props.style]
    )}
  >
    <Flex
      className={title}
      alignItems='center'
      justifyContent='center'
    >
      {props.title}
    </Flex>

    <Flex className={Toolbar} alignItems='flex-end'>
      {props.children}
    </Flex>
  </Flex>
)
