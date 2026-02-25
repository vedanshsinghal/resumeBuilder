import { useState,useEffect } from 'react'
import PersonalInfo from './personalInfo'
import Preview from './preview'
import "./style.css"

function App() {
  const handlePrint=()=>{
    window.print()
  }
  const [pinfo,setPinfo]=useState({
    name:"",
    phone:"",
    email:"",
  })
  const [link,setLink]=useState([{
    id:1,link:"",url:""
  }])
  const [education,setEducation]=useState([{
    id:1, school:"", degree:"", grade:"" ,time:""
  }
  ])
  const [experience,setExperience]=useState([{
    id:1, time:"", organisation:"" , role:"" , description:""
  }])

  const [project, setProject]=useState([{
    id:1, time:"" ,title:"", description:""
  }])

  const [skills,setSkills]=useState([{
    id:1,skill:""
  }])
  const [achievement,setAchievement]=useState([{
    id:1,achievement:""
  }])
  const [other,setOther]=useState([{
    id:1,skill:""
  }])
  const [por,setPor]=useState([{
    id:1,por:"", description:""
  }])
  const [visibility,setVisibility]=useState({
    projects:true,
    experience:true,
    achievement:true,
    por:true
  })
  
  const [activeTab,setactiveTab]=useState("edit")
  const [windowWidth,setwindowWidth]=useState(window.innerWidth)
  const [windowHeight,setwindowHeight]=useState(window.innerHeight)
  const isMobile=windowWidth<=1024

  useEffect(() => {
  const handleResize = () => {
    setwindowWidth(window.innerWidth)
    setwindowHeight(window.innerHeight)
  }
  // Attach the event listener to the browser window
  window.addEventListener('resize', handleResize);

  // Remove the listener when the component unmounts 
  // return only runs when unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // The empty array [] means this setup only runs once when the component mounts
const availableWidth = isMobile ? windowWidth : (windowWidth * 0.4);
const widthScale=(availableWidth - 40) / 800
// 1. Get the workable height (Screen height minus 150px for UI)
const workableHeight = windowHeight - 110; 
// 2. Divide by the pixel-equivalent of 297mm (1123px)
const heightScale = workableHeight / 1123;
  // 2. Calculate perfect scale based on available space (minus 40px for some breathing room)
const scaleFactor = Math.min(heightScale,widthScale)

  return(
    <div className="container">
      {(!isMobile||activeTab==="edit") &&(
        <div className="left">
          {isMobile && <div className='viewDiv'><button className='viewBtn' onClick={() => setactiveTab('preview')}>Preview</button></div>}
          <PersonalInfo visibility={visibility} setVisibility={setVisibility} por={por} setPor={setPor} other={other} setOther={setOther} data={pinfo} setData={setPinfo} link={link} setLink={setLink} edu={education} setEdu={setEducation} exp={experience} setExp={setExperience} project={project} setProject={setProject} skill={skills} setSkill={setSkills} achievement={achievement} setAchievement={setAchievement}/>
        </div>)}
      {(!isMobile||activeTab==="preview") &&(
        <div className="right">
          <h1 className='previewHeading'>Resume Preview</h1>
          <button className='printBtn' onClick={handlePrint}>Print</button>
          {isMobile && <button className='editBtn' onClick={() => setactiveTab('edit')}>Edit Info</button>}
          <div style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'top center' }}>
          <Preview visibility={visibility} por={por} other={other} data={pinfo} link={link} edu={education} exp={experience} project={project} skill={skills} achievement={achievement}/>
          </div>
        </div>)}
    </div>
  )
}

export default App
