import React from "react";
import Moment from "react-moment";
import { useEffect, useState } from "react";
import Connect from "./Connect";

export default function Header() {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <>
      <div class="flex flex-row bg-indigo-400">
        <img
          class="basis-1/6 justify-self-start object-scale-down size-20" // w-1/10 h-[5rem]
          src="/home2.svg"
          alt="home_icon"
        />
        <Moment
          class="basis-1/6 px-5 font-bold self-center"
          date={date}
          format="D-MM-YYYY"
        />
        <h1 class="basis-3/6 px-10 font-sans text-4xl font-bold self-center">
          FREE WEB LOGGER
        </h1>
        <Connect class="basis-1/6" />
      </div>
    </>
  );
}
