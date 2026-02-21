import "./info.css"

function PersonalInfo({visibility,setVisibility,por,setPor,data,setData,link,setLink,edu,setEdu,exp,setExp,skill,setSkill,project,setProject,achievement,setAchievement,other,setOther}){

    function handleInfoChange(e){
        const { name, value } = e.target;
        setData({...data,[name]: value})
    }
    function handleListChange(e,id,list,setList){
        const {name,value}=e.target
        const updatedList = list.map((item) => {
            if (item.id === id) {
                return { ...item, [name]: value }
        }
            return item })
        setList(updatedList)
    }

    function addMore(list,setList,template){
        setList([...list,{
            id:crypto.randomUUID(),...template
        }])
    }

    function handleDelete(id,list,setlist){
        const update=list.filter((item)=>item.id!==id)
        setlist(update)
    }
    
    return(
        <div className="Info">
            <div className="section">
                <div className="sectionHead">
                <h1>Personal Info</h1></div>
                <div className="inputAll">
                    <input type="text" placeholder="Full Name" name="name" value={data.name} onChange={handleInfoChange}/>
                    <input type="text" placeholder="Phone no." name="phone" value={data.phone} onChange={handleInfoChange} />
                    <input type="text" placeholder="Email" name="email" value={data.email} onChange={handleInfoChange} />
                </div>
            </div>
            <div className="section">
                <div className="sectionHead">
                <h1>Links</h1></div>
                {link.map((item)=>(
                    <div key={item.id} className="inputAll">
                        <input type="text" placeholder="Link" name="link" value={item.link} onChange={(e)=>handleListChange(e,item.id,link,setLink)}/>
                        <input type="text" placeholder="URL" name="url" value={item.url} onChange={(e)=>handleListChange(e,item.id,link,setLink)}/>
                        <button className="delete-btn" onClick={() => handleDelete(item.id, link, setLink)}>✖</button>    
                    </div>
                ))}
                <button className="addBtn" onClick={() => addMore(link, setLink, {link: "" ,url:""})}>+ Add Link</button>
            </div>
            <div className="section">
                <div className="sectionHead">
                <h1>Education Info</h1></div>
                {edu.map((item)=>(
                    <div key={item.id} className="inputAll">
                        <input type="text" placeholder="University/School" name="school" value={item.school} onChange={(e)=>handleListChange(e,item.id,edu,setEdu)}/>
                        <input type="text" placeholder="Degree" name="degree" value={item.degree} onChange={(e)=>handleListChange(e,item.id,edu,setEdu)}/>
                        <input type="text" placeholder="Grade" name="grade" value={item.grade} onChange={(e)=>handleListChange(e,item.id,edu,setEdu)}/>
                        <input type="text" placeholder="From-To" name="time" value={item.time} onChange={(e)=>handleListChange(e,item.id,edu,setEdu)}/>
                        <button className="delete-btn" onClick={() => handleDelete(item.id, edu, setEdu)}>✖</button>    
                    </div>))}
                <button className="addBtn" onClick={() => addMore(edu, setEdu, { school: "", degree: "",course:"", grade: "", time: "" })}>+ Add Education</button>
            </div>  
            <div className="section"> 
                <div className="sectionHead">
                <h1>Internships</h1>
                <input type="checkbox" checked={visibility.experience} onChange={() => setVisibility({...visibility,  experience: !visibility.experience })}></input>
                </div>
                {exp.map((item)=>(
                    <div key={item.id} className="inputAll">
                        <input type="text" placeholder="Organisation" name="organisation" value={item.organisation} onChange={(e)=>handleListChange(e,item.id,exp,setExp)}/>
                        <input type="text" placeholder="Role" name="role" value={item.role} onChange={(e)=>handleListChange(e,item.id,exp,setExp)}/>
                        <input type="text" placeholder="From-To" name="time" value={item.time} onChange={(e)=>handleListChange(e,item.id,exp,setExp)}/>
                        <button className="delete-btn" onClick={() => handleDelete(item.id, exp, setExp)}>✖</button>    
                        <div><textarea className="longer_the_input" type="text" placeholder="Description" name="description" value={item.description} onChange={(e)=>handleListChange(e,item.id,exp,setExp)}/></div>
                    </div>))}
                <button className="addBtn" onClick={() => addMore(exp, setExp, { organisation: "", role: "",description:"",time: "" })}>+ Add Experience</button>
            </div>
            <div className="section">
                <div className="sectionHead">
                <h1>Projects</h1>
                <input type="checkbox" checked={visibility.projects} onChange={() => setVisibility({...visibility,  projects: !visibility.projects })}></input>
                </div>
                {project.map((item)=>(
                    <div key={item.id} className="inputAll">
                        <input type="text" placeholder="Title" name="title" value={item.title} onChange={(e)=>handleListChange(e,item.id,project,setProject)}/>
                        <input type="text" placeholder="Time" name="time" value={item.time} onChange={(e)=>handleListChange(e,item.id,project,setProject)}/>
                        <button className="delete-btn" onClick={() => handleDelete(item.id, project, setProject)}>✖</button>    
                        <div className="inputTextarea">
                            <textarea className="longer_the_input" placeholder="Description" name="description" value={item.description} onChange={(e)=>handleListChange(e,item.id,project,setProject)} rows="5" />
                        </div>
                    </div>))}
                <button className="addBtn" onClick={() => addMore(project, setProject, { title: "", description:"",time: "" })}>+ Add Project</button>
            </div>
            <div className="section">
                <div className="sectionHead">
                    <h1>Achievements</h1>
                    <input type="checkbox" checked={visibility.achievement} onChange={() => setVisibility({...visibility,  achievement: !visibility.achievement })}></input>
                </div>
                {achievement.map((item)=>(
                    <div key={item.id} className="inputAll">
                        <input className="longer_the_input" type="text" placeholder="Add Achievement" name="achievement" value={item.achievement} onChange={(e)=>handleListChange(e,item.id,achievement,setAchievement)}/>
                        <button className="delete-btn" onClick={() => handleDelete(item.id, achievement, setAchievement)}>✖</button>    
                    </div>))}
                <button className="addBtn" onClick={() => addMore(achievement, setAchievement, { achievement: "" })}>+ Add Achievement</button>
            </div>
            <div className="section">
                <div className="sectionHead">
                    <h1>PORs</h1>
                    <input type="checkbox" checked={visibility.por} onChange={() => setVisibility({...visibility,  por: !visibility.por })}></input>
                </div>
                {por.map((item)=>(
                    <div key={item.id} className="inputAll">
                        <input className="longer_the_input" type="text" placeholder="POR" name="por" value={item.por} onChange={(e)=>handleListChange(e,item.id,por,setPor)}/>
                        <button className="delete-btn" onClick={() => handleDelete(item.id, project, setProject)}>✖</button>    

                        <div className="inputTextarea">
                            <textarea className="longer_the_input" placeholder="Description" name="description" value={item.description} onChange={(e)=>handleListChange(e,item.id,por,setPor)} rows="5" />
                        </div>
                    </div>))}
                <button className="addBtn" onClick={() => addMore(por, setPor, { por: "", description:"" })}>+ Add POR</button>
            </div>
            <div className="section">
                <div className="sectionHead">
                    <h1>Technical Skills</h1></div>
                {skill.map((item)=>(
                    <div key={item.id} className="inputAll">
                        <input className="longer_the_input" type="text" placeholder="Add Skill" name="skill" value={item.skill} onChange={(e)=>handleListChange(e,item.id,skill,setSkill)}/>
                        <button className="delete-btn" onClick={() => handleDelete(item.id, skill, setSkill)}>✖</button>                        
                    </div>))}
                <button className="addBtn" onClick={() => addMore(skill, setSkill, { skill: "" })}>+ Add Skill</button>
            </div>
            <div className="section">
                <div className="sectionHead">
                    <h1>Other Skills</h1></div>
                {other.map((item)=>(
                    <div key={item.id} className="inputAll">
                        <input className="longer_the_input" type="text" placeholder="Add Skill" name="skill" value={item.skill} onChange={(e)=>handleListChange(e,item.id,other,setOther)}/>
                        <button className="delete-btn" onClick={() => handleDelete(item.id, other, setOther)}>✖</button>                    
                    </div>))}
                <button className="addBtn" onClick={() => addMore(other, setOther, { skill: "" })}>+ Add Skill</button>
            </div>
        </div>
    )

}

export default PersonalInfo