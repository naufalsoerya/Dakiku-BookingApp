import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function EventUpload() {
  const navigate = useNavigate();
  // state
  const [file, setFile] = useState(null);
  const { id } = useParams();

  const handleChange = (event) => {
    const image = event.target.files[0]; // ambil imagenya dari sini
    setFile(image);
  };

  // console.log(file, "<<<<<<<<<<<<<<<<<<<")

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const { data } = await axios({
        method: "patch",
        url: `http://localhost:3000/event/${id}`,
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
          "Content-Type": "multipart/form-data",
        },
      });

      setFile(data);
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
      {/* component */}
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div
        className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-white relative items-center"
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0" />
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              Photo Upload!
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Update your event photo here.
            </p>
          </div>
          <form className="mt-8 space-y-3" onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach Photo
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                    {/*-<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>*/}
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img
                        className="has-mask h-36 object-center"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                        alt="freepik image"
                      />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or{" "}
                      <a
                        className="text-blue-600 hover:underline"
                      >
                        select a file
                      </a>{" "}
                      from your computer
                    </p>
                  </div>
                  <input type="file" className="hidden" onChange={handleChange} name="imgUrl"/>
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: doc,pdf,types of images</span>
            </p>
            <div>
              <button
                type="submit"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n\t.has-mask {\n\t\tposition: absolute;\n\t\tclip: rect(10px, 150px, 130px, 10px);\n\t}\n",
        }}
      />
    </>
  );
}

export default EventUpload;
