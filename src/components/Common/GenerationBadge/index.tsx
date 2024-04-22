import styles from './Generation.module.scss';
import classNames from 'classnames/bind';

type GenerationType = {
  generationInfo: number | undefined;
};

const cn = classNames.bind(styles);
export default function GenerationBadge({ generationInfo }: GenerationType) {
  const generationColor = [
    '#FFEAEA ',
    '#FFE1CC',
    '#FFF1BE',
    '#DDF2C8',
    '#D5EEFF',
    '#F0E4FF ',
  ];

  if (generationInfo === undefined) {
    return <div className={cn('waiting')}>대기중</div>;
  }

  const colorIndex = generationInfo - 1;
  const selectColor = generationColor[colorIndex];
  const generationStyle = {
    backgroundColor: selectColor,
  };

  return (
    <div className={cn('generation-container')} style={generationStyle}>
      {generationInfo}기
    </div>
  );
}
