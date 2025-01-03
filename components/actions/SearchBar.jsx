"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderCircle, Search } from "lucide-react";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import ListingAPI from "@/lib/api/listings";
import Link from "next/link";
import { highestBid } from "@/lib/utilities/highestBid";
import { timeUntil } from "@/lib/utilities/date";

const SearchBar = () => {
  const api = new ListingAPI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    // Trim string to handle empty search ""
    if (query.trim() === "") {
      return;
    }
    setLoading(true);

    try {
      const data = await api.listings.search(query);
      setResults(data.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => setIsOpen(false); // Function to close the dialog

  // Add keyboard shortcut support
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="flex gap-3 sm:gap-8 text-muted-foreground hover:text-foreground transition-colors bg-muted/50 hover:border-foreground/30 h-8"
      >
        <span>Search posts...</span>
        <kbd className="-me-1 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          ⌘K
        </kbd>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Browse posts</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch}>
          <div className="flex items-center w-full absolute top-[5px] left-0 border-b">
            <Label htmlFor="search" className="sr-only">
              Searchbar
            </Label>
            <div className="flex items-center px-2">
              <Button type="submit" variant="ghost" size="sm" className="p-0">
                <Search className="text-muted-foreground" />
                <span className="sr-only">Submit</span>
              </Button>
              <Input
                id="search"
                placeholder="Search by title or description"
                className="w-[95%] absolute right-0 border-none focus:ring-0 bg-transparent focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </form>
        <ScrollArea className="h-64 mt-4 relative">
          {loading ? (
            <div className="h-60 w-full flex items-center justify-center">
              <LoaderCircle className="animate-spin size-12" />
            </div>
          ) : results.length > 0 ? (
            <ul className="space-y-2 grid">
              {results.map((item) => (
                <li className="w-full border-b" key={item.id}>
                  <Link
                    href={`/listings/${item.id}`}
                    onClick={closeDialog}
                    className="p-2 w-full flex justify-between hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item?.media[0]?.url}
                        alt={item.media[0]?.alt}
                        className="size-7 rounded-md"
                      />
                      <span className="max-w-[20ch] truncate">
                        {item.title}
                      </span>
                    </div>
                    <div>{timeUntil(item.endsAt)}</div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No results found</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
