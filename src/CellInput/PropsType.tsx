export interface CellInput {
  value: string;
  name: string;
  maxLength: number;
  type: string;
  disabled: boolean;
  onChange: (value: CellInput['value']) => void;
  onFocus: (e) => void;
  onConfirm: (value: CellInput['value']) => void;
  onError: (err: string) => void;
  autoFocus: boolean;
  errorMsg: string;
  validate: (...args) => boolean | object
}
