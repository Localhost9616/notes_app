import React from 'react'

const sampleNote = (props) => {
  return (
    <div className='sampleNote'>
        <div className="timeStamps">
            <p>{props.time}</p>
            <p>{props.date}</p>
        </div>
        <div className="message">
            <p>{props.message}</p>
        </div>
    </div>
  )
}

export default sampleNote;