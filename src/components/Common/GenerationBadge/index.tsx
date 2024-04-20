import styles from './Generation.module.scss';
import classNames from 'classnames/bind';

type GenerationType = {
  generationInfo: number;
};

const cn = classNames.bind(styles);
export default function GenerationBadge({ generationInfo }: GenerationType) {
  const generationColor = [
    '#FFB6C1 ',
    '#a8a8a8',
    '#E6E6FA',
    '#F0E68C',
    '#FFE4B5',
    '#FFA07A ',
  ];

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
