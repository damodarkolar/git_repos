
import "./RepoBox.css"

export let RepoBox= (parms) =>{
    let {name,full_name,language,visibility,forks_count}=parms
    return (
        <>
        <div id="container">            
            <div>
            <h3>{name}</h3>
            <h3>{full_name}</h3>
            <h3>{language}</h3>
            <h3 >{visibility}</h3>
            <h3>{forks_count}</h3>
            </div>
            
        </div>
        </>
    )
}