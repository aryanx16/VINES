import React from 'react'

const Issue = () => {
  function r (){let a =0; setTimeout(()=>{console.log(a);a++;r()},1000)
 }
  return (
    <div>
      <ul>

        <li>Build Profile page</li>
        <li>in about techstack used</li>
        <li> report bugs page </li>
        <li>comments?</li>
        <li>for category add choices</li>
        <li>Add ml model for recommendation</li>
        <li>prevent nsfw videos</li>
        
      </ul>
    </div>
  )
}

export default Issue
