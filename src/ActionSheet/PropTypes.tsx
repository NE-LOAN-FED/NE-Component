export default interface ActionSheetProps {
  title?: string;
  show: boolean;
  menus: Array<any>;
  showCancel?: boolean;
  cancelText?: string;
  autoClose?: boolean;
  onClose: () => void;
  onMenuClick: (key: string | number) => void;
}
