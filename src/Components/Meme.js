
import React, { useState } from 'react'


export default function Meme(){

    let [meme, setMeme] = useState({
        top_text:"",
        bottom_text:"",
        randomImage:""
    })

    let [allMemes, setAllMemes] = useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random()*allMemes.length)
        const url  = allMemes[randomNumber].url
    setMeme((preState)=>{
        return {...preState,
        randomImage:url}
    })

       
    }

    function handleChange(event){
        
        let {name,value} = event.target
        setMeme(preMeme =>{
            return {...preMeme,
            [name]:value
            }
            
        })

        
    }

    

    

  


    return(
        
        <main>
            <div className="div">
                <input 
                className="div--input"
                type="text"
                name="top_text"
                placeholder="Top text"
              
                onChange={handleChange}/>
                <input 
                className="div--input"
                type="text"
                name="bottom_text"
                placeholder="Bottom text"
                
                onChange={handleChange}/>
                <button onClick={getMemeImage} className="div--button">Get a new meme image</button>
                
            </div>
            <h1 className="meme-text top">{meme.top_text}</h1>
            <h1 className="meme-text bottom">{meme.bottom_text}</h1>
            <div className='img-con'>
            <img src={meme.randomImage} className="meme--image" alt="memeImage"/>
            </div>
        </main>
    )
}