import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EventUpdate() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    imgUrl: ""
  });
  const { id } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const newInput = {
      ...input,
      [name]: value,
    };

    setInput(newInput);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios({
        method: "put",
        url: `http://localhost:3000/event/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
        data: input,
      });

      navigate("/event/list");
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
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  i
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Update Event</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Please enter your event information.
                  </p>
                </div>
              </div>
              <form onSubmit={submitForm}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="flex flex-col">
                      <label className="leading-loose">title</label>
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        // placeholder="Input your event title"
                        name="title"
                        value={input.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">description</label>
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        // placeholder="Input your description of event"
                        name="description"
                        value={input.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">Image Url</label>
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        // placeholder="Input your image of event"
                        name="imgUrl"
                        value={input.imgUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    <button
                      className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                      onClick={() => {
                        navigate(`/event/list`);
                      }}
                    >
                      <svg
                        className="w-6 h-6 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>{" "}
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventUpdate;
