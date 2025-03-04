import React from "react";

const Hero = ({title, imageUrl}) => {
    return (
    <div className = "hero container" > 
      <div className ="banner">
        <h1>{title}</h1>
        <p>
            SLU is a R1 Research institute with high quality research
             and excellent teaching methodlogies of  professors.
             In SLU students can learn the practical way of learning.
             Exceptionally SLU has an open source platform with its private research institute
             innovating many things
        </p>
        </div>
        <div className = "banner">
          <img src = {imageUrl} alt = "hero" className= "animated-image"/>
          <span>
            <img src = "/Vector.png" alt = "vector" />
          </span>
        </div>
    </div>
);
};

export default Hero;