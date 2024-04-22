import React from 'react';

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
    },
  };
}

export default function ErrorPage() {
  return <div>ErrorPage</div>;
}
