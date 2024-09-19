import { useState , useCallback, useEffect , useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(7)
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const[password , setPassword] = useState("")
   
     

  const passwordGenerator = useCallback(()=>{
    let pass =""
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     
    if(numberAllowed) char += "1234567890"
     if(charAllowed) char += "!@#$%^&*()_+="
    for(let i = 0; i<= length; i++){
      
      let str = Math.floor(Math.random() * char.length + 1)
       
       pass += char.charAt(str)

    }

    setPassword(pass)
     
  

  }, [length , numberAllowed , charAllowed ,setPassword])

  useEffect(()=>{
  passwordGenerator()

  },[ length , numberAllowed , charAllowed ,passwordGenerator]);


  const passwordRef = useRef()

  const copyPasswordToClipboard = useCallback(()=>{
     passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  },[ password])
    
  
  return (

      <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
      
      
      </>    
    
    
    
  )
}

export default App
