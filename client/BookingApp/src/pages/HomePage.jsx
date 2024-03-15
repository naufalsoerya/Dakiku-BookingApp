import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

function HomePage() {
  const navigate = useNavigate();
  const [mountain, setMountain] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState();

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/mountain",
        params: search,
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      });
      setMountain(data.data);
      setPage(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (event) => {
    const { name, value } = event.target;

    setSearch({
      ...search,
      [name]: value,
    });
  };

  const handlePage = (number) => {
    setSearch({
      ...search,
      "page[number]": number,
    });
  };

  let totalPage = [];
  for (let i = 1; i <= page; i++) {
    totalPage.push(i);
  }

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <>
      {/* search bar */}
      <form role="search">
        <div className="sm:block flex-shrink flex-grow-1 justify-start px-2">
          <div className="inline-flex items-center max-w-full">
            <input
              className="flex items-center flex-grow-0 flex-shrink pl-4 relative w-50 border rounded-full px-1 py-1 ml-5 focus:outline-none w-full"
              onChange={handleSearch}
              type="search"
              name="search"
              placeholder="Start your search"
            />
          </div>
        </div>
      </form>
      {/* end search bar */}

      <div class="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-4 px-2 py-6">
        {mountain &&
          mountain.map((mountain) => (
            <Card mountain={mountain} key={mountain.id} />
          ))}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
        <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
            <svg
              width={14}
              height={8}
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.1665 4L4.49984 7.33333"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.1665 4.00002L4.49984 0.666687"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
          </div>
          <div className="sm:flex">
            {page &&
              totalPage.map((item) => (
                <button className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2" onClick={() => handlePage(item)}>
                  {item}
                </button>
              ))}
          </div>
          <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
            <p className="text-sm font-medium leading-none mr-3">Next</p>
            <svg
              width={14}
              height={8}
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 7.33333L12.8333 4"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 0.666687L12.8333 4.00002"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* End pagination */}
    </>
  );
}

export default HomePage;
