import React from 'react'
import { connect } from 'react-redux'
import Flex from 'flex-component'
import { Link } from 'react-router'

import Titlebar from 'components/Titlebar'
import ToolbarButton from 'components/ToolbarButton'
import Sidebar from 'components/Sidebar'
import Datagrid from 'components/Datagrid'

import style from './App.scss'

@connect(({ databases, tables, rows, windowState: { isFocused }}, { params: { databaseName }}) => {
  return {
    isFocused,
    databases,
    tables,
    rows,
  }
})

export default class App extends React.Component {
  render () {
    const { isFocused, children, databases, tables, rows, params } = this.props
    return (
      <Flex className={style.App} direction='column'>
        <Titlebar
          style='hidden-inset'
          title={[params.databaseName, params.tableName].filter(Boolean).join(' — ')}
          isFocused={isFocused}
        />

        <Flex grow={1}>
          <Sidebar>
            {({ Section, Item }) => [
              <Section label='Databases'>
                {databases.map(databaseName => (
                  <Link activeStyle={{ backgroundColor: '#C8C8C8' }} to={`/${databaseName}`}><Item label={databaseName} /></Link>
                ))}
              </Section>,

              <Section label='Tables'>
                {tables.map(tableName => (
                  <Link activeStyle={{ backgroundColor: '#C8C8C8' }} to={`${params.databaseName}/${tableName}`}><Item label={tableName} /></Link>
                ))}
              </Section>
            ]}
          </Sidebar>

          <Flex className={style.Content} grow={1}>
            {rows.length > 0 && <Datagrid rows={rows} />}
          </Flex>
        </Flex>

      </Flex>
    )
  }
}
