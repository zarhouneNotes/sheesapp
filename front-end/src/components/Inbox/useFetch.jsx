import React, { useEffect, useState } from 'react'

async function useFetch(url) {
    const [data , setData] = useState()
    const [err , setErr] = useState('')


    const fetch=  async(url)=>{

      const response =  await fetch(url , {
          method :'GET',
          headers: {
            'Content-Type': 'application/json',
          },
         })
      const res  =await response.json()
      // setData(res.)
      console.log(res)
      if(res?.status !=='ok'){
      setErr('Smoething went wrong')
      }
      
    }
  useEffect(() => {
  fetch(url)
 
  }, [url])
  
        return {data , err} 
}

export default useFetch