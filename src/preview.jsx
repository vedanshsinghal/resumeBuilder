import "./preview.css"
function Preview({data,link,edu,exp,skill}){
    return(
    <>
        <h1>Resume Preview</h1>
        <div className="ResumePage">
            <div className="Pinfo">
                <div>{data.name}</div>
                <div>{data.phone}</div>
                <div>{data.email}</div>
            </div>
            <div className="links">
                {link.map((item)=>(
                    <div key={item.id}>
                        <div>{item.link}</div>
                    </div>))}
            </div>
            <div className="education">
                {edu.map((item)=>(
                    <div key={item.id}>
                        <div>{item.school}</div>
                        <div>{item.degree}</div>
                        <div>{item.course}</div>
                        <div>{item.grade}</div>
                        <div>{item.time}</div>
                    </div>
                ))}
            </div>
            <div className="experience">
                {exp.map((item)=>(
                    <div key={item.id}>
                        <div>{item.organisation}</div>
                        <div>{item.role}</div>
                        <div>{item.description}</div>
                        <div>{item.time}</div>
                    </div>
                ))}
            </div>
            <div className="skills">
                {skill.map((item)=>(
                    <div key={item.id}>
                        <div>{item.skill}</div>
                    </div>
                ))}
            </div>
        </div>
    </>)
}

export default Preview