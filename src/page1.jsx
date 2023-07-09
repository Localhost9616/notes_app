import React, {useEffect, useState } from 'react'
import './Style.css'
import Image1 from './Assets/Images/+.png'
import Group from './components/group'
import Send from './Assets/Images/send.png'
import Header from './components/header'
import SampleNote from './components/sampleNote'

const page1 = () => {
  const textArea = document.getElementById('textArea');
  const [text, setText] = useState("");
  const [notesArr, setNotesArr] = useState([]);
  const date = new Date();
  let hours = date.getHours() % 12;
  let minutes = date.getMinutes();
  let amPm = hours>12 ? 'AM' : 'PM';
  if(hours === 0){
    hours = 12;
  }
  let day = date.getDate();
  let month = date.toLocaleString('default', { month: 'long' });
  let year = date.getFullYear();
  let makeNewNote = (text)=>{
    const arr = {
      'time': `${hours} : ${minutes} ${amPm}`,
      'date': `${day}  ${month}  ${year}`,
      'message': text
    }
    setNotesArr([...notesArr, arr]);
    // localStorage.setItem('chats', JSON.stringify(notesArr))
    // console.log(notesArr)
  }
  useEffect(()=>{
    localStorage.setItem('chats', JSON.stringify(notesArr))
  },[notesArr])
  
  const changeText = (e)=>{
    setText(e.target.value);
    // console.log(text);
  }
  const makeNotes = ()=>{
    if(text !== ''){
      makeNewNote(text);
      textArea.value = '';
      setText("");
    }
    // console.log(notesArr);
  }
  const openModalBox = ()=>{
    document.getElementById("modalBox").style.display = 'flex';
    document.getElementById("page1").style.overflow = 'hidden';
  }

  return (
    <div className='page1' id='page1'>
        <div className="groupSection">
          <div className="heading">
            <p>Pocket Notes</p>
          </div>
          <div className="newGroup">
            <button onClick={openModalBox} className="btn">
              <img src={Image1} alt="Error" />
              <p>Create Notes group</p>
            </button>
          </div>
          <div className="groups">
            <Group/>
            <Group/>
            <Group/>
            <Group/>
            <Group/>
            <Group/>
            <Group/>
            <Group/>
            <Group/>
            <Group/>
          </div>
        </div>
        <div className="notesSection">
          <div className="header">
            <Header/>
          </div>
          <div className="notes">
            {notesArr.map((note)=> <SampleNote date={note.date} time={note.time} message={note.message}/>)}
          </div>
          <div className="textBox">
            <textarea onChange={changeText} name="message" id="textArea" cols="30" rows="10" placeholder='Enter your text here....'></textarea>
            <button onClick={makeNotes} className='sendBtn' type='submit'><img src={Send} alt="Error" /></button>
          </div>
        </div>
    </div>
  )
}

export default page1