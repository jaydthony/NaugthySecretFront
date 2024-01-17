import { Link, animateScroll as scroll } from "react-scroll";
import React, { Component } from "react";

const SmoothScrollLink = ({ to, children }) => {
  const handleClick = () => {
    scroll.scrollTo(to, {
      duration: 500,
      smooth: true,
    });
  };

  return (
    <Link to={to} smooth={true} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default SmoothScrollLink;
