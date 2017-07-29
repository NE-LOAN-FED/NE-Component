
    import React from 'react'
    
    export default class Markdown extends React.Component{
      constructor(props){
        super(props)
      }
      componentDidMount(){
        this.refs['container'].innerHTML=`<div><h1>Cell</h1>
<p>列表组件，展示型组件，不包含特定功能。
包含了一下几个组件：</p>
<ul>
<li>Cells</li>
<li>Cell</li>
<li>CellHeader</li>
<li>CellBody</li>
<li>CellFooter</li>
</ul>
<h2>代码示例</h2>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { Cell } <span class="hljs-keyword">from</span> <span class="hljs-string">'ne-rc'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CellsPage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"page--header"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"page-title"</span>&gt;</span>Cells<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"page--desc"</span>&gt;</span>列表<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">CellTip</span>&gt;</span>完整的 Cell<span class="hljs-tag">&lt;/<span class="hljs-name">CellTip</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Cells</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Cell</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellHeader</span>&gt;</span>Header<span class="hljs-tag">&lt;/<span class="hljs-name">CellHeader</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellBody</span>&gt;</span>Body<span class="hljs-tag">&lt;/<span class="hljs-name">CellBody</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellFooter</span>&gt;</span>Footer<span class="hljs-tag">&lt;/<span class="hljs-name">CellFooter</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Cell</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Cell</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellHeader</span>&gt;</span>Header<span class="hljs-tag">&lt;/<span class="hljs-name">CellHeader</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellBody</span>&gt;</span>Body<span class="hljs-tag">&lt;/<span class="hljs-name">CellBody</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellFooter</span>&gt;</span>Footer<span class="hljs-tag">&lt;/<span class="hljs-name">CellFooter</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Cell</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Cells</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">CellTip</span>&gt;</span>不完整的<span class="hljs-tag">&lt;/<span class="hljs-name">CellTip</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Cells</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Cell</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellHeader</span>&gt;</span>Header<span class="hljs-tag">&lt;/<span class="hljs-name">CellHeader</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellBody</span>&gt;</span>Body<span class="hljs-tag">&lt;/<span class="hljs-name">CellBody</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Cell</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Cell</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellHeader</span>&gt;</span>Header<span class="hljs-tag">&lt;/<span class="hljs-name">CellHeader</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellFooter</span>&gt;</span>Footer<span class="hljs-tag">&lt;/<span class="hljs-name">CellFooter</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Cell</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Cells</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">CellTip</span>&gt;</span>带链接的<span class="hljs-tag">&lt;/<span class="hljs-name">CellTip</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Cells</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Cell</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/#/"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellHeader</span>&gt;</span>Go Home<span class="hljs-tag">&lt;/<span class="hljs-name">CellHeader</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">CellFooter</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">type</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">arrow</span>'}/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">CellFooter</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Cell</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Cells</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    )
  }
}

</span></code></pre>
<h2>API</h2>
<h3>Cell</h3>
<table>
<thead>
<tr>
<th>属性名</th>
<th>描述</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>prefixCls</td>
<td>样式前缀</td>
<td>String</td>
<td>NEUI</td>
</tr>
<tr>
<td>tip</td>
<td>普通下划线提示</td>
<td>bool</td>
<td>false</td>
</tr>
<tr>
<td>warning</td>
<td>警告提示</td>
<td>bool</td>
<td>false</td>
</tr>
</tbody>
</table>
</div>`
      }

      render() {
        return (
          <section ref='container' />
        )
      }
    }
  