import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../App';

export default function UpdataMyData() {
    let { currentUserData, handleUpdate, saving } = useContext(Context);

    const [fullName, setFullName] = useState(currentUserData.fullName || '');
    const [gender, setGender] = useState(currentUserData.gender || '');
    const [DOB, setDOB] = useState(currentUserData.DOB || '');
    const [description, setDescription] = useState(currentUserData.description || '');


    useEffect(() => {
        setFullName(currentUserData.fullName);
        setGender(currentUserData.gender);
        setDOB(currentUserData.DOB);
        setDescription(currentUserData.description);
    }, [currentUserData]);

    return (
        <>
            <div className="w-full p-8 my-4 mt-28 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mx-auto rounded-2xl shadow-2xl">
                <div className="flex">
                    <h1 className="font-bold uppercase text-5xl">Save your data on <br /> <p className='text-red-300'>Cloud</p></h1>
                </div>
                <form onSubmit={((event) => {
                    event.preventDefault();
                    const formData = new FormData(event.target);
                    const formdatamain = {};

                    for (let pair of formData.entries()) {
                        formdatamain[pair[0]] = pair[1];
                    }

                    handleUpdate(formdatamain, currentUserData._id);
                })}>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                        <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            type="text" value={fullName} placeholder='Full Name*' onChange={(event) => {
                                setFullName(event.target.value)
                            }} name='fullName' />

                        <select name="gender" className="w-full bg-gray-100 text-green-900 mt-2 rounded-lg focus:outline-none focus:shadow-outline p-3" value={gender} placeholder='Gender*' onChange={(event) => {
                            setGender(event.target.value)
                        }} >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input name="photo" className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            type="file" placeholder="Photo*" />

                        <input name="DOB" className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            type="date" value={DOB} placeholder='Date Of Birth*' onChange={(event) => {
                                setDOB(event.target.value)
                            }} />
                    </div>
                    <div className="my-4">
                        <textarea value={description} placeholder='Message*' onChange={(event) => {
                            setDescription(event.target.value);
                        }} className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" name='description'></textarea>
                    </div>
                    <div className="my-2 w-1/2 flex">
                        <button disabled={saving} className={`${saving ? "bg-gray-400" : ""} uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline mr-5`} type='submit'>
                            Update Data
                        </button>


                        <Link to={'/yourdata'}>
                            <button disabled={saving} className={`${saving ? "bg-gray-400" : ""} uppercase text-sm font-bold tracking-wide bg-gray-300 text-black-100 hover:bg-green-900 hover:text-white p-3 rounded-lg w-full focus:outline-none focus:shadow-outline`} type='reset'>
                                ← Back
                            </button>
                        </Link>
                    </div>
                </form >
            </div >
        </>
    )
}
