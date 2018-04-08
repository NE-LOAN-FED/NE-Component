export default interface CollapseProps {
  activeIdList: Array<number>,
  accordion: boolean, // 手风琴模式
  onListChange: (id, collapse, openListIdCollection) => void
}

export interface CollapseSubProps {
  title: any;
  isActive: boolean;
  children: JSX.Element;
  onListChange: () => void;
  id?: number | string;
}
