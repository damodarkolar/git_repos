import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import  { RepoBox } from "./RepoBox";
import axios from "axios"


let RepoSearchPage=()=>{
    const [data, setData]=useState([]);
    const [searchString, setsearchString]=useState("")
    const [searchKey, setSearchKey]=useState("react");
    const [curPage, setCurPage]= useState(1);
    const [noResults, setnoResults]=useState(5);
    const [sort, setSort]=useState("asc");

    useEffect(()=>{
        axios.get(`https://api.github.com/search/repositories?q="react"&per_page=${noResults}&page=${curPage}&sort=forks&order=${sort}`)
        .then(res => setData(res.data.items))
        .catch(err => console.log(err))
        console.log({searchKey,curPage,noResults})
    },[curPage,noResults,searchKey,sort]);


    let handleSearch=()=>{
        setSearchKey(searchString);
        
    }

    return(
        <>
        <div>
            <div>
                <h1>Git Repos</h1>
            </div>
            <div>
                <input id="inputBox" type="text" onChange={(e)=>setsearchString(e.target.value)}/>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
        <div style={ {display:"flex", justifyContent:"space-around"}}>
                <h2>Name</h2>
                <h2>Full Name</h2>
                <h2>Language</h2>
                <h2>Visibilty</h2>
                <h2>Forks</h2>                
            </div>
                {
                    data.map(ele => <RepoBox {...ele } key={ele.id}/>)
                    
                }
            <div>
                    <label htmlFor="noResultsPerPage">
                        Select No Repos
                    </label>
                    <label htmlFor="">{curPage}</label>
                    <select  name="" id="noResultsPerPage" onChange={(e)=> setnoResults(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <button disabled={curPage===1} onClick={() => setCurPage(prevState => prevState-1)}>Prev</button>
                    <button>{curPage}</button>
                    <button onClick={() => setCurPage(prevState => prevState+1)}>Next</button>
                    <label htmlFor="">Sort</label>
                    <button onClick={()=> setSort("asc")}>Assending</button>
                    <button onClick={() => setSort("desc")}>Desending</button>
                </div>
            </div>
        </div>
        </>
    )
}


export default RepoSearchPage