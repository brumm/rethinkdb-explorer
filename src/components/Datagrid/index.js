
import React from 'react'
import Flex from 'flex-component'
import {
  AutoSizer,
  FlexTable,
  FlexColumn
} from 'react-virtualized'

import {
  AutoSizerContainer,
  HeaderRow,
  Header,
  EvenRow,
  OddRow,
  Cell,
  HeaderCell,
} from './Datagrid.scss'
import 'react-virtualized/styles.css'
import flatObj from 'flat-obj'

function rowClassName ({ index }) {
  return index < 0
    ? HeaderRow
    : index % 2 === 0
      ? EvenRow
      : OddRow
}

export default ({ rows }) => {
  let flattened = rows.map(row => flatObj(row, '.'))
  let schema = Object.keys(flattened[0] || {})

  return (
    <Flex grow={1} className={AutoSizerContainer}>
      <AutoSizer>
        {({width, height}) => (
          <FlexTable
            width={width}
            height={height}
            headerClassName={HeaderCell}
            headerHeight={22}
            overscanRowCount={0}
            rowHeight={25}
            rowCount={flattened.length}
            rowGetter={({ index }) => flattened[index]}
            rowClassName={rowClassName}
          >
            {schema.map(key => (
              <FlexColumn
                width={0}
                className={Cell}
                headerClassName={Header}
                label={key}
                dataKey={key}
                flexGrow={1}
                flexShrink={0}
              />
            ))}
          </FlexTable>
        )}
      </AutoSizer>
    </Flex>
  )
}
