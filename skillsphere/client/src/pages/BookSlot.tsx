import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

// Slot type
interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

// Props type
// interface BookSlotProps {
//   freelancerId: string;
//   jobId: string;
// }

const BookSlot = () => {

  const { freelancerId, jobId } = useParams<{
  freelancerId: string;
  jobId: string;
}>();

useEffect(() => {
  if (!freelancerId) return; 

  const fetchSlots = async () => {
    try {
      const { data } = await API.get(`/availability/${freelancerId}`);
      setSlots(data.filter((s: Slot) => !s.isBooked));
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  fetchSlots();
}, [freelancerId]);


  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const { data } = await API.get<Slot[]>(`/availability/${freelancerId}`);
        setSlots(data.filter((s) => !s.isBooked));
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, [freelancerId]);

  const book = async (slotId: string) => {
    try {
      await API.post("/availability/book", { slotId, jobId });
      alert("Slot booked successfully!");
      // Update slots locally after booking
      setSlots((prev) => prev.filter((s) => s._id !== slotId));
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Failed to book slot. Try again.");
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded">
      <h3 className="text-xl mb-2">Book a Slot</h3>
      {slots.length === 0 && <p>No available slots</p>}
      {slots.map((slot) => (
        <div
          key={slot._id}
          className="p-2 mb-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
          onClick={() => book(slot._id)}
        >
          {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
        </div>
      ))}
    </div>
  );
};

export default BookSlot;