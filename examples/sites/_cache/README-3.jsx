
    import React from 'react'
    
    export default class Markdown extends React.Component{
      constructor(props){
        super(props)
      }
      componentDidMount(){
        this.refs['container'].innerHTML=`<div></div>`
      }

      render() {
        return (
          <section ref='container' />
        )
      }
    }
  