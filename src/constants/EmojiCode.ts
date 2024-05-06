import { EmojiCode } from '@/@types/type';
import EmojiCheckIcon from '@/components/Common/EmojiCollection/EmojiCheckIcon';
import EmojiHeartIcon from '@/components/Common/EmojiCollection/EmojiHeartIcon';
import EmojiLaughIcon from '@/components/Common/EmojiCollection/EmojiLaughIcon';
import EmojiMeIcon from '@/components/Common/EmojiCollection/EmojiMeIcon';
import EmojiSadIcon from '@/components/Common/EmojiCollection/EmojiSadIcon';
import EmojiThumbsUpIcon from '@/components/Common/EmojiCollection/EmojiThumbsUpIcon';

export const EMOJI_ICON: Record<EmojiCode, string | React.ElementType> = {
  CHECK: EmojiCheckIcon,
  THUMBSUP: EmojiThumbsUpIcon,
  SAD: EmojiSadIcon,
  ME: EmojiMeIcon,
  HEART: EmojiHeartIcon,
  LAUGH: EmojiLaughIcon,
};

export const EMOJI_CODE: EmojiCode[] = Object.keys(EMOJI_ICON) as EmojiCode[];
