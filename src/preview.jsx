import "./preview.css"
import nsutLogo from "./assets/image.png"

function Preview({data,link,edu,exp,skill,project,achievement,other,por,visibility}){
    return(
    <>
        <div className="ResumePage">
            <div className="header">
                <img src={nsutLogo} alt="nsut logo" className="nsutLogo"/>
                <div className="Pinfo">
                    <div className="name">{data.name}</div>
                    <div>{data.phone} | {data.email}</div>
                    {link.map((item, index) =>(
                    <span key={item.id}>
                        <a href={item.url.startsWith("http")? item.url:`https://${item.url}`} target="_blank" rel="noreferrer">
                            {item.link}
                        </a>
                        {/*(Only add if not the last item), rel is used for security idek*/}
                        {index < link.length - 1 && <span> | </span>}
                    </span>))}
                </div>
            </div>
            <div className="education">
                <div className="section-heading">EDUCATION</div>
                <table className="eduTable">
                    <tbody>
                    {edu.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.degree}</td>
                        <td>{item.time}</td>
                        <td>{item.school}</td>
                        <td>{item.grade}</td>
                    </tr>))}
                    </tbody>
                </table>
            </div>
            <div className={visibility.experience? "experience":"experience hidden"}>
                <div className="section-heading">INTERNSHIPS</div>
                {exp.map((item)=>(
                    <div key={item.id}>
                        <div className="expHead subHeading">
                            <div>{item.role}, {item.organisation}</div>
                            <div>{item.time}</div>
                        </div>
                        <ul>
                            {item.description
                            .split('\n') // 1. Split string into array wherever "Enter" was pressed
                            .filter(line => line.trim() !== "") // 2. Remove empty lines if they accidentally hit Enter twice
                            .map((line, index) => (
                                <li key={index}>
                                    {line} 
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                ))}
            </div>
            <div className={visibility.projects?"project":"project hidden"}>
                <div className="section-heading">PROJECTS</div>
                {project.map((item)=>(
                    <div key={item.id}>
                        <div className="projectHead subHeading">
                            <div>{item.title}</div>
                            <div>{item.time}</div>
                        </div>
                        <ul>
                            {item.description
                            .split('\n') // 1. Split string into array wherever "Enter" was pressed
                            .filter(line => line.trim() !== "") // 2. Remove empty lines if they accidentally hit Enter twice
                            .map((line, index) => (
                                <li key={index}>
                                    {line} 
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                ))}
            </div>
            <div className={visibility.achievement?"achievement":"achievement hidden"}>
                <div className="section-heading">ACADEMIC ACHIEVEMENTS AND AWARDS</div>
                <ul>{achievement.map((item)=>(
                    <li key={item.id}>
                        {item.achievement}
                    </li>
                ))}</ul>
            </div>
            <div className={visibility.por?"por":"por hidden"}>
                <div className="section-heading">POSITIONS OF RESPONSIBILITY</div>
                {por.map((item)=>(
                    <div key={item.id}>
                        <div className=" subHeading">
                            <div>{item.por}</div>
                        </div>
                        <ul>
                            {item.description
                            .split('\n') // 1. Split string into array wherever "Enter" was pressed
                            .filter(line => line.trim() !== "") // 2. Remove empty lines if they accidentally hit Enter twice
                            .map((line, index) => (
                                <li key={index}>
                                    {line} 
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                ))}
            </div>
            <div className="SKILLS">
                <div className="section-heading">TECHNICAL SKILLS</div>
                <ul>{skill.map((item)=>(
                    <li key={item.id}>
                        {item.skill}
                    </li>
                ))}</ul>
            </div>
            <div className="other">
                <div className="section-heading">OTHER SKILLS AND EXTRA CURRICULAR ACTIVITIES</div>
                <ul>{other.map((item)=>(
                    <li key={item.id}>
                        {item.skill}
                    </li>
                ))}</ul>
            </div>
        
        </div>
    </>)
}

export default Preview