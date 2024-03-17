import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function DetailPage() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `http://localhost:3000/mountain/${id}`,
          headers: {
            Authorization: "Bearer " + localStorage.accessToken,
          },
        });
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className=" mx-auto bg-white rounded-3xl shadow-xl">
          <div className="grid rounded-3xl max-w-[370px] shadow-sm bg-slate-100  flex-col">
            <img
              src={data.imgUrl}
              width={375}
              height={200}
              className="rounded-t-3xl justify-center grid h-80 object-cover"
              alt={data.name}
            />
            <div className="group p-6 grid z-10">
              <a
                href="{`${movie.link}`}"
                className="group-hover:text-cyan-700 font-bold sm:text-2xl line-clamp-2"
              >
                {data.name}
              </a>
              <span className="text-slate-400 pt-2 font-semibold">
                ({data.mdpl} mdpl)
              </span>
              <div className=" grid-cols-2 flex group justify-between">
                <div className="font-black flex flex-col">
                  <span className="text-yellow-500 text-xl mt-5">
                    {data.region}
                  </span>
                  <span className="text-3xl flex gap-x-1 items-center group-hover:text-yellow-600">
                    Rp.{data.price}
                  </span>
                </div>
              </div>
              <button
                className="flex mt-6 text-white bg-blue-500 border-0 py-2 px-32 focus:outline-none hover:bg-blue-600 rounded"
                onClick={() => {
                  navigate(`/booking/form/${data.id}`);
                }}
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
