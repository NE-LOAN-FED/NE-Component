import IconProps from '../Icon/PropsType'

export default interface ToastProps {
  content: string;
  icon?: IconProps['type'];
  timeout: number

  onClose(): void;
}
