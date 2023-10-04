import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-5 grid gap-10 min-h-screen lg:grid-cols-2 xl:grid-cols-3 xl:place-content-center dark:bg-black">
      <div className="flex flex-col justify-between bg-white p-6 rounded-3xl shadow-xl sm:bg-teal-400 md:bg-blue-400 lg:bg-indigo-500 xl:bg-orange-400">
        <span className="font-semibold text-3xl">Select Item</span>
        <ul>
          {[1, 2, 3, 4, 5].map((item) => (
            // <li className="flex justify-between items-center my-3 first:bg-blue-50 last:bg-blue-50">
            <li className="flex justify-between items-center my-3 odd:bg-blue-100 even:bg-red-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col ml-3">
                  <span className="font-semibold">Grey Chair</span>
                  <span className="text-sm text-gray-500">Chair</span>
                </div>
              </div>
              <span className="font-semibold">$19</span>
            </li>
          ))}
        </ul>
        <ul>
          {["Chair", "Table", "Sofa", "Bed", ""].map((item, i) => (
            <li
              className="flex justify-between items-center my-3 bg-red-300 empty:hidden"
              key={i}
            >
              <div className="flex items-center  ">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col ml-3 ">
                  <span className="font-semibold ">{item}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <button
          className="mt-5 bg-blue-500 text-white p-3
        text-center rounded-xl w-full mx-auto hover:bg-teal-500 hover:text-black active:bg-yellow-300 focus:bg-red-500
       "
        >
          Checkout
        </button>
      </div>
      <div className="bg-white overflow-hidden rounded-2xl shadow-xl group">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-white text-2xl ">profile</span>
        </div>
        <div className="bg-white rounded-3xl p-6 relative -top-5">
          <div className="relative -top-16 flex justify-between items-end">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Oders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="bg-red-400 w-24 h-24 rounded-full group-hover:bg-slate-500 transition-all "></div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">spent</span>
              <span className="font-medium">$340</span>
            </div>
          </div>
        </div>
        <div className="relative -top-16 flex flex-col items-center -mb-6">
          <span className="text-lg font-medium">Tony Molly</span>
          <span className="text-sm text-gray-400">USA</span>
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl lg:col-span-2 xl:col-span-1 xl:flex xl:flex-col xl:justify-between">
        <div className="mb-5 flex justify-between items-center">
          <span>🔙</span>
          <div className="space-x-3">
            <span>★ 4.9</span>
            <span className="shadow-xl p-2  -md">❤️</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5">
          <img
            src="https://i.ibb.co/5963kz8/chair.jpg"
            alt="chair"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <div className="flex flex-col mb-2">
            <span className="font-medium">SWON Lounge</span>
            <span className="text-xs text-gray-500">Chair</span>
          </div>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-1.5">
              <button
                className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2
                ring-offset-2
                ring-offset-white
                ring-yellow-500 transition ease-in-out duration-500"
              ></button>
              <button
                className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2
                ring-offset-2
                ring-offset-white
                ring-indigo-500 transition ease-in-out duration-500"
              ></button>
              <button
                className="w-5 h-5 rounded-full bg-teal-500 focus:ring-2
                ring-offset-2
                ring-offset-white
                ring-teal-500 transition ease-in-out duration-500"
              ></button>
            </div>
            <div className="flex items-center space-x-5">
              <button className="p-1.5 bg-blue-200 flex justify-center items-center aspect-square w-10 text-xl text-gray-500 rounded-lg">
                -
              </button>
              <span>1</span>
              <button className="p-1.5 bg-blue-200 flex justify-center items-center aspect-square w-10 text-xl text-gray-500 rounded-lg">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className=" font-medium text-lg">$450</span>
            <button className="w-2/4 py-3 bg-blue-500 text-center text-white rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl ">
        <form className="flex flex-col space-y-2 bg-blue-400 p-5 focus-within:bg-red-500">
          <input
            type="text"
            placeholder="User name"
            className="required:border-2 border-yellow-400 placeholder-shown:bg-teal-500"
          ></input>
          <input
            type="password"
            required
            placeholder="password"
            className=" invalid:bg-gray-300"
          ></input>
          <input type="submit" value="submit" className="bg-white"></input>
        </form>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <form className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="User name"
            className="peer border p-1 border-gray-400 rounded-md"
          />
          <span className="hidden peer-focus:block peer-focus:text-red-300">
            This input is invalid
          </span>
          <span className="hidden peer-valid:block peer-valid:text-red-300">
            Awesom input
          </span>
          <input
            type="submit"
            value="submit"
            className="bg-white peer-focus:text-cyan-400"
          ></input>
        </form>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <details className="open:text-white open:bg-indigo-400">
          <summary className="font-semibold select-none cursor-pointer">
            Lorem ipsum dolor
          </summary>
          <p className="selection:bg-gr-400 selection:text-yellow-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            voluptas, quidem, voluptatum, quae natus voluptatibus quod
            consequuntur quibusdam quos asperiores doloribus. Quam, quibusdam
            quae. Quisquam, nemo. Quisquam, nemo. Quisquam, nemo.
          </p>
        </details>
      </div>
      {/* <div className="w-max bg-white p-10 rounded-2xl shadow-xl">
        <ul className="list-disc marker:text-teal-500">
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
        </ul>
        <input
          type="file"
          className="file:cursor-wait file:transition-all file:hover:text-purple-400 file:hover:bg-pink-800 file:border-0 file:rounded-xl file:px-4 file:bg-purple-400 bg-black text-yellow-300"
        ></input>
      </div>
      <div className="w-max bg-white p-10 rounded-2xl shadow-xl">
        <p className="first-letter:text-2xl first-letter:hover:text-purple-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          nihil magnam impedit animi doloribus quae tempora neque quos id
          cupiditate corporis ducimus, consequatur quod esse, ex provident
          adipisci officia necessitatibus.
        </p>
      </div> */}
    </div>
  );
};

export default Home;
// https://i.ibb.co/5963kz8/chair.jpg
