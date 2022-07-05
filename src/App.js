import "./App.css";
import { useState, useEffect } from "react";
import { FaCheck, FaBackspace } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

function App() {
  const [word] = useState("TOUGH");
  const [playing, setPlaying] = useState(true);
  const [divisionRule, setDivisionRule] = useState(5); // divisionRule allows usage of one array as it was multiple smaller arrays
  const [displayBlocksList, setDisplayBlocksList] = useState(
    Array.from({ length: 30 }, () => {
      return { letter: "", color: "grey" };
    })
  );
  const [inputtedLettersList, setInputtedLettersList] = useState([]);

  const colorFunction = (letter, word, index) => {
    let colorIndex = index;
    if (!playing) {
      alert("Try again Tomorrow");
      return;
    }

    // reduces letter index to comparable index
    if (index > 4) {
      if (Number.isInteger(index / 5)) {
        colorIndex = 0;
      } else {
        colorIndex = (Number(String(index / 5).substring(2)) * 5) / 10;
      }
    }

    // compares and return color
    // green
    if (letter === word[colorIndex]) {
      return "#33a652";
    }
    // yellow
    if (word.includes(letter)) {
      return "#bfb834";
    } else return "grey";
  };

  const updateGrid = (checking) => {
    if (!playing) {
      alert("Try again Tomorrow");
      return;
    }

    if (inputtedLettersList.length > 30) {
      setPlaying(false);
      alert("Game Over");
      return;
    }

    // win condition
    if (checking) {
      if (inputtedLettersList.slice(-word.length).join("") === word) {
        setPlaying(false);
        alert("You Won");
      }
    }

    setDisplayBlocksList(
      displayBlocksList.map((element, index) => {
        if (checking) {
          // checks colors
          return {
            ...element,
            color: colorFunction(element.letter, word, index),
          };
        }
        // add inputted letter to display
        return { ...element, letter: inputtedLettersList[index] };
      })
    );
  };

  const handleKeyboardClick = (event, value) => {
    event.preventDefault();
    if (!playing) {
      alert("Try again Tomorrow");
      return;
    }

    if (inputtedLettersList.length > 30) {
      return;
    }

    if (
      value === "delete" &&
      inputtedLettersList.length / (divisionRule - 5) !== 1 &&
      inputtedLettersList.length !== 0
    ) {
      setDisplayBlocksList(
        displayBlocksList.map((e, i) => {
          if (i === inputtedLettersList.length - 1) {
            return { ...e, letter: "" };
          }
          return e;
        })
      );
      setInputtedLettersList(inputtedLettersList.slice(0, -1));
    }

    if (event.target.outerText) {
      if (
        Number.isInteger(inputtedLettersList.length / divisionRule) &&
        inputtedLettersList.length !== 0
      ) {
        alert("Submit First");
        return;
      }
      setInputtedLettersList([...inputtedLettersList, event.target.outerText]);
    }
  };
  useEffect(() => {
    updateGrid();
  }, [inputtedLettersList]);

  // ELEMENT KEYBOARD
  const Keyboard = () => {
    const inputs = [
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Ç",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
    ];
    // KEYBOARD RETURN
    return (
      <div
        className='inputs-container'
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10,1.9rem)",
          width: "305px",
          maxWidth: "310px",
          margin: "0 auto",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {inputs.map((element, index) => {
          return (
            <a
              key={index}
              href='#none'
              style={keyboardStyle}
              onClick={(event) => handleKeyboardClick(event)}
            >
              {element}
            </a>
          );
        })}
        <a
          style={keyboardStyle}
          href
          onClick={() => {
            if (Number.isInteger(inputtedLettersList.length / divisionRule)) {
              updateGrid(true);
              setDivisionRule(divisionRule + 5);
            } else {
              if (playing) {
                alert("Type Full Word First");
              } else alert("Try Again Tomorrow");
            }
          }}
        >
          <FaCheck />
        </a>
        <a // placeholder
          href
          onClick={(event) => event.preventDefault()}
          style={{ opacity: "0" }}
        >
          a
        </a>
        <a
          href
          style={keyboardStyle}
          onClick={(event) => handleKeyboardClick(event, "delete")}
        >
          <FaBackspace />
        </a>
      </div>
    );
  };
  // Styles
  const keyboardStyle = {
    fontSize: "1.75rem",
    textDecoration: "none",
    color: "black",
    fontWeight: "600",
    cursor: "pointer",
  };

  // MAIN RETURN
  return (
    <>
      <div className='big-container' style={{ minHeight: "85vh" }}>
        <div
          className='title'
          style={{
            margin: "0 auto",
            width: "200px",
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "2rem",
            color: "black",
            fontWeight: "600",
          }}
        >
          Wordle
        </div>
        <div
          className='letters-container'
          style={{
            display: "grid",
            justifyItems: "center",
            gridTemplateColumns: "repeat(5,1fr)",
            width: "300px",
            maxWidth: "350px",
            margin: "0 auto",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          {displayBlocksList.map((element, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: element.color,
                  width: "3rem",
                  height: "3rem",
                  margin: "5px",
                  textAlign: "center",
                }}
              >
                <p>{element.letter}</p>
              </div>
            );
          })}
        </div>
        <Keyboard />
      </div>
      {/* gitHub ref */}
      <div
        className='github'
        style={{
          textAlign: "center",
        }}
      >
        <a
          href='https://github.com/vzsoares'
          target='_blank'
          rel='noreferrer'
          className='github'
        >
          <FaGithubSquare
            style={{ color: "black", fontSize: "3rem", marginTop: "0.5rem" }}
          />
        </a>
      </div>
    </>
  );
}

export default App;
