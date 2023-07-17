import React from 'react';

const Header = (props) => {
  return (
    <>
    <div className="group" style={{'background' : "#E8E8E8" , height: '100%', borderRadius:'0%', paddingLeft: '1%', width:'100%'}} >
        <div className="icon" style={{background: props.color, color: 'white', marginRight:'2%'}}>{props.shortform}</div>
        <div className="name">{props.heading}</div>
    </div>
    </>
  )
}

export default Header;