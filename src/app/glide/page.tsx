"use client"
// import type { NextPage } from "next";
import dynamic from "next/dynamic";
// import styles from "../styles/Home.module.css";

const Grid = dynamic(
  () => {
    return import("../../components/Grid");
  },
  { ssr: false }
);

export default function Glide() {
  return (
    <div>
      <Grid />
    </div>
  );
};
