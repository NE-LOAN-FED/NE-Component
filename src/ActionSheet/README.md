# ActionSheet
选择列表
# 示例
```js
import React from 'react'
import { ActionSheet } from 'ne-rc'
import { Link } from 'react-router'
export default function ({show = false, items, handleClick, className, ...others}) {
  items = items || [
    <Link to='/a'>《使用授权书》</Link>,
    <Link to='/b'>《服务协议》</Link>,
    <a onClick={handleClick} className='cancel'>取消</a>
  ]
  return (
    <div className={classname({
      component_agreement: true,
      [className]: className
    })} {...others}>
      <p>点击打开<a onClick={handleClick}>协议</a></p>
      <ActionSheet
        show={show}
        menus={items}
        onClose={handleClick}
        isClickMaskToClose
      />
    </div>
  )
}
```
# API
属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
show | 是否显示 | Boolean | false
menus | Action 列表 | Array | []
onClose | 关闭回调 | Function | ()=>{}
isClickMaskToClose | 是否开启点击遮罩关闭 | Boolean | false
