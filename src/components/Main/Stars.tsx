import React from 'react';
import Star from './Star';

const Stars = (props: any) => {
  return (
    <>
      {Array.from({ length: props.maxStars || 5 }).map((_, i) => {
        return (
          <Star
            key={i}
            size={props.starSize}
            distance={props.distance}
            offset={props.offset - i}
          />
        );
      })}
    </>
  );
};

export default Stars;
