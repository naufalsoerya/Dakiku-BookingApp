import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="z-999">
      {/* component */}
      <nav className=" bg-white w-full flex relative justify-between items-center mx-auto px-8 h-20">
        {/* logo */}
        <div className="inline-flex">
          <Link className="_o6689fn" to={"/"}>
            <div className="md:block">
              <img
                width={105}
                height={40}
                fill="currentcolor"
                style={{ display: "block" }}
                src="https://miro.medium.com/v2/resize:fit:800/1*yctF4evMrTgmduK06dTIxQ.jpeg"
              />
            </div>
          </Link>
        </div>
        {/* end logo */}  

        {/* login */}
        <div className="flex-initial">
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center">
              <Link
                className="inline-block py-2 px-3 hover:bg-blue-300 rounded-full"
                to={`/booking/list`}
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  History Booking
                </div>
              </Link>
              <div className="block relative">
                <Link
                  to={"/event/list"}
                  className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full relative "
                >
                  <div className="flex items-center h-5">
                    <div className="_xpkakx">
                      <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: "block",
                          height: 16,
                          width: 16,
                          fill: "currentcolor",
                        }}
                      >
                        <path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
              <button
                className="inline-block py-2 px-3 hover:bg-red-400 rounded-full"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  navigate("/login");
                }}
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  Logout
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* end login */}
      </nav>
    </div>
  );
}

export default NavBar;
