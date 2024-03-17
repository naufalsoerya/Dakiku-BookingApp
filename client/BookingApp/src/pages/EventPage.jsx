import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CardEvent from "../components/CardEvent";

function EventPage() {
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/event",
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      });
      // console.log(data, "<<<<<<<<<<")
      setEvent(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button
        className="group relative h-10 w-48 overflow-hidden rounded-2xl bg-blue-400 text-base font-bold text-white ml-7"
        onClick={() => {
          navigate(`/event/form`);
        }}
      >
        Add Event
        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30" />
      </button>

      <div class="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-4 px-2 py-6">
        {event &&
          event.map((event) => <CardEvent event={event} key={event.id} />)}
      </div>
    </>
  );
}

export default EventPage;
