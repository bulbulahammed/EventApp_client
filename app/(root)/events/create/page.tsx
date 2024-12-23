"use client";

import EventForm from "@/components/shared/EventForm";

export default function CreateEvent() {
  return (
    <>
      <section className="bg-primary-500 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>
      <div>
        <EventForm />
      </div>
    </>
  );
}
