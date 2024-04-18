import React from 'react';

export interface IconTemplateProps {
  width?: string;
  height?: string;
  viewBox?: string;
  className?: string;
  children: React.ReactNode;
}

export default function IconTemplate({
  width = '24',
  height = '24',
  viewBox = '0 0 24 24',
  className,
  children,
}: IconTemplateProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      className={className}
    >
      {children}
    </svg>
  );
}
