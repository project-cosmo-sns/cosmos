interface HashTagColorsType {
  code: HASH_TAG_COLOR_CODE;
}

export type HASH_TAG_COLOR_CODE =
  | 'RED'
  | 'ORANGE'
  | 'YELLOW'
  | 'GREEN'
  | 'BLUE'
  | 'PURPLE';

const HASH_TAG_COLORS: HashTagColorsType[] = [
  { code: 'RED' },
  { code: 'ORANGE' },
  { code: 'YELLOW' },
  { code: 'GREEN' },
  { code: 'BLUE' },
  { code: 'PURPLE' },
];

export { HASH_TAG_COLORS };
