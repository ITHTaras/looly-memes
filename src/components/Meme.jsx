import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import jsPDF from "jspdf";

function Meme() {
  const [meme, setMeme] = useState({
    title: "",
    topText: "Shut up",
    middleText: "",
    bottomText: "and take my money",
    img: "https://i.imgflip.com/3si4.jpg",
  });
  const [memeData, setMemeData] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemeData(data.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  function getMemeImg() {
    const randomID = Math.floor(Math.random() * memeData.length);
    const url = memeData[randomID].url;

    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        img: url,
      };
    });
  }

  function exportPDF() {
    const memeArea = document.querySelector(".meme");
    html2canvas(memeArea, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      console.log(imgWidth, imgHeight);
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("meme.pdf");
    });
  }

  return (
    <main>
      <div className="form">
        <input
          id="input-title"
          type="text"
          name="title"
          placeholder="Title"
          className="form--input"
          value={meme.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="topText"
          placeholder="Top text"
          className="form--input"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          id="middle"
          type="text"
          name="middleText"
          placeholder="Middle text (optional)"
          className="form--input"
          value={meme.middleText}
          onChange={handleChange}
        />
        <input
          id="bottom"
          type="text"
          name="bottomText"
          placeholder="Bottom text"
          className="form--input"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getMemeImg} className="form--button">
          Get a new meme image 🖼️
        </button>
        <h2 className="meme--title">{meme.title}</h2>

        <div className="meme">
          <img src={meme.img} className="meme--image" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text middle">{meme.middleText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>

        <button onClick={() => exportPDF()} className="form--button">
          Download🔥
        </button>
      </div>
    </main>
  );
}

export default Meme;
