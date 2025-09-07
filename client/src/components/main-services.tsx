import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { mainServices, type MainService } from "../data/services";

export default function MainServices() {
  const [currentView, setCurrentView] = useState<'main' | 'sub'>('main');
  const [selectedService, setSelectedService] = useState<MainService | null>(null);

  const showSubServices = (service: MainService) => {
    setSelectedService(service);
    setCurrentView('sub');
  };

  const showMainServices = () => {
    setCurrentView('main');
    setSelectedService(null);
  };

  return (
    <section id="main-services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6 font-helvetica">
            Our Core{" "}
            <span className="bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 bg-clip-text text-transparent">
              Professional Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-helvetica">
            Comprehensive financial expertise across three specialized domains, powered by AI-driven insights and decades of professional experience.
          </p>
        </div>

        {/* Main Service Cards View */}
        {currentView === 'main' && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            {mainServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-royal-purple-500/30 cursor-pointer"
                onClick={() => showSubServices(service)}
              >
                <div className="mb-6">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-48 object-cover rounded-xl mb-6" 
                  />
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${service.icon} text-2xl text-white`}></i>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-royal-purple-500 transition-colors duration-300 font-helvetica">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-helvetica">
                  {service.description}
                </p>
                <button className={`bg-gradient-to-r ${service.gradient} text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 font-helvetica`}>
                  Explore More
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Sub-Services View */}
        {currentView === 'sub' && selectedService && (
  <div className="animate-fade-in">
    <div className="flex items-center justify-between mb-8 w-full">
  {/* Left - Back Button */}
  <button
    onClick={showMainServices}
    className="flex items-center text-royal-purple-500 hover:text-deep-blue-500 transition-colors duration-300 font-semibold font-helvetica"
  >
    <ArrowLeft className="mr-2" size={20} />
    Back to Main Services
  </button>

  {/* Center - First Quick Nav */}
  {mainServices
    .filter((service) => service.id !== selectedService.id)
    .slice(0, 1) // first one
    .map((service) => (
      <button
        key={service.id}
        onClick={() => showSubServices(service)}
        className={`
          px-5 py-2.5 rounded-xl font-semibold font-helvetica
          bg-gradient-to-r ${service.gradient} text-white
          shadow-md hover:shadow-xl
          transform hover:-translate-y-1 hover:scale-105
          transition-all duration-300 ease-in-out
        `}
      >
        Go to {service.title}
      </button>
    ))}

  {/* Right - Second Quick Nav */}
  {mainServices
    .filter((service) => service.id !== selectedService.id)
    .slice(1, 2) // second one
    .map((service) => (
      <button
        key={service.id}
        onClick={() => showSubServices(service)}
        className={`
          px-5 py-2.5 rounded-xl font-semibold font-helvetica
          bg-gradient-to-r ${service.gradient} text-white
          shadow-md hover:shadow-xl
          transform hover:-translate-y-1 hover:scale-105
          transition-all duration-300 ease-in-out
        `}
      >
        Go to {service.title}
      </button>
    ))}
</div>


    <div className="grid lg:grid-cols-5 gap-6">
      {selectedService.subServices.map((subService) => (
        <div
          key={subService.id}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:border-royal-purple-500/30"
        >
          <img
            src={subService.image}
            alt={subService.title}
            className="w-full h-32 object-cover rounded-xl mb-4"
          />
          <div
            className={`w-12 h-12 bg-gradient-to-r ${subService.gradient} rounded-xl flex items-center justify-center mb-4`}
          >
            <i className={`${subService.icon} text-white`}></i>
          </div>
          <h4 className="text-lg font-bold text-charcoal mb-3 font-helvetica">
            {subService.title}
          </h4>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed font-helvetica">
            {subService.content}
          </p>
          <div className="space-y-2">
            {subService.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center text-sm text-gray-500 font-helvetica"
              >
                <i className="fas fa-check text-royal-purple-500 mr-2"></i>
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </section>
  );
}
