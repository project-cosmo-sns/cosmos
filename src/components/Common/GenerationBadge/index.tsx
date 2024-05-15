import styles from './Generation.module.scss';
import classNames from 'classnames/bind';

type GenerationType = {
  generationInfo: number | null;
  authorizationStatus?: 'NONE' | 'PENDING' | 'ACCEPT';
};

const cn = classNames.bind(styles);

export default function GenerationBadge({
  generationInfo,
  authorizationStatus,
}: GenerationType) {
  const generationColor = [
    ['#FFEAEA', '#FF5151'],
    ['#FFE1CC', '#FF7512'],
    ['#FFF1BE', '#E2B000'],
    ['#DDF2C8', '#65C900'],
    ['#D5EEFF', '#0098FF'],
    ['#F0E4FF', '#9747FF'],
  ];

  // 미인증 상태 처리
  if (authorizationStatus === 'NONE' || generationInfo === null) {
    return <div className={cn('waiting')}>미인증</div>;
  }

  const colorIndex = (generationInfo - 1) % generationColor.length;
  // 유효한 범위 내에서 인덱스를 참조하고 있는지 확인하는 추가적인 검증 절차
  // undefined일 경우,  배열의 범위를 벗어난 인덱스를 참조하게 될 수도 있기 때문!
  // undefined일 경우엔 white를 기본값으로
  const colorInfo = generationColor[colorIndex] || ['$white-01', '$black-01'];

  const [backgroundColor, color] = colorInfo;
  const generationStyle = {
    backgroundColor,
    color,
  };

  // 현재 가입된 admin 계정들 (우리계정ㅎ) 경우엔
  // 인증 상태는 true지만 기수 정보가 null이라 뱃지에 기수 입력이 안됩니당..
  return (
    <div className={cn('generation-container')} style={generationStyle}>
      {generationInfo}기
    </div>
  );
}
