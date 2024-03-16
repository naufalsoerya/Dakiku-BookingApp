import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const EventUpload = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    const image = event.target.files[0];
    setFile(image);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file);

      let token = localStorage.getItem("access_token");
      const { data } = await axios({
        method: "patch",
        url: `http://localhost:3000/event/${id}`,
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      });

      console.log(data);

      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen ">
        <h1 className="text-center h-16 p-4">
          Hello Choose Your Picture To be Shown in Table
        </h1>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-3 border border-teal-950">
          <form onSubmit={submitForm}>
            <input onChange={handleChange} type="file" name="imgUrl" />
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventUpload;
