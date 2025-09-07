export default function Hero() {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-light-white via-white to-light-golden/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-royal-purple-500/5 to-deep-blue-500/5"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight font-helvetica">
              We offer unique{" "}
              <span className="bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 bg-clip-text text-transparent">
                AI-powered
              </span>{" "}
              financial services
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-helvetica">
              Revolutionizing financial advisory with cutting-edge AI technology and personalized solutions for your wealth management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-deep-blue-500 hover:to-royal-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg font-helvetica">
                Explore Services
              </button>
              <button className="border-2 border-royal-purple-500 text-royal-purple-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-royal-purple-500 hover:text-white transition-all duration-300 font-helvetica">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="AI-powered financial analytics dashboard" 
              className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-golden-500 to-yellow-400 rounded-full animate-pulse-slow opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 rounded-full animate-pulse-slow opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
