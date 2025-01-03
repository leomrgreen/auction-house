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
import MultiAvatar from "../ui/MultiAvatar";
import { timeUntil } from "@/lib/utilities/date";
import { highestBid } from "@/lib/utilities/highestBid";

const SingleListing = ({ listing }) => {
  const highest = highestBid(listing.bids, true);
  return (
    <section>
      <div className="grid gap-5 w-full h-full">
        <div className="grid md:grid-cols-2 px-3 gap-2 py-2 relative items-center">
          <BlurFade
            delay={0.2}
            duration={0.5}
            className="px-2 flex flex-col items-start h-full justify-around pt-4 w-full"
          >
            <div className="flex flex-col items-start gap-3">
              <Link
                href={`${
                  loggedInUser
                    ? `/user/${listing.seller.name}`
                    : "/auth/register"
                }`}
                className="flex items-start gap-2"
              >
                <span>
                  Listed by{" "}
                  <span className="text-primary">{listing.seller.name}</span>
                </span>
                <Avatar className="size-7">
                  <AvatarImage src={listing.seller.avatar.url} />
                </Avatar>
              </Link>

              <h1 className="text-3xl font-bold text-start">{listing.title}</h1>
              <p className="text-start text-muted-foreground overflow-x-hidden max-w-[20rem] w-ful">
                {listing.description}
              </p>

              <div className="flex gap-3 items-start flex-wrap">
                {listing.tags
                  .filter((tag) => tag.trim() !== "") // Filter out empty or whitespace-only strings
                  .map((tag, idx) => (
                    <Badge variant="outline" key={idx}>
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2 pt-5 w-full">
              {loggedInUser ? (
                // Show BidForm if user is logged in
                listing.seller.name === loggedInUser?.name ? (
                  <Link
                    href={`/listings/edit/${listing.id}`}
                    className="flex items-center gap-1 bg-primary py-3 px-7 rounded-xl text-white
                  "
                  >
                    Manage Listing <Settings />
                  </Link>
                ) : (
                  <BidForm target={listing} />
                )
              ) : (
                // Show sign-up prompt if no user is logged in
                <p className="text-start text-sm text-foreground">
                  Create an account to bid on this product{" "}
                  <Link href="/auth/register" className="text-primary">
                    Sign up
                  </Link>
                </p>
              )}
              {loggedInUser && listing.bids.length > 1 ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="sm:w-1/2 w-full mt-1">
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
              <div className="flex">
                {/* only show timer if it's 5 hours or less until bidding is ended */}
                {listing.endsAt &&
                  new Date(listing.endsAt) - new Date() <=
                    5 * 60 * 60 * 1000 && <Timer date={listing.endsAt} />}
              </div>
              {/* if bidding has ended and there are bids, then display winner of listing */}
              {new Date(listing.endsAt) < new Date() &&
                listing.bids.length > 0 && (
                  <span className="font-bold">
                    Listing has been sold to{" "}
                    <Link
                      href={`/user/${highest.bidder}`}
                      className="text-primary"
                    >
                      {highest.bidder}
                    </Link>{" "}
                    for {highest.amount} credits!
                  </span>
                )}
            </div>
          </BlurFade>
          <div className="flex flex-col gap-2 items-center">
            <BoxReveal duration={0.8}>
              <div className="relative">
                <ImgSlider carouselItems={listing.media} />
                <span className="absolute top-10 right-5">
                  {timeUntil(listing.endsAt)}
                </span>
              </div>
            </BoxReveal>

            {listing.bids.length >= 2 && <MultiAvatar bids={listing.bids} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleListing;
