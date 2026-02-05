import "./info.css"

function PersonalInfo({data,setData,link,setLink,edu,setEdu,exp,setExp,skill,setSkill}){

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
    return(
        <div className="Info">
            <div>
                <h1>Personal Info</h1>
                <input type="text" placeholder="Full Name" name="name" value={data.name} onChange={handleInfoChange}/>
                <input type="text" placeholder="Phone no." name="phone" value={data.phone} onChange={handleInfoChange} />
                <input type="text" placeholder="Email" name="email" value={data.email} onChange={handleInfoChange} />
            </div>
            <div>
                <h1>Links</h1>
                {link.map((item)=>(
                    <div key={item.id}>
                        <input type="text" placeholder="Link" name="link" value={item.link} onChange={(e)=>handleListChange(e,item.id,link,setLink)}/>
                        <input type="text" placeholder="URL" name="url" value={item.url} onChange={(e)=>handleListChange(e,item.id,link,setLink)}/>
                    </div>
                ))}
                <button className="addBtn" onClick={() => addMore(link, setLink, {link: "" ,url:""})}>+ Add Link</button>
            </div>
            <div>
                <h1>Education Info</h1>
                {edu.map((item)=>(
                    <div key={item.id}>
                        <input type="text" placeholder="University/School" name="school" value={item.school} onChange={(e)=>handleListChange(e,item.id,edu,setEdu)}/>
                        <input type="text" placeholder="Degree" name="degree" value={item.degree} onChange={(e)=>handleListChange(e,item.id,edu,setEdu)}/>
                        <input type="text" placeholder="Course" name="course" value={item.course} onChange={(e)=>handleListChange(e,item.id,edu,setEdu)}/>
                        <input type="text" placeholder="Grade" name="grade" value={item.grade} onChange={(e)=>handleListChange(e,item.id,edu,setEdu)}/>
                        <input type="text" placeholder="From-To" name="time" value={item.time} onChange={(e)=>handleListChange(e,item.id,edu,setEdu)}/>
                    </div>))}
                <button className="addBtn" onClick={() => addMore(edu, setEdu, { school: "", degree: "",course:"", grade: "", time: "" })}>+ Add Education</button>
            </div>  
            <div> 
                <h1>Experience</h1>
                {exp.map((item)=>(
                    <div key={item.id}>
                        <input type="text" placeholder="Organisation" name="organisation" value={item.organisation} onChange={(e)=>handleListChange(e,item.id,exp,setExp)}/>
                        <input type="text" placeholder="Role" name="role" value={item.role} onChange={(e)=>handleListChange(e,item.id,exp,setExp)}/>
                        <input type="text" placeholder="Description" name="description" value={item.description} onChange={(e)=>handleListChange(e,item.id,exp,setExp)}/>
                        <input type="text" placeholder="From-To" name="time" value={item.time} onChange={(e)=>handleListChange(e,item.id,exp,setExp)}/>
                    </div>))}
                <button className="addBtn" onClick={() => addMore(exp, setExp, { organisation: "", role: "",description:"",time: "" })}>+ Add Experience</button>
            </div>
            <div>
                <h1>Skills</h1>
                {skill.map((item)=>(
                    <div key={item.id}>
                        <input type="text" placeholder="Add Skill" name="skill" value={item.skill} onChange={(e)=>handleListChange(e,item.id,skill,setSkill)}/>
                    </div>))}
                <button className="addBtn" onClick={() => addMore(skill, setSkill, { skill: "" })}>+ Add Skill</button>
            </div>
        </div>
    )

}

export default PersonalInfo