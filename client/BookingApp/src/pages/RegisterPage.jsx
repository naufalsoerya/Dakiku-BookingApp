import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    const newInput = {
      ...input,
      [name]: value,
    };

    setInput(newInput);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: input,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://i.pinimg.com/564x/49/f1/e0/49f1e0c890341f01728fe5df0ae77ed8.jpg")',
              }}
            />
            {/* Col */}
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 ml-8">
                Create an Account!
              </h1>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    name="username"
                    onChange={handleInputChange}
                    value={input.username}
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    onChange={handleInputChange}
                    value={input.email}
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    onChange={handleInputChange}
                    value={input.password}
                    type="password"
                    placeholder="******************"
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <p className="mt-8">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
