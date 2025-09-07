export default function Booking() {
  const handleBooking = () => {
    console.log("Booking consultation...");
    // TODO: Implement booking functionality
  };

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-yellow-500 relative overflow-hidden">
      {/* Overlay for smooth shading */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/80 via-purple-700/80 to-yellow-600/70"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            📅 Ready to Transform Your Financial Future? 💼
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Schedule a personalized consultation with our AI-powered financial
            experts and discover opportunities tailored specifically for your
            goals. ✅
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary button */}
            <button
              onClick={handleBooking}
              className="bg-gradient-to-r from-yellow-400 via-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Book Free Consultation 📞
            </button>

            {/* Secondary button */}
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-700 transition-all duration-300">
              Learn More 📈
            </button>
          </div>

          <p className="text-white/80 mt-6 text-sm">
            ⏰ Available 24/7 | 🎯 Personalized Solutions | 🚀 Quick Response
          </p>
        </div>
      </div>
    </section>
  );
}
