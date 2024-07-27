import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function fetchApi(e){
      e.preventDefault()
      const baseurl = 'https://forms-io.onrender.com/submit-form/7b7d3778-a1a9-4098-a60f-8b19515efdc1'
      if(!name || !email || !message){
        return toast.warn('Fill out the empty space seh')
      }
      setLoading(true)
     try {
        const responds = await fetch(baseurl, {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({name,email,message})
        })
        .then((res)=> res.json())
        if(responds){
          toast.success('Submitted')
          setLoading(false)
        }
      } 
      catch (error) {
       toast.error('Shaby check your network connection')
      }
    }

  return (
    <div className='bg-black h-full text-black flex flex-col gap-8 p-10 max-md:h-[100vh]' >
      <div className='flex items-center justify-center'><h1>FETCHING A FORM API FOR MY LOVE</h1></div>
      <form className='flex flex-col gap-5 items-center h-full w-full'>
        <input className='w-[20%] h-[40px] p-2 outline-none max-md:w-[80vw] rounded-xl' type="text" name='name'  placeholder='Enter Your Name ' value={name} onChange={(e) => setName(e.target.value)} />
        <input className='w-[20%] h-[40px] p-2 outline-none max-md:w-[80vw] rounded-xl' type="email" name='email' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <textarea className='w-[20%] h-[150px] p-2 outline-none max-md:w-[80vw] rounded-xl' name="message" placeholder='Express your feelings tell me how much you love me' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        <button className='bg-[#FFFF00] px-5 py-2 font-bold rounded-2xl text-black' type='submit' onClick={fetchApi}>{loading ? 'sending...' : 'send'}</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default App
