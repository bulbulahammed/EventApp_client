"use client";
import EventForm from "@/components/shared/EventForm";
import { useAppSelector } from "@/redux/hooks";

export default function CreateEvent() {
  const id = useAppSelector((state) => state.auth.user.id);

  return (
    <>
      <section className="bg-primary-500 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm />
      </div>
    </>
  );
}
