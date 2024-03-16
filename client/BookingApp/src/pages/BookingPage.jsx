import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function BookingPage() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:3000/booking`,
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      });

      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteData = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:3000/booking/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((data) => (
                    <tr>
                      <td className="px-5 py-5 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {data.Mountain.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {data.Mountain.region}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {data.amount}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {data.amount * data.Mountain.price}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                          onClick={() => {
                            deleteData(data.id);
                          }}
                        >
                          <span
                            aria-hidden=""
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          />
                          <span className="relative">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingPage;
