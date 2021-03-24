
import React from "react"

import Carousel from "react-elastic-carousel";
import Recommended from "./Recommended"
import "./home.css";



  const MultiCarousel =(props)=>{

    return(
      <>
    
      <Carousel className="multiple-carousel" itemsToShow={3}>
              
      <Recommended />
  
  
   </Carousel>

</>        
    )
  }
  export default MultiCarousel;
