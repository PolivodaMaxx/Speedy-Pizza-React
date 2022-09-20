import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="270" rx="3" ry="3" width="280" height="24" />
    <rect x="0" y="310" rx="6" ry="6" width="280" height="84" />
    <rect x="141" y="415" rx="23" ry="23" width="140" height="44" />
    <rect x="0" y="415" rx="10" ry="10" width="80" height="34" />
  </ContentLoader>
);

export default Skeleton;
