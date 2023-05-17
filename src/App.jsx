import { useEffect, useState } from "react";
import "./App.css";
import "./responsive.css";
import { data } from "./data";

function App() {
  // console.log(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentData, setCurrentData] = useState(data[currentIndex]);
  const [play, setPlay] = useState(true);

  // ======================================================
  const imageClicked = (index) => {
    setCurrentIndex(index);
  };
  const leftClick = () => {
    const len = data.length;
    if (currentIndex === 0) {
      setCurrentIndex(len - 1);
    } else {
      setCurrentIndex((old) => {
        return old - 1;
      });
    }
  };
  const rightClick = () => {
    const len = data.length;
    if (currentIndex === len - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((old) => {
        return old + 1;
      });
    }
  };
  const playPuseClick = () => {
    setPlay((old) => !old);
  };

  // ====================================================
  useEffect(() => {
    setCurrentData(data[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    const len = data.length;
    let interval;
    if (play) {
      interval = setInterval(() => {
        setCurrentIndex((old) => (old === len - 1 ? 0 : old + 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [play, currentIndex]);

  // =========================================
  return (
    <div className="container">
      <div className="top">
        <div className="left">
          <img src={`${currentData.imagePath}`} alt="img" />
        </div>
        <div className="right">
          <h1>{currentData.heading}</h1>
          <p>{currentData.paragraph}</p>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-left">
          <button className="left-arrow" onClick={leftClick}>
            <img src="/images/left-arrow.png" alt="" />
          </button>
          {data.map((val, index, arr) => {
            if (index < 5) {
              return (
                <img
                  src={val.imagePath}
                  className={`${currentIndex === index ? "active" : ""}`}
                  alt="Img"
                  key={index}
                  onClick={() => {
                    imageClicked(index);
                  }}
                />
              );
            }
            return null;
          })}
          <button className="right-arrow" onClick={rightClick}>
            <img src="/images/left-arrow.png" alt="" />
          </button>
        </div>
        <div className="bottom-right">
          <button className="play-button" onClick={playPuseClick}>
            <img
              src={`/images/${play ? `play-button.png` : `pause.png`}`}
              alt="play"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
