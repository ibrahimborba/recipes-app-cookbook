import React from 'react';
import StyledLoading from '../styled/StyledLoading';

function Loading() {
  return (
    <StyledLoading>
      <div className="dot-wave">
        <div className="dot-wave__dot">
          <span className="slider round material-icons">lunch_dining</span>
        </div>
        <div className="dot-wave__dot">
          <span className="slider round material-icons">local_bar</span>
        </div>
        <div className="dot-wave__dot">
          <span className="slider round material-icons">ramen_dining</span>
        </div>
        <div className="dot-wave__dot">
          <span className="slider round material-icons">icecream</span>
        </div>
      </div>
    </StyledLoading>
  );
}

export default Loading;
