
    import React from 'react'
    
    export default class Markdown extends React.Component{
      constructor(props){
        super(props)
      }
      componentDidMount(){
        this.refs['container'].innerHTML=`<div><h1>Collapse (实现不够友好，需要考虑重构)</h1>
<p>通用行折叠列表，用来包裹其他需要折叠需求的具体组件。</p>
<h2>代码示例</h2>
<pre><code class="language-js"><span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../components/Collapse/List'</span>

<span class="hljs-keyword">const</span> questions = [
  {
    <span class="hljs-attr">q</span>: <span class="hljs-string">'Q：客服电话是多少？'</span>,
    <span class="hljs-attr">a</span>: <span class="hljs-string">'A：客服热线：400-0881188  服务时间：工作日09:30-12:00 ;13:30-18:00'</span>
  }, {
    <span class="hljs-attr">q</span>: <span class="hljs-string">'Q：申请的条件是什么？'</span>,
    <span class="hljs-attr">a</span>: <span class="hljs-string">'A：年龄在18-60周岁的在职员工。'</span>
  }, {
    <span class="hljs-attr">q</span>: <span class="hljs-string">'Q：申请借款需要哪些材料？'</span>,
    <span class="hljs-attr">a</span>: <span class="hljs-string">'A：只需要储蓄卡和身份证。'</span>
  }
]

<span class="hljs-keyword">const</span> collapseListData = questions.map(<span class="hljs-function">(<span class="hljs-params">v, k</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> obj = {
    <span class="hljs-attr">title</span>: v.q,
    <span class="hljs-attr">content</span>: v.a
  }
  <span class="hljs-keyword">return</span> obj
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CollapsePage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  handleCollapseListChange = <span class="hljs-function">(<span class="hljs-params">openListIdCollection</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(openListIdCollection)
  }

  render() {
    <span class="hljs-keyword">const</span> CollapseSubComponent = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span>/&gt;</span></span>
    <span class="hljs-keyword">return</span> (
      &lt;section className="page_collapse"&gt;
        &lt;div className="page--header"&gt;
          &lt;h1 className="page-title"&gt;Collapse&lt;/h1&gt;
          &lt;p className="page--desc"&gt;折叠列表&lt;/p&gt;
        &lt;/div&gt;
        &lt;h3&gt;Normal&lt;/h3&gt;
        &lt;Collapse listCollection={collapseListData}
                  onListChange={this.handleCollapseListChange}
                  subComponent={CollapseSubComponent}
        /&gt;
        &lt;h3&gt;Accordion&lt;/h3&gt;
        &lt;Collapse listCollection={collapseListData}
                  accordion={true}
                  onListChange={this.handleCollapseListChange}
                  subComponent={CollapseSubComponent}
        /&gt;
      &lt;/section&gt;
    )
  }
}

</code></pre>
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
<td>openListIdCollection</td>
<td>当前所有打开状态组件的 ID 列表</td>
<td>Array</td>
<td>[]</td>
</tr>
<tr>
<td>listCollection</td>
<td>包裹组件渲染所需要的数据</td>
<td>Array</td>
<td>[]</td>
</tr>
<tr>
<td>accordion</td>
<td>是否打开手风琴模式</td>
<td>bool</td>
<td>false</td>
</tr>
<tr>
<td>onListChange(openListIdCollection)</td>
<td>包裹组件状态发生变化时的回调函数</td>
<td>Function</td>
<td>无</td>
</tr>
<tr>
<td>subComponent</td>
<td>要包裹的组件（需要自行实现打开关闭功能）</td>
<td>React.PropTypes.element</td>
<td>无</td>
</tr>
</tbody>
</table>
<h4>subComponent:React.PropTypes.element</h4>
<p>要包裹的组件，需要自己实现折叠功能。</p>
<ul>
<li>[ ] TODO 做成一个高阶函数，以方便生成 Collapse 自组件。</li>
</ul>
<p>Collapse 会通过 clone 包裹的组件来传入 <code>data</code>,<code>onChange</code>,<code>id</code> 这三个参数。</p>
<pre><code class="language-js">renderList = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> {openListIdCollection, listCollection} = <span class="hljs-keyword">this</span>.state
    <span class="hljs-keyword">const</span> subComponent = <span class="hljs-keyword">this</span>.props.subComponent
    <span class="hljs-keyword">return</span> listCollection.map(<span class="hljs-function">(<span class="hljs-params">v, k</span>) =&gt;</span> {
      v.isCollapse = openListIdCollection.indexOf(k) === <span class="hljs-number">-1</span>
      <span class="hljs-keyword">return</span> React.cloneElement(subComponent, {
        <span class="hljs-attr">data</span>: v,
        <span class="hljs-attr">onChange</span>: <span class="hljs-keyword">this</span>.handleListChange,
        <span class="hljs-attr">id</span>: k,
        <span class="hljs-attr">key</span>: k,
      })
    })
  }
</code></pre>
<h5>data:object</h5>
<p>渲染所需要的数据,里面会包含一个 key 为 isCollapse 的参数，用来标识当前这个组件需要展示的状态。</p>
<h5>id</h5>
<p>由 Collapse 传递给的 ID，作为当前 Collapse 下面的唯一标识。</p>
<h5>onChange(id, nextCollapse:bool)</h5>
<p>组件需要在自己状态发生变化时调用这个函数来告诉 Collapse 组件当前变化的组件的 ID 和 它的下一个状态。</p>
</div>`
      }

      render() {
        return (
          <section ref='container' />
        )
      }
    }
  