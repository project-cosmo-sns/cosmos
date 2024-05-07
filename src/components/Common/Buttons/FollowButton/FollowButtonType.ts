export default interface FollowButtonType {
  onClick: (
    isActive: boolean,
  ) => void | React.MouseEventHandler<HTMLButtonElement>;
  isFollowButton: boolean | undefined;
  isActive?: boolean | undefined;
}
