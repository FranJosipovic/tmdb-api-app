import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export default function CreateNewSession() {
  const navigate = useNavigate();

  const { createNewSession } = useSession();

  return (
    <div>
      <button
        onClick={() => {
          createNewSession();
        }}
      >
        Crete new session
      </button>
    </div>
  );
}
