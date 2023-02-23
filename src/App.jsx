import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }, [seconds]);

  const handleClick = (event) => {
    const { value } = event.target;
    setSeconds((prevSeconds) => prevSeconds + parseInt(value) * 60);
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    clearInterval(intervalRef.current);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="App">
      <div>
        <h2>Timer</h2>
        {isRunning ? (
          <>
            <p>{formatTime(seconds)}</p>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={stopTimer}>Stop</button>
            <div>
              <button onClick={handleClick} value={1}>
                Add 1 minute
              </button>
              <button onClick={handleClick} value={2}>
                Add 2 minutes
              </button>
              <button onClick={handleClick} value={5}>
                Add 5 minutes
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <button onClick={handleClick} value={1}>
                Add 1 minute
              </button>
              <button onClick={handleClick} value={2}>
                Add 2 minutes
              </button>
              <button onClick={handleClick} value={5}>
                Add 5 minutes
              </button>
            </div>
            {seconds !== 0 && (
              <div>
                <p>Time: {formatTime(seconds)}</p>
                <div>
                  <button onClick={resumeTimer}>Resume</button>
                  <button onClick={stopTimer}>Stop</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
