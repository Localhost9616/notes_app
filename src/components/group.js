import React from 'react';
import SampleNote from './sampleNote';

let prev = 0;
const group = (props) => {
  const openNotes = ()=>{
    console.log("click");
    let Allnotes = JSON.parse(localStorage.getItem('notesList'))
    // Allnotes[6].map((note)=> note)
    let val = JSON.parse(localStorage.getItem('count'));
    let val2 = JSON.parse(localStorage.getItem('groupNumber'));
    localStorage.setItem('selected', true);
    console.log(localStorage.getItem('selected'));
  }
  // let arr = document.querySelectorAll('#group');
  // console.log(arr);
  // arr.map(()=>{
  //   document.getElementById('group').addEventListener('click', (e)=>{console.log(e.target)})
  // })
  const sendDataToParent = () => {
    const data = props.id ;
    document.getElementsByClassName('group')[prev].style.background = 'white';
    document.getElementsByClassName('group')[data].style.background = '#F7ECDC';
    // document.querySelector('icon')[data].style.background = props.iconColor;
    console.log(props.iconColor)
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

export default group;