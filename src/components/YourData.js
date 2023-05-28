import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../App';

export default function YourData() {

  let { currentUserData, deleteUserById, saving } = useContext(Context);

  let handleDelete = () => {
    let check = window.confirm("Are you sure to delete this Data.");
    if (check) {
      deleteUserById(currentUserData._id)
    }
  }
  return (
    <>
      <div className="container mt-40 w-3/4 mx-auto " id='font-poppins'>
        <h1 className='text-center text-5xl font-extrabold leading-normal'>Welcome, <span className='text-[#4780ed] uppercase'>{`${currentUserData.fullName ? currentUserData.fullName.split(" ")[0] : "User"}`} !</span><br />Your valuable data is kept secured.</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="font-bold mb-2 text-4xl uppercase mt-5">{currentUserData.fullName}</h2>
          <p className="text-gray-500 mb-2 font-semibold text-2xl mt-5">
            Date of Birth: {currentUserData.DOB}
          </p>
          <p className="text-gray-500 mb-2 text-2xl font-semibold mt-5">
            Gender: {currentUserData.gender}
          </p>
          <p className="text-gray-500 text-2xl font-semibold mt-5">Description : {currentUserData.description}</p>
          <p className="text-blue-300 text-2xl font-semibold mt-5">Last Updated : {`${currentUserData.date ? currentUserData.date.slice(0, 10) : "Not Known"}`}</p>
        </div>
        <div className="flex w-96">
          <Link to={'/updateuser'} className='w-full m-5 ml-0'><button disabled={saving} className={`${saving ? "bg-gray-400" : ""} uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline mr-5`}>
            Update Data
          </button></Link>

          <button disabled={saving} onClick={handleDelete} className={`${saving ? "bg-gray-400" : ""} uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline ml-0 m-5`} >
            Delete Data
          </button>
        </div>



      </div >
    </>
  )
}


