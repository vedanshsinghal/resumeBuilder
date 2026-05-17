import { useState,useEffect } from 'react'
import PersonalInfo from './personalInfo'
import Preview from './preview'
import "./style.css"
import "./analyse.css"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { sampleResume } from './sampleData';
import axios from "axios"

function ResumeBuilder() {
  const handlePrint=()=>{
    window.print()
  }
  const navigate=useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login')
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/resumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Show the bouncer your wristband, send JWT
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

  const handleLoadSample=()=>{
    setPinfo(sampleResume.pinfo)
    setEducation(sampleResume.education)
    setAchievement(sampleResume.achievement)
    setLink(sampleResume.link)
    setProject(sampleResume.project)
    setSkills(sampleResume.skills)
    setOther(sampleResume.other)
    setExperience(sampleResume.experience)
    setPor(sampleResume.por)
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
// Add this right below your resize useEffect
  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // If not logged in, just show the blank form

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/resumes`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();

          const normalizeData = (array) => {
             if (!array || !Array.isArray(array)) return [];
             return array.map(item => ({ ...item, id: item._id || item.id }));
          };          // Overwrite the blank React states with your saved MongoDB data!
          if (data.pinfo) setPinfo(data.pinfo);
          if (data.link) setLink(normalizeData(data.link));
          if (data.education) setEducation(normalizeData(data.education));
          if (data.experience) setExperience(normalizeData(data.experience));
          if (data.project) setProject(normalizeData(data.project));
          if (data.skills) setSkills(normalizeData(data.skills));
          if (data.achievement) setAchievement(normalizeData(data.achievement));
          if (data.other) setOther(normalizeData(data.other));
          if (data.por) setPor(normalizeData(data.por));
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

const [jobDescription,setjobDescription]=useState("")
const [analysisResult, setAnalysisResult] = useState(null);
const [isAnalysing, setIsAnalysing] = useState(false)
const handleAnalyse = async () => {
  setIsAnalysing(true);
  const token = localStorage.getItem('token');
  try {
    // send the current state of all your resume sections (pinfo, education, etc.)
    const resumeData = {education, experience, project, skills, achievement, other, por };
    
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/analyse`, {
      resumeData, jobDescription},{headers:{'Authorization': `Bearer ${token}`}
    });
    
    setAnalysisResult(response.data);
  } catch (err) {
    console.error("Analysis failed", err);
  } finally {
    setIsAnalysing(false);
  }
}
const criteria = [
                { key: "keyword_match", label: "Keyword Match" },
                { key: "work_experience", label: "Work Experience" },
                { key: "measurable_achievements", label: "Achievements" },
                { key: "education_certifications", label: "Education" },
            ]

  return(
    <div className="container">
      {(activeTab==="edit") &&(
        <div className="left">
          <div className='viewDiv'>
          {isMobile && <button className='viewBtn' onClick={() => setactiveTab('preview')}>PREVIEW</button>}
          <button className='viewBtn' onClick={()=>setactiveTab("analyse")}>ANALYSE</button>
          </div>
          <PersonalInfo visibility={visibility} setVisibility={setVisibility} por={por} setPor={setPor} other={other} setOther={setOther} data={pinfo} setData={setPinfo} link={link} setLink={setLink} edu={education} setEdu={setEducation} exp={experience} setExp={setExperience} project={project} setProject={setProject} skill={skills} setSkill={setSkills} achievement={achievement} setAchievement={setAchievement}/>
        </div>)}


      {activeTab==="analyse" &&(
        <div className='left'>
          <div className='viewDiv'>
            {<button className='viewBtn' onClick={() => setactiveTab('edit')}>EDIT</button>}
            {isMobile&&<button className='viewBtn' onClick={() => setactiveTab('preview')}>PREVIEW</button>}
          </div>
          <div className='analyseContainer'>
            <h2>Target Job Description</h2>
            <textarea className="jdInput" placeholder="Paste the job description here..." value={jobDescription} onChange={(e) => setjobDescription(e.target.value)}/>
            <button className="analyseBtn" onClick={handleAnalyse} disabled={isAnalysing}>
              {isAnalysing ? "Scanning..." : "RUN ANALYSIS"}
            </button>
            {analysisResult && (
            <div className="resultBox" style={{ borderLeftColor: analysisResult.score >= 70 ? '#28a745' : '#dc3545' }}>
              <div className="scoreSection">
                <div className='ATS'>
                <div style={{color: "#f7f7f7", fontWeight:"bold"}}>ATS SCORE</div>
                <div className="scoreCircle" style={{borderColor: analysisResult.score >= 75 ? '#28a745' : analysisResult.score >= 50 ? '#ffc107' : '#dc3545', color: analysisResult.score >= 75 ? '#28a745' : analysisResult.score >= 50 ? '#856404' : '#dc3545'}}                >
                  {analysisResult.score}%
                </div>
                </div>
                <div className='rubricScores'>
                  <div style={{color:"#28A745"}}>{analysisResult.rubric.reasoning}</div>
                  {criteria.map(({ key, label }) => (
                    <div key={key}>
                      <span>{label} : </span>
                      <span>{analysisResult.rubric_scores[key]}/{analysisResult.rubric.weights[key]}</span>
                    </div>
                ))}
                </div>
              </div>
              <div className="feedbackLists">
                <div className="feedbackCategory">
                  <h4 style={{ color: '#28a745', margin: '0 0 8px 0' }}>✅ Top Strengths</h4>
                  <ul>
                    {analysisResult.strengths.map((item, index) => (
                    <li key={index}>{item}</li>))}
                  </ul>
                </div>
                <div className="feedbackCategory">
                  <h4 style={{ color: '#dc3545', margin: '12px 0 8px 0' }}>⚠️ Areas to Improve</h4>
                  <ul>
                    {analysisResult.improvements.map((item, index) => (
                    <li key={index}>{item}</li>))}
                  </ul>
                </div>
              </div>
              
            </div>)}
            </div>
          </div>
      )}

      {(!isMobile||activeTab==="preview") &&(
        <div className="right">
          <h1 className='previewHeading'>Resume Preview</h1>
          {/* New Button Row! */}
          <div className='buttonBox'>
            <button className='printBtn' onClick={handleSave}>Save</button>
            <button className='printBtn' onClick={handlePrint}>Print</button>
            <button className='printBtn' onClick={handleLoadSample}>Load Sample</button>
            <button className='printBtn' onClick={handleLogout}>Log Out</button>
          </div>
          <div>
            {isMobile && <button className='editBtn' onClick={() => setactiveTab('edit')}>EDIT</button>}
            {isMobile && <button className='editBtn' onClick={() => setactiveTab('analyse')}>ANALYSE</button>}          
          </div>
          <div className="printWrap" style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'top center' }}>
          <Preview visibility={visibility} por={por} other={other} data={pinfo} link={link} edu={education} exp={experience} project={project} skill={skills} achievement={achievement}/>
          </div>
        </div>)}
    </div>
  )
}

export default ResumeBuilder
