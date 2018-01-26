export default interface CollapseProps {
  openListIdCollection: Array<number>,
  listCollection: Array<any>,
  accordion: boolean, // 手风琴模式
  onListChange: (id, collapse, openListIdCollection) => void,
  subComponent: JSX.ElementClass
}


export interface CollapseSubProps {
  isCollapse: boolean;
  data: {
    title: any;
    content: any;
  };
  onSubComponentChange: () => void;
}
