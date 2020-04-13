/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'

export const DateFormatter = ({date}) => (
  <span>
    <i className="far fa-calendar" style={{paddingRight: `${5}px`}} /> {(new Date(date)).toDateString()}
  </span>
);
