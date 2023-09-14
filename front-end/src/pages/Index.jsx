import React, { useState } from "react";
import Header from "../components/Header/Header";

export default function Index() {
  const [lowestValue, setLowestValue] = useState();
  const [highestValue, setHighestValue] = useState();
  const [data, setData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(process.env.REACT_APP_BACK_URL + "/challenge-1/", {
      method: "POST",
      body: JSON.stringify({ min: lowestValue, max: highestValue }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },  
    })
      .then(async (response) => {
        const res = await response.json();
        setData(res);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <main className="flex flex-col mx-4">
        <div className="flex flex-col m-auto bg-white items-center w-full md:w-[25%] mt-12 p-5">
          <h2 className="text-lg pb-4">Palíndromos</h2>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-3"
                  htmlFor="lowest-value"
                >
                  Menor Valor
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="lowest-value"
                  onChange={(e) => setLowestValue(e.target.value)}
                  value={lowestValue}
                  type="number"
                  required
                  min={0}
                  inputMode="numeric"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="highest-value"
                >
                  Maior Valor
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="highest-value"
                  type="number"
                  onChange={(e) => setHighestValue(e.target.value)}
                  value={highestValue}
                  inputMode="numeric"
                  required
                  placeholder="9999...."
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Checar Palíndromos
                </button>
              </div>
            </div>
          </form>
        </div>

        {data && (
          <div className="flex flex-col m-auto bg-white items-center w-full md:w-[25%] mt-12 p-5bg-white">
            <div>
              <h2 className="text-lg pb-4">Resultados</h2>
              <div className="pb-3 max-h-[200px] overflow-y-auto">
                {data.map((item, index) => (
                  <p key={index} className="text-sm">
                    Palíndromos: {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
