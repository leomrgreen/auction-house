import React from "react";
import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative flex h-[500px] sm:h-[700px] w-full flex-col items-center justify-center overflow-hidden">
      <div className="z-10 flex flex-col items-center gap-5">
        <h1 className="whitespace-pre-wrap text-center text-7xl font-medium tracking-tighter text-black dark:text-white max-w-[40rem]">
          The place to bid on your dream item
        </h1>
        <div className="flex items-center gap-4">
          <Button className="text-white w-[8rem]">Sign up</Button>
          <Button variant="outline" className="w-[8rem]">
            Explore <ArrowRight />
          </Button>
        </div>
      </div>
      <DotPattern
        className={cn(
          "sm:[mask-image:radial-gradient(350px_circle_at_center,white,transparent)] [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </section>
  );
};

export default Hero;
