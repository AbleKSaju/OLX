import React from 'react'
import './Shimmer.css'

const shimmer = () => {
  return (
    <div className='d-flex'>
    <div className="posters d-flex">
      {Array(6).fill('').map(e=><div className='smallPosterShimmer'> </div>)}
      </div>
    </div>

  )
}

export default shimmer