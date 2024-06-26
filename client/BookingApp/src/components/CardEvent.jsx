import { Link, useNavigate } from "react-router-dom";

function CardEvent({ event }) {
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
          <img src={event.imgUrl} className="h-full w-full object-cover" />
        </div>
        <div className="p-6">
          <div className="mb-2 items-center">
            <p className="block font-sans text-base leading-relaxed text-blue-gray-900 antialiased font-bold">
              {event.title}
            </p>
            <p className="block leading-relaxed text-blue-gray-900 antialiased font-thin text-xs">
              {event.description}
            </p>
          </div>
        </div>
        <div>
          <button
            className="block w-full group relative h-10 w-32 overflow-hidden rounded-lg bg-white text-lg shadow font-sans text-xs font-bold"
            onClick={() => {
              navigate(`/event/update/${event.id}`);
            }}
          >
            <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full" />
            <span className="relative text-black group-hover:text-white">
              Update Event
            </span>
          </button>
        </div>
        <div>
          <button
            className="block w-full group relative h-10 w-32 overflow-hidden rounded-lg bg-white text-lg shadow font-sans text-xs font-bold mt-2"
            onClick={() => {
              navigate(`/event/upload/${event.id}`);
            }}
          >
            <div className="absolute inset-0 w-3 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full" />
            <span className="relative text-black group-hover:text-white">
              Upload Photo
            </span>
          </button>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
      />
    </>
  );
}

export default CardEvent;
