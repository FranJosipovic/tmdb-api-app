import React from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { movieId } = useParams();

  return <div>{movieId}</div>;
}
