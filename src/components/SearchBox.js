import React from 'react'


export default function SearchBox(props) {
    return (
        <>
            <select className='h-10 mx-8 px-4 rounded-md bg-black text-white font-semibold ' onChange={(e) => {
                props.setSelectedGender(e.target.value);
            }}>
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <div className="">
                <div className="relative flex w-full flex-wrap items-stretch ">
                    <input
                        onChange={(e) => {
                            props.setSearchQuary(e.target.value);
                        }}
                        type="search"
                        className="relative w-60 m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 text-gray dark:placeholder:text-neutral-500 dark:focus:border-primary"
                        placeholder="Search your data"
                        aria-label="Search"
                        aria-describedby="button-addon1" />

                    <button
                        className="relative z-[2] flex items-center rounded-r bg-[#38a092] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                filerule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
