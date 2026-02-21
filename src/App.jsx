import { useState } from 'react'
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
    id:1, time:"", organisation:"" , role:" " , description:""
  }])

  const [project, setProject]=useState([{
    id:1, time:" " ,title:"", description:""
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
  return(
    <div className="container">
      <div className="left">
        <PersonalInfo visibility={visibility} setVisibility={setVisibility} por={por} setPor={setPor} other={other} setOther={setOther} data={pinfo} setData={setPinfo} link={link} setLink={setLink} edu={education} setEdu={setEducation} exp={experience} setExp={setExperience} project={project} setProject={setProject} skill={skills} setSkill={setSkills} achievement={achievement} setAchievement={setAchievement}/>
        
      </div>
      <div className="right">
        <h1 className='previewHeading'>Resume Preview</h1>
        <button className='printBtn' onClick={handlePrint}>Print</button>
        <Preview visibility={visibility} por={por} other={other} data={pinfo} link={link} edu={education} exp={experience} project={project} skill={skills} achievement={achievement}/>
      </div>
    </div>
  )
}

export default App
