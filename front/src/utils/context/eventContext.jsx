import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventLoading, setEventsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token"));
  const [events, setEvents] = useState();

  async function CreateEvent(event) {
    try {
      const response = await axios.post(
        "http://localhost:4001/event/",
        JSON.stringify(event),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Successfully created event", response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const UpdateEvent = async (eventId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:4001/event/${eventId}`,
        JSON.stringify(updatedData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Successfully updated event", response);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error updating event:", error);
    }
  };

  const DeleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Successfully deleted event", response);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error deleting event:", error);
    }
  };

  const GetEvents = async () => {
    setEventsLoading(true);
    try {
      const response = await axios.get("http://localhost:4001/event/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Successfully got all events", response);
        setEvents(response.data); // Update this line to properly set the array
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEventsLoading(false);
    }
  };

  const contextData = useMemo(
    () => ({
      CreateEvent,
      UpdateEvent,
      DeleteEvent,
      GetEvents,
      events,
      eventLoading,
    }),
    [events, eventLoading]
  );

  return (
    <EventContext.Provider value={contextData}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  return useContext(EventContext);
};

export default EventContext;
