import React from "react";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { LandingPageChart } from "../ui/LandingPageChart";
import BlurFade from "../ui/blur-fade";
import Link from "next/link";

const BiddingTool = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-1">
      <BlurFade delay={0.2} inView>
        <div className="w-full grid lg:grid-cols-2 gap-10 justify-center items-center px-3 lg:gap-5 ">
          <div className="text-center items-center lg:text-start lg:items-start flex flex-col gap-2 ">
            <AnimatedShinyText className="flex lg:ml-0 max-w-max justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 border px-5 py-1 rounded-full">
              <span>✨ New tool</span>
            </AnimatedShinyText>
            <h3 className="md:text-4xl text-2xl font-bold">
              Introducing bidding tool
            </h3>
            <p className="text-muted-foreground leading-7 text-lg max-w-[40rem]">
              Our new bidding tool allows you to keep track of a listed items
              bidding history. Analyze others involved by using the chart
              statistics.
            </p>
            <Link
              href="/listings"
              className="bg-primary text-white rounded-full py-4 px-7 hover:bg-primary/80 transition-all shadow-md mt-5"
            >
              Browse listings
            </Link>
          </div>
          <LandingPageChart />
        </div>
      </BlurFade>
    </section>
  );
};

export default BiddingTool;
