"use client";
import { Button } from "@/components/ui/button";
import { useCreateEventMutation } from "@/redux/features/Event/eventApiSlice";
import { useAppSelector } from "@/redux/hooks";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

// Utility function to format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function EventForm() {
  const organizer = useAppSelector((state) => state.auth.user.email);
  const [createEvent, { data, isLoading, isError, isSuccess }] =
    useCreateEventMutation();

  const router = useRouter();

  const [startDate, setStartDate] = useState<Date>(new Date()); // Explicitly typed as Date
  const [endDate, setEndDate] = useState<Date>(new Date()); // Explicitly typed as Date

  const [formData, setFormData] = useState({
    event: {
      title: "",
      description: "",
      location: "",
      image: "",
      startDate: startDate,
      endDate: endDate,
      category: "",
      price: "",
      isFree: false,
      organizer: organizer || ""
    }
  });

  // Function to reset the form
  const resetForm = useCallback(() => {
    setFormData({
      event: {
        title: "",
        description: "",
        location: "",
        image: "",
        startDate: new Date(),
        endDate: new Date(),
        category: "",
        price: "",
        isFree: false,
        organizer: organizer || ""
      }
    });
    setStartDate(new Date());
    setEndDate(new Date());
  }, [organizer]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Event created successfully!", {
        toastId: "createEventSuccess"
      });
      resetForm();
      router.push(`/events`);
    } else if (isError) {
      toast.error("Failed to create Event", {
        toastId: "createEventError"
      });
    }
  }, [isSuccess, isError, data, router, resetForm]);

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

    // Validate end date
    if (formData.event.endDate <= formData.event.startDate) {
      toast.error("End date must be after the start date.", {
        toastId: "dateValidationError"
      });
      return; // Stop form submission if validation fails
    }

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

    // Format dates as YYYY-MM-DD
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const eventData = {
      event: {
        title,
        description,
        location,
        image,
        startDate: formattedStartDate, // Use formatted date
        endDate: formattedEndDate, // Use formatted date
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

          {/* Date Pickers for Start and End Date */}
          <div className="w-full h-auto flex gap-7 justify-center my-4">
            <div className="w-1/2">
              <label className="label">
                <span className="text-white text-sm">Start Date</span>
              </label>
              <DatePicker
                selected={formData.event.startDate}
                onChange={(date: Date | null) => {
                  if (date) {
                    setStartDate(date);
                    setFormData((prevData) => ({
                      ...prevData,
                      event: {
                        ...prevData.event,
                        startDate: date
                      }
                    }));

                    // If the new start date is after the current end date, reset the end date
                    if (date > formData.event.endDate) {
                      setEndDate(date);
                      setFormData((prevData) => ({
                        ...prevData,
                        event: {
                          ...prevData.event,
                          endDate: date
                        }
                      }));
                    }
                  }
                }}
                className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
                placeholderText="Select Start Date"
              />
            </div>
            <div className="w-1/2">
              <label className="label">
                <span className="text-white text-sm">End Date</span>
              </label>
              <DatePicker
                selected={formData.event.endDate}
                onChange={(date: Date | null) => {
                  if (date) {
                    if (date <= formData.event.startDate) {
                      toast.error("End date must be after the start date.", {
                        toastId: "endDateError"
                      });
                      return; // Do not update the end date if it's invalid
                    }
                    setEndDate(date);
                    setFormData((prevData) => ({
                      ...prevData,
                      event: {
                        ...prevData.event,
                        endDate: date
                      }
                    }));
                  }
                }}
                minDate={formData.event.startDate} // Disable dates before the start date
                className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md"
                placeholderText="Select End Date"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="label">
              <span className="text-sm text-white">Image</span>
            </label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res.length > 0) {
                  const imageUrl = res[0].url;
                  setFormData((prevData) => ({
                    ...prevData,
                    event: {
                      ...prevData.event,
                      image: imageUrl
                    }
                  }));
                  toast.success("Image uploaded successfully!");
                } else {
                  toast.error("Image upload failed!");
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
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
