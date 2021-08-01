import {useRef, useState, useEffect} from "react"
import {Us} from "react-flags-select"


const Start = ({setUsername, language, setLanguage}) => { 

  const inputRef = useRef();
  const [placeholderText, setPlaceholderText] = useState("Enter your name")
  const [buttonText, setButtonText] = useState("Start")

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value)
  }

  useEffect(() => {
    switch(language){
      case "english":
        setPlaceholderText("Enter your name")
        setButtonText("Start")
        break;
      case "spanish":
        setPlaceholderText("Introduce tu nombre")
        setButtonText("Empezar")
        break;
      case "french":
        setPlaceholderText("Entrer votre nom")
        setButtonText("Commencer")
        break;
      default:
        setPlaceholderText("Enter your name")
        setButtonText("Start")
        break;
    }
  }, [language]) 
    

  

  return (
    <div className="start">
      <select defaultValue="english" className="selectLanguage" onChange={e => setLanguage(e.target.value)}>
        <option nvalue="english">English</option>
        <option value="spanish">Espanol</option>
        <option value="french">Français</option>
      </select>
      <input 
      type="text" 
      placeholder={placeholderText}
      className="startInput" ref={inputRef}/>
      <button className="startButton" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  )
}

export default Start
