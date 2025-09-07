import Navbar from "../components/navb";
import Hero from "../components/hero";
import MainServices from "../components/main-services";
import AdditionalServices from "../components/additional-services";
import Booking from "../components/booking";

export default function Services() {
  return (
    <div className="min-h-screen bg-light-white grid-pattern">
      <Hero />
      <MainServices />
      <AdditionalServices />
      <Booking />
    </div>
  );
}
