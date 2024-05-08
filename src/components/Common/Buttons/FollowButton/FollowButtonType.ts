export default interface FollowButtonType {
  onClick: (
    isActive: boolean,
  ) => Promise<void> | React.MouseEventHandler<HTMLButtonElement>;
  isFollowButton: boolean | undefined;
  isActive?: boolean | undefined;
}
