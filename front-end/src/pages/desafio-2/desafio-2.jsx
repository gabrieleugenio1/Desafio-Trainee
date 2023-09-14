import React,{ useState } from "react";
import Header from "../../components/Header/Header";
import Alert from "../../components/alert/alert";

export default function DesafioDois() {
  const [valueDelivered, setValueDelivered] = useState();
  const [amountPaid, setAmountPaid] = useState();
  const [data, setData] = useState();
  const [showAlert,setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(process.env.REACT_APP_BACK_URL + "/challenge-2/", {
      method: "POST",
      body: JSON.stringify({ valueDelivered: valueDelivered, amountPaid:  amountPaid}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (response) => {
        const res = await response.json();
        setData(res);
        setShowAlert(true);
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      <Header />
      <main className="flex flex-col mx-4">
      {data?.hasOwnProperty("error") && showAlert && <Alert message={data.error} resetShowAlert={setShowAlert}/>}
        <div className="flex flex-col m-auto bg-white items-center w-full md:w-[30%] mt-12 p-5">
          <h2 className="text-lg pb-4">Caixa</h2>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-3"
                  htmlFor="total-to-pay"
                >
                  Valor total a ser pago
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="total-to-pay"
                  type="number"
                  required
                  min={0}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  value={amountPaid}
                  inputMode="numeric"
                  placeholder="Ex: 100"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="total-paid"
                >
                  Total pago
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="total-paid"
                  type="number"
                  onChange={(e) => setValueDelivered(e.target.value)}
                  value={valueDelivered}
                  inputMode="numeric"
                  min={0}
                  required
                  placeholder="Ex: 110"
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
                  Checar troco
                </button>
              </div>
            </div>
          </form>
        </div>

        {(
  (data?.notes100 >= 1) ||
  (data?.notes10 >= 1) ||
  (data?.notes1 >= 1)
) ?  (
          <div className="flex flex-col m-auto bg-white items-center w-full md:w-[25%] mt-12 p-5bg-white">
            <div>
              <h2 className="text-lg pb-4">Resultados</h2>
              <div className="pb-3 max-h-[200px]">
      
                  <p className="text-sm">
                    Notas 100: {data?.notes100}
                  </p>
                  <p className="text-sm">
                    Notas 10: {data?.notes10}
                  </p>
                  <p className="text-sm">
                    Notas 1: {data?.notes1}
                  </p>
                
              </div>
            </div>
          </div>
        ):   (
          (data?.notes100 === 0) &&
          (data?.notes10 === 0) &&
          (data?.notes1 === 0)
        ) &&  (
          <div className="flex flex-col m-auto bg-white items-center w-full md:w-[25%] mt-12 p-5bg-white">
          <div>
            <h2 className="text-lg pb-4">Resultados</h2>
            <div className="pb-3 max-h-[200px]">
    
                <p className="text-sm">
                 Não há troco
                </p>

              
            </div>
          </div>
        </div>



        )
        }

      </main>
    </>
  );
}
