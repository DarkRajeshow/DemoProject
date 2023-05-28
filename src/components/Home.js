import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img className="object-cover object-center rounded" alt="hero" src="images/hero.jpg" />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Want to get your data?
              <br className="hidden lg:inline-block" />
            </h1>
            <code className='bg hljs language-javascript'>let be = "ok";</code>
            <p className="mb-8 leading-relaxed">Unlock the power to effortlessly recover your precious data by simply clicking on the diverse range of options provided below. Explore the array of choices at your disposal and embark on a seamless journey towards retrieving your invaluable information with utmost ease.</p>
            <div className="flex justify-center">
              <Link to='/allusers'><button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Find Your Data</button></Link>
              <Link to='/about'><button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Know More</button></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
