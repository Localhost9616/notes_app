import React, {useEffect, useState } from 'react'
import './Style.css'
import Image1 from './Assets/Images/+.png'
import Image2 from './Assets/Images/img.png'
import Group from './components/group'
import Send from './Assets/Images/send.png'
import Header from './components/header'
import SampleNote from './components/sampleNote'

const Page1 = (props) => {
  const savednotes = ()=>{
    let notes = localStorage.getItem('notesList')
    if(notes){
      return JSON.parse(notes);
    }else{
      return [];
    }
  }
  const savednotesArr = ()=>{
    let notes = localStorage.getItem('notesArr')
    if(notes){
      return JSON.parse(notes);
    }else{
      return [];
    }
  }
  const savedCount = ()=>{
    let cnt = localStorage.getItem('count')
    if(cnt){
      return JSON.parse(cnt);
    }else{
      return 0;
    }
  }
  savednotesArr()
  const textArea = document.getElementById('textArea');
  const [text, setText] = useState("");
  const [notesArr, setNotesArr] = useState(savednotesArr());
  const [Allnotes, setAllNotes] = useState(savednotes());
  const [List, SetGroupList] = useState([]);
  const [count, setCount] = useState(savedCount);
  const [selected, setSelected] = useState(false);
  const [groupNumber, setGroupNumber] = useState(6);

  const date = new Date();
  let hours = date.getHours() % 12;
  let minutes = date.getMinutes();
  let amPm = hours>12 ? 'AM' : 'PM';
  if(hours === 0){
    hours = 12;
  }
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  let day = date.getDate();
  let month = date.toLocaleString('default', { month: 'long' });
  let year = date.getFullYear();

  let makeNewNote = (text)=>{
    const arr = {
      'time': `${hours} : ${minutes} ${amPm}`,
      'date': `${day}  ${month}  ${year}`,
      'message': text
    }
    if(((selected) && (groupNumber !== Allnotes.length)) && (props.list.length > 1)){
      let item = [...Allnotes[groupNumber],arr]
      Allnotes[groupNumber] = item;
    }else{
      setNotesArr((notesArr) =>[...notesArr, arr]);
    }
  }
  useEffect(()=>{
    localStorage.setItem('notesArr', JSON.stringify(notesArr))
    localStorage.setItem('notesList', JSON.stringify(Allnotes))
    localStorage.setItem('count', JSON.stringify(count))
    localStorage.setItem('groupNumber', JSON.stringify(groupNumber))
    localStorage.setItem('selected', JSON.stringify(selected))
  },[notesArr])
  
  useEffect(()=>{
    setTimeout(()=>{
      const storedItems = localStorage.getItem('groupsList');
      if(storedItems || storedItems.length > 0){
        SetGroupList(JSON.parse(storedItems));
      }
    },200) 
      if(props.list.length === count){
        setAllNotes((Allnotes) => [...Allnotes, notesArr]);
        setNotesArr([]);
        setCount(count+1);
      }
      setSelected(false);
      // setGroupNumber(Allnotes.length-1);
    
        
  },[props.list]);
  
  const changeText = (e)=>{
    setText(e.target.value);
  }
  const makeNotes = ()=>{
    if(text !== ''){
      makeNewNote(text);
      textArea.value = '';
      setText("");
    }
  }
  const openModalBox = ()=>{
    document.getElementById("modalBox").style.display = 'flex';
    document.getElementById("page1").style.overflow = 'hidden';
  }
  
  const handleDataFromChild = (data) => {
    setGroupNumber(data+2);
    setSelected(true);
  };
  if(selected){
    document.getElementById('defaultPage').style.display = 'none';
    document.getElementById('notesSection').style.display = 'block';
  }
  const mediaQuery = window.matchMedia('(max-width: 650px)')
  const mediaQuery2 = window.matchMedia('(max-width: 500px)')
  const mediaQuery3 = window.matchMedia('(max-width: 400px)')
  if (mediaQuery.matches) {
    setTimeout(() => { 
      document.getElementById('butn').innerText = 'Create Group';
    }, 200);
  }
  if (mediaQuery2.matches) {
    setTimeout(() => { 
      document.getElementById('butn').style.fontSize = '110%';
      document.getElementById('page1').style.fontSize = '80%';
    }, 20);
  }
  if (mediaQuery3.matches) {
    setTimeout(() => { 
      if(selected){
        document.getElementById('defaultPage').style.display = 'none';
        document.getElementById('notesSection').style.display = 'block';
        document.getElementById('notesSection').style.width = '100vw';
        document.getElementById('page1').style.fontSize = 'medium';
        document.getElementById('groupSection').style.display = 'none';
        document.getElementById('butn').style.display = 'none';
        document.getElementById('heading').style.paddingLeft = '2%';
        document.getElementById('heading').style.paddingTop = '2%';
        document.getElementById('notes').style.height = '65%';
        document.getElementById('textBox').style.height = '25%';
      }else{
        document.getElementById('groupSection').style.width = '100vw';
        document.getElementById('defaultPage').style.display = 'none';
        document.getElementById('notesSection').style.display = 'none';

      }
    }, 20);
  }
  return (
    <div className='page1' id='page1'>
        <div className="groupSection" id='groupSection'>
          <div className="heading" id='heading'>
            <p>Pocket Notes</p>
          </div>
          <div className="newGroup">
            <button onClick={openModalBox} className="btn">
              <img src={Image1} alt="Error" />
              <p id='butn'>Create Notes group</p>
            </button>
          </div>
          <div className="groups">
          {List.map((group, index) => <Group key={index} id={index} name={group.groupName} shortform={group.shortForm} iconColor={group.colour} sendDataToParent={handleDataFromChild}/>)}
          </div>
        </div>
        <div className='defaultPage' id='defaultPage'>
          <div className="textDiv">
            <img src={Image2} alt="Error" />
            <h2>Pocket Notes</h2>
            <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          </div>
          <div className="footer">
            <p>	&#128274; end to end encrypted</p>
          </div>
        </div>
        <div className="notesSection" id='notesSection'>
          <div className="header" id='header'>
            {(props.list.length > 0) ? <Header heading = {(selected) ? props.list[groupNumber-2].groupName : props.list[props.list.length-1].groupName} shortform = {(selected) ? props.list[groupNumber-2].shortForm : props.list[props.list.length-1].shortForm} color = {(selected) ? props.list[groupNumber-2].colour : props.list[props.list.length-1].colour}/> : ''}
          </div>
          <div className="notes" id='notes'>
            {(groupNumber < Allnotes.length && (selected === true)) ? Allnotes[groupNumber].map((note)=> <SampleNote date={note.date} time={note.time} message={note.message}/>) : notesArr.map((note)=> <SampleNote date={note.date} time={note.time} message={note.message}/>)}
          </div>
          <div className="textBox" id='textBox'>
            <textarea onChange={changeText} name="message" id="textArea" cols="30" rows="10" placeholder='Enter your text here....'></textarea>
            <button onClick={makeNotes} className='sendBtn' type='submit'><img src={Send} alt="Error" /></button>
          </div>
        </div>
    </div>
  )
}

export default Page1