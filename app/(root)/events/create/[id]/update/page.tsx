import EventForm from "@/components/shared/EventForm";
import { useAppSelector } from "@/redux/hooks";

export default function UpdateEvent() {
  const userId = useAppSelector((state) => state.auth.user.id);

  return (
    <>
      <div className="wrapper my-8">
        <EventForm />
      </div>
    </>
  );
}
