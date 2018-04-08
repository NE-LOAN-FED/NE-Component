export default interface VerifyButtonPropsType {
  isSending: boolean;
  text: string;
  times: number;

  isCanSend(): boolean;

  handleClick(): void;
}
