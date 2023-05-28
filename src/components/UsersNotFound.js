import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom'

export default function UsersNotFound() {
  return (
    <>
      <div className="flex justify-center">
        <div className="justify-center">
          <div className='text-center'>
            <FontAwesomeIcon icon={faFaceFrown} className="icon1 fa-3x text-5xl text-blue-400 text-center" />
          </div>
          <h3 className="text-2xl p-5 font-semibold text-center"><Link to="/home">Oops, No Results Found!</Link></h3>
          <p className="text-lg text-center">It's because there is no user in the database.</p>
        </div>
      </div>
    </>
  )
}
