import React from 'react';

let prev = 0;
const Group = (props) => {
  const openNotes = ()=>{
    console.log("click");
    let Allnotes = JSON.parse(localStorage.getItem('notesList'))
    let val = JSON.parse(localStorage.getItem('count'));
    let val2 = JSON.parse(localStorage.getItem('groupNumber'));
    localStorage.setItem('selected', true);
    console.log(localStorage.getItem('selected'));
  }
  const sendDataToParent = () => {
    const data = props.id ;
    document.getElementsByClassName('group')[prev].style.background = 'white';
    document.getElementsByClassName('group')[data].style.background = '#F7ECDC';
    prev = data;
    props.sendDataToParent(data);
  };
  return (
    <>
    <div onClick={sendDataToParent} className="group" id='group'>
        <div style={{background: props.iconColor}} className="icon">{props.shortform}</div>
        <div className="name">{props.name}</div>
    </div>
    </>
  )
}

export default Group;