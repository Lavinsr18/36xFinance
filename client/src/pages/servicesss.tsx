import Navbar from "../components/navb";
import Hero from "../components/hero";
import MainServices from "../components/main-services";
import AdditionalServices from "../components/additional-services";
import Booking from "../components/booking";
import Footer from "../components/footer";

export default function Services() {
  return (
    <div className="min-h-screen bg-light-white grid-pattern">
      <Navbar />
      <Hero />
      <MainServices />
      <AdditionalServices />
      <Booking />
      <Footer />
    </div>
  );
}
