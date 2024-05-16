import classNames from 'classnames/bind';
import React from 'react';
import styles from './TextWithLinks.module.scss';

const cn = classNames.bind(styles);

export default function TextWithLinks({ text }: { text: string }) {
  const pattern = /(https?:\/\/\S+)/g;
  const matches = text.match(pattern) || [];

  let lastIndex = 0;
  const elements = matches.map((url, index) => {
    const startIndex = text.indexOf(url, lastIndex);
    const nonLinkText = text.substring(lastIndex, startIndex);
    lastIndex = startIndex + url.length;

    return (
      <React.Fragment key={index}>
        {nonLinkText}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('link')}
        >
          {url}
        </a>
      </React.Fragment>
    );
  });

  if (lastIndex < text.length) {
    elements.push(
      <React.Fragment key={matches.length}>
        {text.substring(lastIndex)}
      </React.Fragment>,
    );
  }

  return <div>{elements}</div>;
}
