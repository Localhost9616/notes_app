import React, { useEffect, useState } from 'react'
import Page1 from './page1';

const page2 = () => {
  const savedData = ()=>{
    let data = localStorage.getItem('groupsList');
    if(data){
      return JSON.parse(data);
    }else{
      return [];
    }
  }
  const savedColorData = ()=>{
    let data = localStorage.getItem('color');
    if(data){
      return JSON.parse(data);
    }else{
      return 'blue';
    }
  }
  const [groupList,SetGroupList] = useState(savedData());
  const [color, setcolor] = useState('blue')
  let count = 0;

  const createGroup = ()=>{
    const groupitems = {
      'groupName' : document.querySelector('input').value,
      'shortForm' : shortForm(),
      'colour' : color,
      'notes' : localStorage.getItem('chats')
    };
    if(document.querySelector('input').value!==''){
      SetGroupList((groupList) => [...groupList, groupitems]);
    }
    
    // let sf = shortForm();
    // console.log(document.querySelector('input').value + ' ' + color + ' ' + sf);
    // console.log(groupList);
    document.getElementById("modalBox").style.display = 'none';
    document.getElementById("page1").style.overflow = 'scroll';
    count++;
  }
  useEffect(()=>{
    localStorage.setItem("groupsList" , JSON.stringify(groupList));
    localStorage.setItem("color" , JSON.stringify(color));
  },[groupList])
  const handleColorClick = (e)=>{
    const id = e.target.id;
    const colorValue = document.getElementById(id).style.background;
    setcolor(colorValue);
    // console.log(colorValue);
  }
  let name = '';
  const shortForm = ()=>{
    const arr = document.querySelector('input').value.split(' ');
    if(arr.length > 1 && arr[0].length>0 && arr[1].length>0){
      name = arr[0][0] + arr[1][0];
      // console.log(name.toUpperCase());
    }else{
      name = arr[0][0] + arr[0][1];
    }
    return name.toLocaleUpperCase();
  }
  return (
    <>
    <Page1 list={groupList}/>
    <div className='page2' id='modalBox'>
        <div className="modalBox">
            <div className="container">
                <p>Create New Notes Group</p>
                <div className="feild1">
                    <label htmlFor='Name'>Group Name : </label>
                    <input required type="text" name="groupName" id="group-name" placeholder='Enter name' />
                </div>
                <div className="feild2">
                    <label htmlFor='Colour'>Choose Colour : </label>
                    <div className="colors">
                        <button onClick={handleColorClick} className='color' id='color1' style={{background : '#B38BFA'}}></button>
                        <button onClick={handleColorClick} className='color' id='color2' style={{background : '#FF79F2'}}></button>
                        <button onClick={handleColorClick} className='color' id='color3' style={{background : '#43E6FC'}}></button>
                        <button onClick={handleColorClick} className='color' id='color4' style={{background : '#F19576'}}></button>
                        <button onClick={handleColorClick} className='color' id='color5' style={{background : '#F19576'}}></button>
                        <button onClick={handleColorClick} className='color' id='color6' style={{background : '#6691FF'}}></button>
                    </div>
                </div>
            </div>
            <button type='submit' onClick={createGroup}>Create</button>
        </div>
    </div>
    </>
  )

}

export default page2