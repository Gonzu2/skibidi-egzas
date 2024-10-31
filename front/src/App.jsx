import { useEffect, useState } from "react";
import { useAuth } from "./utils/context/authContext";
import LoginPage from "./componnents/LoginPage";
import { useNavigate } from "react-router-dom";
import { useEvent } from "./utils/context/eventContext";
import Navbar from "./componnents/Navbar";
import "./style/app.css";

function App() {
  const { user, loading, handleLogout } = useAuth();
  const {
    CreateEvent,
    UpdateEvent,
    DeleteEvent,
    GetEvents,
    events,
    eventLoading,
  } = useEvent();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    } else if (user && !loading) {
      if (user.blocked === true) {
        handleLogout();
      }
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      GetEvents();
    }
  }, [user]);

  const [event, setEvent] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    approved: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value, // Dynamically update the state based on input name
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await UpdateEvent(currentEventId, event);
      GetEvents();
    } else {
      await CreateEvent(event);
      GetEvents();
    }
    setEvent({ name: "", description: "", location: "", date: "" });
    setIsEditing(false);
    setCurrentEventId(null);
  };

  const handleEdit = (eventToEdit) => {
    if (
      eventToEdit.user_id === user._id ||
      user.authenticationLevel === "admin"
    ) {
      setEvent({
        name: eventToEdit.name,
        description: eventToEdit.description,
        location: eventToEdit.location,
        date: eventToEdit.date,
        approved: eventToEdit.approved,
      });
      setIsEditing(true);
      setCurrentEventId(eventToEdit._id); // Set the ID of the book being edited
    } else {
      alert("Unauthorized");
    }
  };

  const handleDelete = async (eventToDelete) => {
    await DeleteEvent(eventToDelete);
    GetEvents();
  };
  return (
    <>
      {user ? (
        <div>
          <Navbar />
          <h1 className="main-header">Events</h1>
          <div className="main-container">
            {eventLoading ? (
              <p>Loading events...</p>
            ) : (
              <ul className="main-events">
                {events && events.length > 0 ? (
                  events.map((eventItem) => (
                    <>
                      {eventItem.approved === true ? (
                        <li className="event" key={eventItem._id}>
                          <h3>{eventItem.name}</h3>
                          <p>Location: {eventItem.location}</p>
                          <p>Description: {eventItem.description}</p>
                          <p>Date: {eventItem.date}</p>
                          <p>Author: {eventItem.author}</p>
                          <div className="buttons">
                            {eventItem.user_id === user._id ||
                            user.authenticationLevel === "admin" ? (
                              <button
                                className="edit-button"
                                onClick={() => handleEdit(eventItem)}
                              >
                                Edit
                              </button>
                            ) : (
                              <></>
                            )}
                            {eventItem.user_id === user._id ||
                            user.authenticationLevel === "admin" ? (
                              <button
                                className="delete-button"
                                onClick={() => {
                                  handleDelete(eventItem._id);
                                }}
                              >
                                Delete
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </li>
                      ) : (
                        <></>
                      )}
                    </>
                  ))
                ) : (
                  <div>No events found</div>
                )}
              </ul>
            )}
          </div>
          <h1>{isEditing ? "Edit event" : "Create event"}</h1>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                name="name" // Set name attribute for identifying the input
                placeholder="Event Name"
                value={event.name}
                onChange={handleChange} // Use the generic change handler
              />
            </div>
            <div>
              <textarea
                name="description"
                placeholder="Description"
                value={event.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="location"
                placeholder="location"
                value={event.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="date"
                name="date"
                placeholder="date"
                value={event.date}
                onChange={handleChange}
              />
            </div>
            <button type="submit">
              {isEditing ? "Update event" : "Add event"}
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default App;
