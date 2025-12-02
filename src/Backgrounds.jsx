import React from 'react';

// Simple gradient background component
const SimpleBackground = ({ colors = ['#0f172a', '#1e293b', '#334155'], style = {} }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${colors.join(', ')})`,
    zIndex: -1,
    ...style
  }} />
);

export const SectionBackgrounds = {
  home: SimpleBackground,
  devops: SimpleBackground,
  fullstack: SimpleBackground,
  ai: SimpleBackground,
  uiux: SimpleBackground,
  cloud: SimpleBackground,
  showcase: SimpleBackground,
  contact: SimpleBackground
};
