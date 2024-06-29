import classNames from 'classnames/bind';
import styles from './ScrapButton.module.scss';
import { useState } from 'react';

interface ScrapButtonProps {
  handleClickScrap: (isClicked: boolean) => void;
  isScraped: boolean;
  // scrapCount: number;
}

const cn = classNames.bind(styles);

export default function ScrapButton({
  handleClickScrap,
  isScraped,
  // scrapCount,
}: ScrapButtonProps) {
  const [isClicked, setIsClicked] = useState(isScraped);

  return (
    <div className={cn('wrapper')}>
      <svg
        className={cn('scrap-icon')}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        // 스크랩 시 임시로 색상 설정. 추후 색상 변경 예정
        fill={isClicked ? '#A0A5BB' : 'none'}
        onClick={() => {
          setIsClicked(!isClicked);
          handleClickScrap(isClicked);
        }}
      >
        <path
          d="M21 2.66667V22.1315L12.8321 16.6862C12.3282 16.3503 11.6718 16.3503 11.1679 16.6862L3 22.1315V2.66667C3 2.24777 3.17766 1.83083 3.51916 1.5121C3.86298 1.1912 4.34319 1 4.85714 1H19.1429C19.6568 1 20.137 1.1912 20.4808 1.5121C20.8223 1.83083 21 2.24777 21 2.66667Z"
          stroke="#A0A5BB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* <span className={cn('scrap-count')}>{scrapCount}</span> */}
    </div>
  );
}
