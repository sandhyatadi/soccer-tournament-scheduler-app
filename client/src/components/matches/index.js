import styled from 'styled-components'
import {useTable} from 'react-table'
import {Columns} from './Columns'
import MOCK_DATA from './DATA.json'
import { useMemo } from 'react'
const Styles = styled.div`
  padding: 1rem;
  table {
    border-radius: 25px;
    box-shadow: -8px -8px 8px #fff,8px 8px 8px #cbced1;
    border: 1px solid #EBEBED;
    tr {
      :last-child {
        td {
          border-bottom: 0;/
        }
      }
    }
    button {
        cursor: pointer;
        width: 100%;
        height: 60px;
        border-radius: 5px;
        font-size: 130%;
        font-weight: 700;
        font-family: 'Lato', sans-serif;
        color: #fff;
        text-align: center;
        background-color: #448a96;
        box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #fff;
        transition: all 0.5s;
        &:hover {
            background-color: #337180;
          }
        &:active {
            background-color: #88ef9e;
        }
    }
    th{
        background-color : #EBEBED;
        border-radius : 25px;
    },
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 2px solid #EBEBED;
      border-right: 2px solid #EBEBED;
      :last-child {
        border-right: 0;
      }
    }
  }
`;


const Match = () => {
    const columns = useMemo(() => Columns, [])
    const data = useMemo(() => MOCK_DATA, [])
    const tableInstance = useTable({
        columns,
        data
    })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance;
    
    return (
        <div>
            <Styles>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Styles>
        </div>
    )
}

export default Match
