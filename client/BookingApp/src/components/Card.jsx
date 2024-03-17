import { Link, useNavigate } from "react-router-dom";

function Card({ mountain }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="relative flex w-50 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="300"
      >
        <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
          <img src={mountain.imgUrl} className="h-full w-full object-cover" />
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
              {mountain.name}
            </p>
            <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
              {mountain.price}
            </p>
          </div>
          <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
            {mountain.mdpl} mdpl
          </p>
        </div>
        <div className="p-6 pt-0">
          <button
            className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => {
              navigate(`/detail/${mountain.id}`);
            }}
          >
            See Detail
          </button>
        </div>
      </div>
      {/* stylesheet */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
      />
    </>
  );
}

export default Card;
