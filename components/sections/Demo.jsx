import React from "react";
import VideoPlayer from "../ui/VideoPlayer";
import { FaEye } from "react-icons/fa";
import { CheckCircle } from "lucide-react";

const Demo = () => {
  return (
    <section className="grid lg:grid-cols-2 py-5 px-2 gap-5 bg-background border rounded-lg">
      <span className="flex flex-col gap-2 justify-between pl-5">
        <div className="grid gap-4">
        <h2 className="sm:text-4xl text-2xl font-bold lg:text-start"> Built for simplicty</h2>
        <p className="text-lg text-muted-foreground lg:max-w-[30rem]">
        Aucsome is designed to be simple and easy to use. It's built with the user in mind, so you can focus on what matters most.
        </p>
        </div>
        <ul className="grid gap-3 pb-5 lg:pb-10">
         <li className="flex items-center gap-2">
           <CheckCircle className="text-primary" /> Bid effortlessly with just a few clicks.
        </li>
        <li className="flex items-center gap-2">
           <CheckCircle className="text-primary" /> Safe transactions.
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="text-primary" /> Real-time auction updates.
       </li>
      </ul>
      </span>
      <VideoPlayer />
    </section>
  );
};

export default Demo;
