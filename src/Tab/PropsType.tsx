export interface TabItemPropsType {
  title: string;
  disabled?: boolean;
  isShow?: boolean;
}

export interface TabPropsType {
  defaultActiveIndex: number | string;
  activeIndex: number | string;
  animated: boolean;

  onChange(index: number | string): void;

}
