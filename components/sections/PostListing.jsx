"use client";
import React from "react";
import AuctionForm from "../actions/CreateListing";
import ListingAPI from "@/lib/api/listings";

const PostListing = () => {
  const handleFormSubmit = async (data) => {
    try {
      console.log("submitting data: ", data);
      const response = await new ListingAPI().listings.create(data);
      console.log("Listing created successfully:", response);
      console.log("here is the id:", response.data.id);
      // Optionally redirect or show a success message
    } catch (error) {
      console.error("Failed to create listing:", error);
      // Optionally show an error message
    }
  };

  return (
    <section className="min-h-[80vh] flex flex-col gap-2 items-center justify-center w-full max-w-[45rem] mx-auto">
      <h1 className="text-5xl">Create listing</h1>
      <AuctionForm onSubmit={handleFormSubmit} />
    </section>
  );
};

export default PostListing;