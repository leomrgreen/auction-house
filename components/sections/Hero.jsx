import React from "react";
import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import BoxReveal from "../ui/box-reveal";
import ShimmerButton from "../ui/shimmer-button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex h-[500px] sm:h-[700px] w-full flex-col items-center justify-center overflow-hidden">
      <div className="z-10 flex flex-col items-center gap-5">
        <BoxReveal boxColor={"#2563EB"} duration={0.5}>
          <h1 className="whitespace-pre-wrap text-center text-5xl sm:text-7xl font-medium tracking-tighter text-black dark:text-white max-w-[40rem] p-2">
            The place to bid on your{" "}
            <span className="text-primary">dream item</span>
          </h1>
        </BoxReveal>
        <BoxReveal boxColor={"#2563EB"} duration={0.7}>
          <div className="flex items-center gap-4">
            <Link href="/listings">
              <ShimmerButton>
                <span className="text-white flex gap-2 items-center">
                  Explore <ArrowRight className="size-5" />
                </span>
              </ShimmerButton>
            </Link>
          </div>
        </BoxReveal>
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
