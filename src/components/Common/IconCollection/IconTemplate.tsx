import React, { MouseEvent } from 'react';

export interface IconTemplateProps {
  width?: string;
  height?: string;
  viewBox?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => void;
}

export default function IconTemplate({
  width = '24',
  height = '24',
  viewBox = '0 0 24 24',
  className,
  children,
  onClick,
}: IconTemplateProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      className={className}
      onClick={onClick}
      /* 임시로 인라인 스타일로 지정. 추후 변경 */
      style={onClick && { cursor: 'pointer' }}
    >
      {children}
    </svg>
  );
}
