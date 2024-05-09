export default interface FollowButtonType {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isFollowButton: boolean | undefined;
  isActive?: boolean | undefined;
}
