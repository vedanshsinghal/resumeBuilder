import "./preview.css"
import nsutLogo from "./assets/image.png"

function Preview({data,link,edu,exp,skill}){
    return(
    <>
        <h1>Resume Preview</h1>
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
            <div className="experience">
                <div className="section-heading">INTERNSHIPS</div>
                {exp.map((item)=>(
                    <div key={item.id}>
                        <div className="expHead subHeading">
                            <div>{item.role} , {item.organisation}</div>
                            <div className="expTime">{item.time}</div>
                        </div>
                        <div>{item.description}</div>
                    </div>
                ))}
            </div>
            <div className="SKILLS">
                <div className="section-heading">Skills</div>
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