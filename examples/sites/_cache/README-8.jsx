
    import React from 'react'
    
    export default class Markdown extends React.Component{
      constructor(props){
        super(props)
      }
      componentDidMount(){
        this.refs['container'].innerHTML=`<div><h1>Button</h1>
<p>按钮组件，展示型组件，不包含特定功能。</p>
<h2>代码示例</h2>
<pre><code class="language-js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render(){
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Button Primary<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">role</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">secondary</span>'}&gt;</span>Button Secondary<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{true}</span>&gt;</span>Button Disabled<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">rightAngle</span>'}&gt;</span>Button Primary<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">rightAngle</span>'} <span class="hljs-attr">role</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">secondary</span>'}&gt;</span>Button Secondary<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">rightAngle</span>'} <span class="hljs-attr">disabled</span>=<span class="hljs-string">{true}</span>&gt;</span>Button Disabled<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">size</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">small</span>'}&gt;</span>Small Button<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">size</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">small</span>'} <span class="hljs-attr">disabled</span>=<span class="hljs-string">{true}</span>&gt;</span>Small Button<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}
</code></pre>
<h2>API</h2>
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
<td>role</td>
<td>按钮规则，主按钮还是备选按钮</td>
<td>oneOf(['primary', 'secondary'])</td>
<td>primary</td>
</tr>
<tr>
<td>style</td>
<td>拐角类型</td>
<td>oneOf(['normal', 'rightAngle'])</td>
<td>normal</td>
</tr>
<tr>
<td>disabled</td>
<td>类型</td>
<td>Boolean</td>
<td>false</td>
</tr>
<tr>
<td>size</td>
<td>大小</td>
<td>oneOf(['normal', 'small'])</td>
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
  