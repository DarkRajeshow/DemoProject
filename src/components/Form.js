import React from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../App'
import { useContext } from 'react'


export default function Form(props) {
    let {handleSubmit, saving} = useContext(Context);

    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen bg-white mt-20">
                <div className="container mx-auto my-4 px-4 lg:px-20">

                    <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold uppercase text-5xl">Save your data on <br /> <p className='text-red-300'>Cloud</p></h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="Full Name*" name='fullName' />

                                <select name="gender" className="w-full bg-gray-100 text-green-900 mt-2 rounded-lg focus:outline-none focus:shadow-outline p-3">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input name="photo" className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="file" placeholder="Photo*" />
                                <input name="DOB" className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="date" placeholder="Date of Birth*" />
                            </div>
                            <div className="my-4">
                                <textarea placeholder="Message*" className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" name='description'></textarea>
                            </div>
                            <div className="my-2 w-1/2 flex">
                                {/* {console.log(saving)} */}
                                <button disabled={saving} className={`${saving ? "bg-gray-400" : ""} uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline mr-5`} type='submit'>
                                    Submit Data
                                </button>

                                <button disabled={saving} className={`${saving ? "bg-gray-400" : ""} uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline`} type='reset'>
                                    Reset Form
                                </button>
                            </div>
                        </form>
                    </div>

                    <div
                        className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl pb-2 ">
                        <div className="flex flex-col text-white">
                            <h1 className="font-bold uppercase text-4xl my-4">this is safest place to save your data.</h1>
                            <p className="text-gray-400">Lorem ipsum dolor sit amet.
                            </p>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="fas fa-phone-alt pt-2 pr-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Get Your Existing Data</h2>
                                    <Link to="/" ><button type="button" className="w-24 focus:outline-none text-white bg-[#506399] hover:bg-[#a7d2c3] focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-2 py-2.5 m-4 ml-0 dark:bg-[#506399]dark:hover:bg-[#a7d2c3] dark:hover:text-[#000000] dark:focus:ring-slate-600">Here</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </>
    )
}
