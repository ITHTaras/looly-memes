import React from "react";

function Header() {
  return (
    <header className="header">
      <img src="./src/img/troll.png" className="header--image" />
      <h2 className="header--title">Meme Generator</h2>
      <h4 className="header--project">
        <a href="http://volyn-history.c1.biz">Hornik Taras</a>
      </h4>
    </header>
  );
}

export default Header;
