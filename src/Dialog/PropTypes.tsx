import ModalPropTypes from '../Modal/PropTypes'

export default interface DialogProps extends ModalPropTypes {
  onConfirm: () => void;
  onCancel: () => void;
  headerContent: JSX.Element,
  confirmContent: JSX.Element,
  cancelContent: JSX.Element
}
