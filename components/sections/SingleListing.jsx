import ImgSlider from "../ui/ImgSlider";
import { Badge } from "../ui/badge";
import BidForm from "../actions/Bid";
import { loggedInUser } from "@/lib/utilities/getUser";
import { Button } from "../ui/button";
import { ArrowRightIcon, Settings } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { ListChart } from "../ui/ListChart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AnimatedShinyText from "../ui/animated-shiny-text";
import Timer from "@/lib/utilities/Timer";
import BlurFade from "../ui/blur-fade";
import BoxReveal from "../ui/box-reveal";

const SingleListing = ({ listing }) => {
  return (
    <section>
      <div className="grid gap-5 w-full h-full">
        <div className="grid md:grid-cols-2 px-3 gap-2 py-2 relative items-center">
          <div className="flex flex-col gap-2 items-center">
            <BoxReveal duration={0.8}>
              <ImgSlider carouselItems={listing.media} />
            </BoxReveal>
            <BoxReveal duration={0.9}>
              <Timer date={listing.endsAt} />
            </BoxReveal>
          </div>
          <div className="flex flex-col text-center items-center pt-4 w-full overflow-x-hidden inview-animate-hide">
            <div className="flex flex-col items-center gap-3">
              <BoxReveal duration={0.3}>
                <Link
                  href={`${
                    loggedInUser
                      ? `/user/${listing.seller.name}`
                      : "/auth/register"
                  }`}
                  className="flex items-center gap-2 mx-auto"
                >
                  <span>
                    Listed by{" "}
                    <span className="text-primary">{listing.seller.name}</span>
                  </span>
                  <Avatar className="size-7">
                    <AvatarImage src={listing.seller.avatar.url} />
                  </Avatar>
                </Link>
              </BoxReveal>
              <BoxReveal duration={0.5}>
                <h1 className="text-3xl font-bold">{listing.title}</h1>
                <p className="text-muted-foreground sm:px-12">
                  {listing.description}
                </p>
              </BoxReveal>
              <div className="flex gap-3 items-center mx-auto flex-wrap">
                {listing.tags
                  .filter((tag) => tag.trim() !== "") // Filter out empty or whitespace-only strings
                  .map((tag, idx) => (
                    <Badge variant="outline" key={idx}>
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 pt-5 w-full mx-auto">
              {loggedInUser ? (
                // Show BidForm if user is logged in
                listing.seller.name === loggedInUser?.name ? (
                  <Link
                    href={`/listings/edit/${listing.id}`}
                    className="flex items-center gap-1 bg-primary p-2 rounded-lg text-white
                  "
                  >
                    Manage <Settings />
                  </Link>
                ) : (
                  <BidForm target={listing} />
                )
              ) : (
                // Show sign-up prompt if no user is logged in
                <p className="text-center text-sm text-foreground">
                  Create an account to bid on this product{" "}
                  <Link href="/auth/register" className="text-primary">
                    Sign up
                  </Link>
                </p>
              )}
              {loggedInUser && listing.bids.length > 1 ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="sm:w-1/2 w-full mx-auto mt-1"
                    >
                      <AnimatedShinyText className="flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                        <span>✨ Use our bidding tool</span>
                        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                      </AnimatedShinyText>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Analyze your bidding opponents</DialogTitle>
                      <DialogDescription>
                        Chart showing bidding history of {listing.title}
                      </DialogDescription>
                    </DialogHeader>
                    <ListChart id={listing.id} />
                  </DialogContent>
                </Dialog>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleListing;
