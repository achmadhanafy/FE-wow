import React from 'react'
import frame from '../assets/Frame.png'
import poster from '../assets/headerPoster.png'
import image from '../assets/headerImage.png'

function HeaderCard() {
    return (
        <div style={{backgroundImage:`url(${frame})`,width:'943px',height:'380px',backgroundSize:'100% 100%'}}>
            <div className="flex items-center" style={{height:'100%'}}>
            <img src={poster} className="ml-8 mb-5" width="544px" alt=""/>
            <img src={image} width="251px" style={{height:'320px'}} className="pb-4 ml-8" alt=""/>
            </div>
        </div>
    )
}

export default HeaderCard
