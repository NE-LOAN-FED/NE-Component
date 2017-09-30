# Button
弹窗组件

## 代码示例

```js
import {Toast, Alert, Dialog, Button} from 'ne-rc'
class ModalTest extends React.Component {
  //...othercode

  render(){
    return (
      <div>
        <Button>点击打开Toast</Button>
        <Toast content={msg} show={showToast} />

        <Button>点击打开Alert框</Button>
        <Alert
          show={showModal}
          onClose={this.closeAlert}
          isClickMaskToClose
          className='test'
        >

        <Button>点击打开Dialog对话框</Button>
        <Dialog
          headerContent={'Question'}
          show={showAlert}
          confirmContent={'Yes'}
          cancelContent={'No'}
          onConfirm={this.handleDialogConfirm}
          onCancel={this.handleDialogCancel}
        >
        Are you a beautiful girl?
        </Dialog>

      </div>
    )
  }
}
```

## API

