import "./app.css";
import {useState, useEffect, useMemo} from "react"
import Trivia from "./components/Trivia";
import useSound from "use-sound"
import {dataEN, dataFR, dataES} from "./data"
import Timer from "./components/Timer"
import Start from "./components/Start"
import hurrah from "./assets/hurrah.mp3"

function App() {
  const [username, setUsername] = useState(null)
  const [language, setLanguage] = useState("english")
  const [questionNumber, setQuestionNumber] = useState(1)
  const [stop, setStop] = useState(false)
  const [earned, setEarned] = useState("€ 0")
  const [win] = useSound(hurrah)

  const moneyPyramid = useMemo(() => 
    [
      {id:1, amount: "€ 100"},
      {id:2, amount: "€ 200"},
      {id:3, amount: "€ 300"},
      {id:4, amount: "€ 500"},
      {id:5, amount: "€ 1000"},
      {id:6, amount: "€ 2000"},
      {id:7, amount: "€ 4000"},
      {id:8, amount: "€ 8000"},
      {id:9, amount: "€ 16000"},
      {id:10, amount: "€ 32000"},
      {id:11, amount: "€ 64000"},
      {id:12, amount: "€ 125000"},
      {id:13, amount: "€ 250000"},
      {id:14, amount: "€ 500000"},
      {id:15, amount: "€ 1000000"},
    ].reverse()
  , []) 

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber-1).amount)
  }, [moneyPyramid, questionNumber])


  const getData = () => {
    switch(language){
      case "english":
        return dataEN;
      case "spanish":
        return dataES;
      case "french":
        return dataFR;
      default:
        return dataEN;
    }
  }


  useEffect(() => {
    if(questionNumber === 16){
      setEarned(moneyPyramid.find(m => m.id === questionNumber -1).amount)
      setStop(true)
      win()
    }
  }, [questionNumber, win, moneyPyramid])
  

  const getendText = () => {
    switch(language){
      case "english": 
        if(questionNumber < 3){
          return `You earned ${earned}`
        } else if (questionNumber < 9){
          return `Not bad ${username}! you earned ${earned}`
        } else {
          return `Wow ${username}! you earned ${earned}`
        }
      case "spanish":
        if(questionNumber < 3){
          return `Ganaste ${earned}`
        } else if (questionNumber < 9){
          return `¡Bien ${username}! Ganaste ${earned}`
        } else {
          return `¡Enhorabuena ${username}! you earned ${earned}`
        }
      case "french":
        if(questionNumber < 3){
          return `Tu as gagné ${earned}`
        } else if (questionNumber < 9){
          return `Bien ${username}! Tu as gagné ${earned}`
        } else {
          return `Ouah ${username}! Tu as gagné ${earned}`
        }
      default: 
      return `${earned}`
    }
  }

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
        {stop ? <h1 className="endText">
              {getendText()}
          </h1> : (
          <>
            <div className="top">
            <div className="timer">
              <Timer setStop={setStop} questionNumber={questionNumber}/>
            </div>
          </div>
          <div className="bottom">
            <Trivia 
              data={getData()} 
              setStop={setStop} 
              setQuestionNumber={setQuestionNumber}
              questionNumber={questionNumber}
            />
          </div>
        </>
        )} 
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m, index) => (
            <li key={index} className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
              <span className="moneyListItemNumber">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
        </>
      ) : <Start setUsername={setUsername} language={language} setLanguage={setLanguage}/>}
    </div>
  );
}

export default App;
