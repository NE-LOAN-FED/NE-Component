export default interface NoticeBarProps {
  type: 'link' | 'closable' | '';
  onClose: () => void;
  onClick: (e) => void;
  icon: JSX.Element;
  closeIcon: boolean;
}
