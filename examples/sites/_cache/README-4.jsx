
    import React from 'react'
    
    export default class Markdown extends React.Component{
      constructor(props){
        super(props)
      }
      componentDidMount(){
        this.refs['container'].innerHTML=`<div><h1>Toast 组件</h1>
<p>Toast 轻提示，建议包含文字和 Icon 信息，规则如下：</p>
<ul>
<li>建议文字内容不超过 13 个字</li>
<li>默认自动隐藏，手动隐藏建议使用 Modal</li>
</ul>
<h2>代码示例</h2>
<pre><code class="language-js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  onClose = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// ...</span>
  }
  render(){
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Toast</span> <span class="hljs-attr">show</span>=<span class="hljs-string">{this.props.ToastShow}</span>
          <span class="hljs-attr">content</span>=<span class="hljs-string">"出错啦！"</span>
          <span class="hljs-attr">onClose</span>=<span class="hljs-string">{this.onClose}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}
</span></code></pre>
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
<td>show</td>
<td>是否显示</td>
<td>Boolean</td>
<td>false</td>
</tr>
<tr>
<td>content</td>
<td>显示文字内容</td>
<td>String</td>
<td>无</td>
</tr>
<tr>
<td>icon</td>
<td>显示 icon 的 type</td>
<td>String</td>
<td>无</td>
</tr>
<tr>
<td>timeout</td>
<td>自动隐藏时间</td>
<td>Number</td>
<td>2000</td>
</tr>
<tr>
<td>isLockScreen</td>
<td>是否需要锁屏遮罩</td>
<td>Bool</td>
<td>false</td>
</tr>
<tr>
<td>transitionName</td>
<td>出现和消失动画的类名</td>
<td>String</td>
<td>verticalSlideTB</td>
</tr>
<tr>
<td>transitionTimeOut</td>
<td>动画的时间</td>
<td>Number</td>
<td>300 单位ms</td>
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
  