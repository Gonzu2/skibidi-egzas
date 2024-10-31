import { useEffect, useState } from "react";
import { useAuth } from "../utils/context/authContext";
import { useEvent } from "../utils/context/eventContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../style/adminPage.css";
import "../style/app.css";

function AdminPage() {
  const { user, loading } = useAuth();
  const { events, eventLoading, GetEvents, DeleteEvent, UpdateEvent } =
    useEvent();
  const navigate = useNavigate();

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
    if (user && !events) {
      GetEvents();
    }
  }, [user, events]);

  const handleApprove = async (event) => {
    const eventUpdated = {
      name: event.name,
      location: event.location,
      description: event.description,
      approved: true,
    };
    await UpdateEvent(event._id, eventUpdated);
    GetEvents();
  };

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <h1>Waiting to be approved posts</h1>
          <div className="main-container">
            {eventLoading ? (
              <p>Loading events...</p>
            ) : (
              <ul className="main-events">
                {events && events.length > 0 ? (
                  events.map((eventItem) => (
                    <>
                      {eventItem.approved === false ? (
                        <li className="event" key={eventItem._id}>
                          <>
                            <h3>{eventItem.name}</h3>
                            <p>Location: {eventItem.location}</p>
                            <p>Description: {eventItem.description}</p>
                            <p>Date: {eventItem.date}</p>
                            <p>Author: {eventItem.author}</p>
                            <p>Approved: {eventItem.approved}</p>
                            <div className="buttons">
                              <button
                                className="edit-button"
                                onClick={() => handleApprove(eventItem)}
                              >
                                Approve
                              </button>
                              <button
                                className="delete-button"
                                onClick={() => {
                                  DeleteEvent(eventItem._id);
                                  GetEvents();
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          </>
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
        </>
      ) : (
        <>loading</>
      )}
    </>
  );
}

export default AdminPage;
