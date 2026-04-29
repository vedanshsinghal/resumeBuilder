import { useState,useEffect } from 'react'
import PersonalInfo from './personalInfo'
import Preview from './preview'
import "./style.css"
import toast from 'react-hot-toast';

function ResumeBuilder() {
  const handlePrint=()=>{
    window.print()
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/login'; 
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error("Please log in to save your resume!"); 
      return;
    }

    // Package all your state arrays exactly as your MongoDB model expects
    const resumeData = {
      pinfo,
      link,
      education,
      experience,
      project,
      skills,
      achievement,
      other,
      por
    };
    const loadingToast = toast.loading('Saving your resume...');
    try {
      const response = await fetch('https://resumebuilderbackend-nozm.onrender.com/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Show the bouncer your wristband
        },
        body: JSON.stringify(resumeData),
      });

      if (response.ok) {
        // Success! Get rid of the loading toast and show a green success toast
        toast.dismiss(loadingToast);
        toast.success("Resume saved successfully!");
      } else {
        const errorData = await response.json();
        toast.dismiss(loadingToast);
        toast.error(`Failed to save: ${errorData.message}`); 
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.dismiss(loadingToast);
      toast.error('Could not connect to the server.'); // Changed
    }
  };
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
// Add this right below your resize useEffect
  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // If not logged in, just show the blank form

      try {
        const response = await fetch('https://resumebuilderbackend-nozm.onrender.com/api/resumes', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          // Overwrite the blank React states with your saved MongoDB data!
          if (data.pinfo) setPinfo(data.pinfo);
          if (data.link && data.link.length > 0) setLink(data.link);
          if (data.education && data.education.length > 0) setEducation(data.education);
          if (data.experience && data.experience.length > 0) setExperience(data.experience);
          if (data.project && data.project.length > 0) setProject(data.project);
          if (data.skills && data.skills.length > 0) setSkills(data.skills);
          if (data.achievement && data.achievement.length > 0) setAchievement(data.achievement);
          if (data.other && data.other.length > 0) setOther(data.other);
          if (data.por && data.por.length > 0) setPor(data.por);
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchResume();
  }, []); // Empty array ensures this only runs once when the app opens

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
          {/* New Button Row! */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
            <button className='printBtn' style={{ backgroundColor: '#4CAF50' }} onClick={handleSave}>Save</button>
            <button className='printBtn' onClick={handlePrint}>Print</button>
            <button className='printBtn' style={{ backgroundColor: '#f44336' }} onClick={handleLogout}>Log Out</button>
          </div>
          {isMobile && <button className='editBtn' onClick={() => setactiveTab('edit')}>Edit Info</button>}
          <div className="printWrap" style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'top center' }}>
          <Preview visibility={visibility} por={por} other={other} data={pinfo} link={link} edu={education} exp={experience} project={project} skill={skills} achievement={achievement}/>
          </div>
        </div>)}
    </div>
  )
}

export default ResumeBuilder
