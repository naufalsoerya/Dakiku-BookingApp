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
            <p
              className="block leading-relaxed text-blue-gray-900 antialiased font-thin text-xs"
            >
              {event.description}
            </p>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button
            className="block w-full select-none rounded-lg bg-blue-gray-900/10 mb-0 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => {
              navigate(`/event/update`);
            }}
          >
            Update Event
          </button>
        </div>
        <div className="p-6 pt-0">
          <button
            className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => {
              navigate(`/event/upload/${event.id}`);
            }}
          >
            Update Photo
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
