import { useState } from "react";
import Header from "../../components/Header/Header";

export default function DesafioQuatro() {
  const [ceps, setCeps] = useState(["", "", "", "", ""]);
  const [data, setData] = useState();

  const handleChange = (e, index) => {
    const newCeps = [...ceps];
    newCeps[index] = e.target.value;
    setCeps(newCeps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(process.env.REACT_APP_BACK_URL + "/challenge-4/", {
      method: "POST",
      body: JSON.stringify({ ceps: ceps }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (response) => {
        const res = await response.json();
        setData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <main className="flex flex-col mx-4">
        <div className="flex flex-col m-auto bg-white items-center w-full md:w-[30%] mt-12 p-5">
          <h2 className="text-lg pb-4">Consultar CEP's</h2>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            {ceps.map((cep, index) => (
              <div className="md:flex md:items-center mb-6" key={index}>
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold text-left mb-1 pr-3"
                    htmlFor={`cep-${index}`}
                  >
                    CEP {index + 1}:
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    id={`cep-${index}`}
                    type="text"
                    required={index === 0 ? true : false}
                    value={cep}
                    min={8}
                    max={8}
                    placeholder="CEP"
                    onChange={(e) => handleChange(e, index)}
                    className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  />
                </div>
              </div>
            ))}

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Consultar CEP's
                </button>
              </div>
            </div>
          </form>
        </div>
        {data?.results && (
          <div className="flex flex-col m-auto bg-white items-center w-full md:w-[25%] mt-12 p-5 bg-white">
            <div>
              {data?.results?.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <h2 className="text-lg pb-2">Resultado CEP {index + 1}</h2>
                  {item?.erro ? (
                    <p className="text-sm">CEP {item.cep} tem erro</p>
                  ) : (
                    <div className="max-h-[200px] overflow-auto">
                      <p className="text-sm">
                        CEP: {item.cep}
                        <br />
                        Bairro: {item?.bairro}
                        <br />
                        Complemento: {item?.complemento}
                        <br />
                        DDD: {item?.ddd}
                        <br />
                        IBGE: {item?.ibge}
                        <br />
                        Localidade: {item?.localidade}
                        <br />
                        Logradouro: {item?.logradouro}
                        <br />
                        SIAFI: {item?.siafi}
                        <br />
                        UF: {item?.uf}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
