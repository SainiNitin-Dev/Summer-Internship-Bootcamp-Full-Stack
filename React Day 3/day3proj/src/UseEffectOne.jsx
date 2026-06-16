import { useState, useEffect } from 'react'

const UseEffectOne = () => {
  const [count, setCount] = useState(0)
  const [countTwo, setCountTwo] = useState(0)

  useEffect(() => {
    if (count > 0) {
      alert('You clicked the first button!')
    }

    return () => {
      // clean-up / unmounting function
    }
  }, [count])

  useEffect(() => {
    // runs only on mount, never again
    return () => {
      // clean-up / unmounting function
    }
  }, [])

  const handleClick = () => {
    setCount(count + 1)
  }

  const handleClickTwo = () => {
    setCountTwo(countTwo + 1)
  }

  return (
    <div>
      <button onClick={handleClick}>Button 1: {count}</button>
      <button onClick={handleClickTwo}>Button 2: {countTwo}</button>
    </div>
  )
}

export default UseEffectOne