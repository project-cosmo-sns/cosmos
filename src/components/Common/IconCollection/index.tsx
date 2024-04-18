interface IconCollectionType {
  width?: string;
  height?: string;
  fill?: string;
  className?: string;
}

/**
 * SVG 아이콘을 컴포넌트 형태로 출력합니다. 네이밍 기준은 기존 images 폴더에 삽입되어있던 이름+Icon으로 명명했습니다. (정렬: a-z)
 * @param {Object} props 아이콘에 적용할 속성들을 포함하는 객체
 * @param {string} [props.width] SVG 아이콘의 width값. 입력하지 않을 경우 기본값이 사용됩니다.
 * @param {string} [props.height] SVG 아이콘의 height값. 입력하지 않을 경우 기본값이 사용됩니다.
 * @param {string} [props.fill] SVG 아이콘의 색상 값. 입력하지 않을 경우 기본값이 사용됩니다.
 * @param {string} [props.className] 커스텀 className 지정
 * @returns {JSX.Element} SVG 태그 아이콘
 */

export function AddIcon({
  width = '25',
  height = '24',
  fill = 'black',
  className,
}: IconCollectionType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      className={className}
    >
      <circle cx="12.5" cy="12" r="12" fill={fill} />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.627 6C13.224 6 13.7081 6.54855 13.7081 7.22523V17.027C13.7081 17.7037 13.224 18.2523 12.627 18.2523C12.0299 18.2523 11.5459 17.7037 11.5459 17.027V7.22523C11.5459 6.54855 12.0299 6 12.627 6Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.5 12.126C6.5 11.5289 7.04855 11.0449 7.72523 11.0449H17.527C18.2037 11.0449 18.7523 11.5289 18.7523 12.126C18.7523 12.7231 18.2037 13.2071 17.527 13.2071H7.72523C7.04855 13.2071 6.5 12.7231 6.5 12.126Z"
        fill="white"
      />
    </svg>
  );
}

// export function Example({
//   width = '25',
//   height = '24',
//   fill = 'black',
//   className,
// }: IconCollectionType) {
//   return (

//   );
// }

export function GlassIcon({
  width = '25',
  height = '24',
  fill = 'black',
  className,
}: IconCollectionType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 24"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2586 2.3908C6.6372 2.3908 2.8908 6.1372 2.8908 10.7586C2.8908 15.38 6.6372 19.1264 11.2586 19.1264C15.88 19.1264 19.6264 15.38 19.6264 10.7586C19.6264 6.1372 15.88 2.3908 11.2586 2.3908ZM0.5 10.7586C0.5 4.8168 5.3168 0 11.2586 0C17.2004 0 22.0172 4.8168 22.0172 10.7586C22.0172 16.7004 17.2004 21.5172 11.2586 21.5172C5.3168 21.5172 0.5 16.7004 0.5 10.7586Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.3953 16.8943C17.8534 16.4363 18.5961 16.4363 19.0541 16.8943L24.1565 21.9967C24.6146 22.4548 24.6146 23.1974 24.1565 23.6555C23.6984 24.1136 22.9557 24.1136 22.4977 23.6555L17.3953 18.5531C16.9372 18.0951 16.9372 17.3524 17.3953 16.8943Z"
        fill={fill}
      />
    </svg>
  );
}
