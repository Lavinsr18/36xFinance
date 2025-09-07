import { additionalServices } from "../data/services";

export default function AdditionalServices() {
  return (
    <section className="py-20 bg-gradient-to-br from-light-white to-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6 font-helvetica">
            Additional{" "}
            <span className="bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 bg-clip-text text-transparent">
              Financial Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-helvetica">
            Expanding your financial horizons with comprehensive services across lending, investments, trading, and strategic consultancy.
          </p>
        </div>

        {/* First Row */}
        <div className="grid lg:grid-cols-4 gap-8 mb-8">
          {additionalServices.slice(0, 4).map((service) => (
            <div key={service.id} className="card-flip h-80">
              <div className="card-flip-inner relative w-full h-full">
                {/* Front Side */}
                <div className="card-flip-front bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-32 object-cover rounded-xl mb-4" 
                  />
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    <i className={`${service.icon} text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-2 font-helvetica">{service.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow font-helvetica">{service.description}</p>
                </div>
                
                {/* Back Side */}
                <div className={`card-flip-back bg-gradient-to-br ${service.gradient} rounded-2xl shadow-xl p-6 text-white flex flex-col`}>
                  <h4 className="text-lg font-bold mb-4 font-helvetica">Our {service.title.split(' ')[0]} Types</h4>
                  <ul className="space-y-2 text-sm">
                    {service.subTypes.map((subType, index) => (
                      <li key={index} className="flex items-center font-helvetica">
                        <i className="fas fa-check mr-2 text-golden-400"></i>
                        {subType}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid lg:grid-cols-4 gap-8">
          {additionalServices.slice(4, 8).map((service) => (
            <div key={service.id} className="card-flip h-80">
              <div className="card-flip-inner relative w-full h-full">
                {/* Front Side */}
                <div className="card-flip-front bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-32 object-cover rounded-xl mb-4" 
                  />
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    <i className={`${service.icon} text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-2 font-helvetica">{service.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow font-helvetica">{service.description}</p>
                </div>
                
                {/* Back Side */}
                <div className={`card-flip-back bg-gradient-to-br ${service.gradient} rounded-2xl shadow-xl p-6 text-white flex flex-col`}>
                  <h4 className="text-lg font-bold mb-4 font-helvetica">Our {service.title.split(' ')[0]} Types</h4>
                  <ul className="space-y-2 text-sm">
                    {service.subTypes.map((subType, index) => (
                      <li key={index} className="flex items-center font-helvetica">
                        <i className="fas fa-check mr-2 text-golden-400"></i>
                        {subType}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
