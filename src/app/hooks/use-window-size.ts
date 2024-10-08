'use client'
import React from 'react'

function useWindowSize() {
  const [width, setWidth] = React.useState<number>(0)
  const [height, setHeight] = React.useState<number>(0)
  
  React.useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth)  
      setHeight(window.innerHeight)  
    }
    
    window.addEventListener('resize', updateSize)
    
    updateSize()
    
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  return { width, height }
}

export default useWindowSize;