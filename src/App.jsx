import { useState , useCallback , useEffect , useRef } from 'react';
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [specialcharacter, setSpecialCharacter] = useState(false);

  //useRef Hook
  const passwordRef = useRef(null);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,length+1);
    window.navigator.clipboard.writeText(password);
  },[password])

  

  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number){
      str += "0123456789"
    }
    if(specialcharacter){
      str += "~!@#$%^&*()_-{}[]"
    }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(char); 
    }

    setPassword(pass);

  },[length,number,specialcharacter,setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [length,number,specialcharacter,passwordGenerator])


  return (
    <div className='container'>
      <div className='component'>
      <h1 className='title'>Password Generator</h1>
      <div className="inputs">
        <input 
        type="text"
        value = {password}
        placeholder='Password' 
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPassword}
        >Copy</button>
      </div>
      <div className="check">
        <div className="length">
        <input 
        type="range"
        min={1}
        max={100}
        value={length}
        onChange={(e)=>{
          setLength(e.target.value)
        }}
        />
        <label>Length : {length}</label>
        </div>
        <div className="number">
          <input 
          type="checkbox"
          defaultChecked={number}
          onChange={(e)=>{
            setNumber((prev)=>!prev)
          }}
          />
          <label>Number</label>
        </div>

        <div className="Character">
          <input 
          type="checkbox"
          defaultChecked={specialcharacter}
          onChange={(e)=>{
            setSpecialCharacter((prev)=>!prev)
          }}
          />
          <label>Special Character</label>
        </div>
      </div>
      </div>
    </div>
  )
}

export default App
