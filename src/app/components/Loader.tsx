'use client'
import React from 'react';

function Loader() {
  React.useEffect(() => {
    async function getLoader() {
      const { treadmill } = await import('ldrs')
      treadmill.register()
    }
    getLoader()
  }, [])
  
  return(
    <div className='h-full w-full grid place-content-center'>
      <l-treadmill
        size="50"
        speed="1.5" 
        color="black" 
      ></l-treadmill>
    </div>
  )
}

export default Loader;