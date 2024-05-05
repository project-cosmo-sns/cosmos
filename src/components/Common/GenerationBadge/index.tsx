import styles from './Generation.module.scss';
import classNames from 'classnames/bind';

type GenerationType = {
  generationInfo: number | undefined;
};

const cn = classNames.bind(styles);
export default function GenerationBadge({ generationInfo }: GenerationType) {
  const generationColor = [
    ['#FFEAEA', '#FF5151'],
    ['#FFE1CC', '#FF7512'],
    ['#FFF1BE', '#E2B000'],
    ['#DDF2C8', '#65C900'],
    ['#D5EEFF', '#0098FF'],
    ['#F0E4FF', '#9747FF'],
  ];

  if (generationInfo === undefined) {
    // 미인증?? 대기중??
    return <div className={cn('waiting')}>미인증</div>;
  }

  const colorIndex = (generationInfo - 1) % generationColor.length;
  // const [backgroundColor, color] = generationColor[colorIndex];

  const colorInfo = generationColor[colorIndex];
  if (colorInfo) {
    const [backgroundColor, color] = colorInfo;
    const generationStyle = {
      backgroundColor,
      color,
    };

    return (
      <div className={cn('generation-container')} style={generationStyle}>
        {generationInfo}기
      </div>
    );
  } else {
    console.log('기수정보가없당');
    return <div className={cn('waiting')}>미인증</div>;
  }
}
