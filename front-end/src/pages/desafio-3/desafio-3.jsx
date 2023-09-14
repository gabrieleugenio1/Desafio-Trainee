import { useState } from "react";
import Header from "../../components/Header/Header";

export default function DesafioTres() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [doorsCar, setDoorsCar] = useState("");
  const [passengers, setPassengers] = useState("0");
  const [data, setData] = useState();
  const [error, setError] = useState()

  const actualYear = (e) => {
    const selectedYear = e.target.value;
    const currentYear = new Date().getFullYear();

    if (selectedYear <= currentYear) {
      setYear(selectedYear);
      setError(""); 
    } else {
      setError("O ano não pode ser maior que o ano atual");
    }
  };

  const handleDoorsChange = (e) => {
    setDoorsCar(e.target.value);
    if (e.target.value !== "0") {
      setPassengers("0");
    }
  };

  const handleSubmit = async (e) => {
    console.log(brand, model, year, doorsCar, passengers)
    e.preventDefault();
    await fetch(process.env.REACT_APP_BACK_URL + "/challenge-3/", {
      method: "POST",
      body: JSON.stringify({ brand: brand, model: model, year: year, doorsCar: doorsCar, passengers: passengers}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (response) => {
        const res = await response.json();
        setData(res);
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <>
      <Header />
      <main className="flex flex-col mx-4">
        <div className="flex flex-col m-auto bg-white items-center w-full md:w-[30%] mt-12 p-5">
          <h2 className="text-lg pb-4">Veículo</h2>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-3"
                  htmlFor="brandCar"
                >
                  Marca
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="brandCar"
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  min={0}
                  placeholder="Ex: Fiat"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-3"
                  htmlFor="model"
                >
                  Modelo
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="model"
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  min={0}
                  placeholder="Ex: Sedan"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="year"
                >
                  Ano de fabricação
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="year"
                  type="number"
                  inputMode="numeric"
                  value={year}
                  onChange={(e) => actualYear(e)}
                  min={0}
                  required={true}
                  placeholder="Ex: 2000"
                />
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <select
                onChange={handleDoorsChange}
                value={doorsCar}
                required={true}
                className="cursor-pointer block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>Quantidade de portas</option>
                <option value="0">0</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {doorsCar === "0" ? (
              <>
                <div className="md:flex md:items-center mb-6">
                  <select
                    onChange={(e) => setPassengers(e.target.value)}
                    value={passengers}
                    required
                    className="cursor-pointer block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option>Quantidade de passageiros</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>

        {data?.message && (
          <div className="flex flex-col m-auto bg-white items-center w-full md:w-[25%] mt-12 p-5bg-white">
            <div>
              <h2 className="text-lg pb-4">Resultado</h2>
              <div className="pb-3 max-h-[200px] overflow-y-auto">
              
                  <p className="text-sm">
                    {data?.message}
                  </p>
               
              </div>
            </div>
          </div>
        )}        


      </main>
    </>
  );
}
