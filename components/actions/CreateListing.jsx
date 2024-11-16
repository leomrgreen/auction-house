"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function AuctionForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState([{ url: "", alt: "" }]); // Start with one media field
  const [endsAt, setEndsAt] = useState(null);
  const [error, setError] = useState("");

  // Handler to add a new media field
  const addMediaField = () => {
    if (media.length < 8) {
      setMedia([...media, { url: "", alt: "" }]);
    } else {
      setError("Maximum 8 media items allowed.");
    }
  };

  // Handler to remove a media field
  const removeMediaField = () => {
    if (media.length > 1) {
      const updatedMedia = media.slice(0, media.length - 1);
      setMedia(updatedMedia);
    }
  };

  // Handler to update media fields
  const updateMediaField = (index, field, value) => {
    const updatedMedia = [...media];
    updatedMedia[index][field] = value;
    setMedia(updatedMedia);
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !endsAt) {
      setError("Title and expiry date are required.");
      return;
    }
    const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];
    const formData = {
      title,
      description,
      tags: tagsArray,
      media: media.filter((item) => item.url), // Exclude empty media entries
      endsAt: endsAt.toISOString(), // Convert Date instance to ISO string
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:px-0 px-2 w-full">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name of the item"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label>Media (max 8)</Label>
          <div className="flex gap-2 items-center mb-2">
            <Button
              type="button"
              onClick={removeMediaField}
              disabled={media.length <= 1}
              variant="outline"
              size="icon"
            >
              -
            </Button>
            <Button
              type="button"
              onClick={addMediaField}
              disabled={media.length >= 8}
              variant="outline"
              size="icon"
            >
              +
            </Button>
          </div>
        </div>
        {media.map((item, index) => (
          <div key={index} className="grid gap-2 mb-2 items-center relative">
            <div className="flex gap-2">
              <Input
                type="url"
                value={item.url}
                className="basis-2/3"
                onChange={(e) => updateMediaField(index, "url", e.target.value)}
                placeholder="Image URL"
                required={index === 0} // Make the first media entry required
              />
              <Input
                type="text"
                className="basis-1/3"
                value={item.alt}
                onChange={(e) => updateMediaField(index, "alt", e.target.value)}
                placeholder="Alt text"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <div className="grid gap-2">
          <Label>Ends At *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex text-start items-center justify-between"
              >
                {endsAt ? format(endsAt, "PPP") : "Select a date"}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={endsAt}
                onSelect={setEndsAt}
                fromDate={new Date()} // Prevent past dates
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tag1, tag2, tag3"
          />
        </div>
      </div>
      {error && <p className="text-destructive">{error}</p>}
      <Button type="submit" className="text-white">
        Submit
      </Button>
    </form>
  );
}
