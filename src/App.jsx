import { useState } from 'react'
import PersonalInfo from './personalInfo'
import Preview from './preview'
import "./style.css"

function App() {
  const [pinfo,setPinfo]=useState({
    name:"Vedansh Singhal",
    phone:"7011994120",
    email:"vedansh.singhal.ug23@nsut.ac.in",
  })
  const [link,setLink]=useState([{
    id:1,link:"leetcode"
  }])
  const [education,setEducation]=useState([{
    id:1, school:"NSUT", degree:"BTech",course:"ICE", grade:"8.15" ,time:"2023-2027"
  }
  ])
  const [experience,setExperience]=useState([{
    id:1, time:"2026-2027", organisation:"Google" , role:"SDE intern" , description:"WEUP"
  }])

  const [skills,setSkills]=useState([{
    id:1,skill:"Django"
  }])
  return(
    <div className="container">
      <div className="left">
        <PersonalInfo data={pinfo} setData={setPinfo} link={link} setLink={setLink} edu={education} setEdu={setEducation} exp={experience} setExp={setExperience} skill={skills} setSkill={setSkills}/>
        
      </div>
      <div className="right">
        <Preview data={pinfo} link={link} edu={education} exp={experience} skill={skills}/>
      </div>
    </div>
  )
}

export default App
