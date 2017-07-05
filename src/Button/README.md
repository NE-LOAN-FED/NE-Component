# Button
按钮组件，展示型组件，不包含特定功能。

## 代码示例

```js
class Test extends React.Component {
 handleClick = (e) => {
    console.log(e.target)
  }
  render() {
    return(
      <section>
        <div className="page--header">
          <h1 className="page-title">Button</h1>
          <p className="page--desc">按钮</p>
        </div>
        <Button onClick={this.handleClick}>Button Primary</Button>
        <Button loading>with loading</Button>
        <Button role={'secondary'} icon='success'>Button Secondary</Button>
        <Button disabled={true}>Button Disabled</Button>
        <Button style={'rightAngle'}>Button Primary</Button>
        <Button style={'rightAngle'} role={'secondary'}>Button Secondary</Button>
        <Button style={'rightAngle'} disabled={true}>Button Disabled</Button>
        <Button size={'small'}>Small Button</Button><Button size={'small'} disabled={true}>Small Button</Button>
      </section>
    )
  }
}
```

## API

属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
prefixCls | 样式前缀 | String | NEUI
role | 按钮规则，主按钮还是备选按钮 | oneOf(['primary', 'secondary']) | primary
style | 拐角类型 | oneOf(['normal', 'rightAngle']) | normal
disabled | 类型 | Boolean | false
size | 大小 | oneOf(['normal', 'small']) | false
loading | 是否显示加载中按钮 | Boolean | | false
icon | 是否显示icon | String |  
