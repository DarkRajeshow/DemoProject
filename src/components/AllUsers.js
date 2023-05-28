import React, { useContext, useEffect } from 'react';
import UsersNotFound from './UsersNotFound';
import { Link } from 'react-router-dom';
import { Context } from '../App';

export default function AllUsers() {
  const {
    allusers,
    noUser,
    getUserDataById,
    SearchQuary,
    selectedGender,
    handleSearch,
    loading,
  } = useContext(Context);

  useEffect(() => {
    handleSearch();
  }, [SearchQuary, selectedGender]);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                All Users
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>

         
          {(!noUser && !loading) && (
            <div className="grid grid-cols-3 -m-4">
              {allusers.map((user) => (
                <Link
                  className="col-span-1 p-4"
                  onClick={() => {
                    getUserDataById(user._id);
                  }}
                  key={user._id}
                  to="/yourdata"
                >
                  <div className="p-6 rounded-lg h-[420px] userCard bg-[#f6fffc]">
                    <img
                      className="rounded w-full object-cover object-center mb-6"
                      src={'https://dummyimage.com/720x400'}
                      alt="content"
                    />
                    <div className="cardText">
                      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                        Last Updated: {user.date.slice(0, 10)}
                      </h3>
                      <h2 className="text-2xl text-gray-900 font-medium title-font my-2 mb-3">
                        {user.fullName}
                      </h2>
                      <h2 className="text-md text-gray-500 font-medium title-font mb-1">
                        Since: {user.DOB}
                      </h2>
                      <h2 className="text-md text-gray-500 font-medium title-font mb-3">
                        Gender: {user.gender}
                      </h2>
                      <p className="leading-relaxed text-base text-black">
                        {`${user.description.length > 50 ? user.description.slice(0, 35) + '...' : user.description}`}
                      </p>
                    </div>
                    {/* <button >View Data</button> */}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {noUser && <UsersNotFound />}
        </div>
      </section>
    </>
  );
}
