/*
 * @Author: hzzhanfenghai 
 * @Date: 2017-07-06
 * @Last Modified by: hzzhanfenghai
 */
import React from 'react'
import classNames from 'classnames'

export default class Table extends React.Component {
  static propTypes = {
    colomuns: React.PropTypes.array,
    data: React.PropTypes.array
  }
  static defaultProps = {
    colomuns: [],
    data: []
  }

  render() {
    const {columns, data, className, cellBorder, children, ...others} = this.props
    const cls = classNames({
      NEUI_table: true,
      NEUI_table_no_cell_border: !cellBorder,
      [className] : className
    })
    return (
      <table className={cls}>
        <thead>
          <tr>
            {columns && columns.map((v, i) => {
              return <th key={i}>{v.title}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {data && data.map((v, i) => {
            return <tr key={i}>
              {columns.map((value, j) => {
                return <td key={j}>{v[value.name]}</td>
              })}
            </tr>
          })}
        </tbody>
        {children}
      </table>
    )
  }
}
