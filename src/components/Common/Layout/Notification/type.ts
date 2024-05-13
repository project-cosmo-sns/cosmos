export enum notificationType {
  CREATE_FEED_COMMENT = 'CREATE_FEED_COMMENT',
  CREATE_POST_COMMENT = 'CREATE_POST_COMMENT',
  CREATE_FEED_EMOJI = 'CREATE_FEED_EMOJI',
  CREATE_POST_EMOJI = 'CREATE_POST_EMOJI',
  FOLLOW = 'FOLLOW',
}

interface NotificationType {
  type: notificationType;
  feedId?: number;
  postId?: number;
  commentId?: number;
  followerMemberId?: number;
}

interface SendMember {
  profileImageUrl: string | null;
}

interface Notification {
  id: number;
  content: string;
  notificationType: NotificationType;
  isConfirmed: boolean;
  createdAt: string;
}

export interface NotificationData {
  sendMember: SendMember;
  notification: Notification;
}

export interface NotificationResult {
  data: NotificationData[];
  meta: {
    page: number;
    take: number;
    totalCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface NotificationSettingType {
  isCommentNotification: boolean;
  isEmojiNotification: boolean;
  isFollowNotification: boolean;
}
