"use client";
import { Button } from "@/components/ui/button";
import { useCreateEventMutation } from "@/redux/features/Event/eventApiSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EventForm() {
  const organizer = useAppSelector((state) => state.auth.user.email);
  const [createEvent, { data, isLoading, isError, isSuccess }] =
    useCreateEventMutation();

  const [formData, setFormData] = useState({
    event: {
      title: "",
      description: "",
      location: "",
      image: "Here will be the  image url",
      startDate: "23/October/2024",
      endDate: "23/October/2024",
      category: "",
      price: "",
      isFree: false,
      organizer: organizer || ""
    }
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message, { toastId: "createEventSuccess" });
    } else if (isError) {
      toast.error("Failed to create Event", { toastId: "createEventError" });
    }
  }, [isSuccess, isError, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      event: {
        ...prevData.event,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      title,
      description,
      location,
      image,
      startDate,
      endDate,
      category,
      price,
      isFree
    } = formData.event;

    const eventData = {
      event: {
        title,
        description,
        location,
        image,
        startDate,
        endDate,
        category,
        price,
        isFree,
        organizer: organizer || ""
      }
    };
    console.log("Event Data:", eventData);
    createEvent(eventData);
  };

  return (
    <div className="w-full flex items-center justify-center bg-no-repeat bg-center bg-cover bg-[url('/assets/images/bg-image.jpg')]">
      <div className="max-w-[500px] h-auto py-10 my-20 px-12 bg-white-500 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-[2px] border-[rgba(255,255,255,0.61)]">
        <div className="w-full h-auto">
          <h1 className="text-[1.475rem] text-white font-semibold mb-1">
            Create A New Event
          </h1>
          <p className="text-sm text-gray-300 font-normal mb-8">
            Welcome To EventApp!
          </p>
        </div>
        <div className="w-full h-auto flex items-center gap-x-1 my-5">
          <div className="w-1/2 h-[1.5px] bg-gray-200/40 rounded-md"></div>
          <p className="text-sm text-gray-300 font-normal px-2">
            Fill The Form
          </p>
          <div className="w-1/2 h-[1.5px] bg-gray-200/40 rounded-md"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full h-auto flex gap-7 justify-center my-4">
            <div className="w-1/2">
              <label className="label">
                <span className="text-white text-sm">Title</span>
              </label>
              <input
                type="text"
                className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
                name="title"
                value={formData.event.title}
                onChange={handleChange}
                placeholder="Title"
              />
            </div>
            <div className="w-1/2">
              <label className="label">
                <span className="text-white text-sm">Category</span>
              </label>
              <input
                type="text"
                className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
                name="category"
                value={formData.event.category}
                onChange={handleChange}
                placeholder="Category"
              />
            </div>
          </div>
          <div className="w-full h-auto flex gap-7 justify-center my-4">
            <div className="w-1/2">
              <label className="label">
                <span className="text-white text-sm">Location</span>
              </label>
              <input
                type="text"
                className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
                name="location"
                value={formData.event.location}
                onChange={handleChange}
                placeholder="Location"
              />
            </div>

            <div className="w-1/2">
              <label className="label">
                <span className="text-sm text-white">Price</span>
              </label>
              <input
                type="text"
                className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
                name="price"
                value={formData.event.price}
                onChange={handleChange}
                placeholder="Price"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="label">
              <span className="text-sm text-white">Description</span>
            </label>
            <input
              type="text"
              className="w-full h-32 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
              name="description"
              value={formData.event.description}
              onChange={handleChange}
              placeholder="Write Event Description"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 outline-none bg-white/70 rounded-md text-lg text-black font-medium mb-7 hover:bg-white ease-out duration-500 mt-10"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
