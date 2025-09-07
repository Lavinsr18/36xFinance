import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { EnquiryForm } from "@shared/schema";

export default function Enquiry() {
  const { data: enquiryForms = [], isLoading } = useQuery({
    queryKey: ["/api/enquiry-forms"],
  });

  const handleOpenGoogleForm = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pt-1">
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1
              className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-500 bg-clip-text text-transparent mb-6 slide-in"
              data-testid="text-enquiry-title"
            >
              Service Enquiries
            </h1>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto slide-in"
              style={{ animationDelay: "0.2s" }}
            >
              Choose the appropriate enquiry form for your specific needs. Our
              team will get back to you promptly.
            </p>
          </div>

          {/* Enquiry Forms */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Loading enquiry forms...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enquiryForms.map((form: EnquiryForm, index: number) => (
                <Card
                  key={form.id}
                  className="hover:shadow-2xl hover:border-blue-400 border transition-all duration-300 scale-in bg-white/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`enquiry-form-${form.id}`}
                >
                  <CardContent className="p-8">
                    {form.image && (
                      <img
                        src={form.image}
                        alt={form.title}
                        className="w-full h-48 object-cover rounded-lg mb-6"
                      />
                    )}

                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                        <span className="text-2xl text-white">{form.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {form.title}
                      </h3>
                      <p className="text-gray-600">{form.description}</p>
                    </div>

                    {form.features && form.features.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {form.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <span className="text-green-500 mr-2">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button
                      className="w-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition"
                      onClick={() => handleOpenGoogleForm(form.googleFormUrl)}
                      data-testid={`button-start-enquiry-${form.id}`}
                    >
                      Start Enquiry
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* Placeholder for Future Forms */}
              <Card
                className="border-dashed border-2 hover:shadow-lg transition-all duration-300 scale-in bg-white/70"
                style={{ animationDelay: `${enquiryForms.length * 0.1}s` }}
              >
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl text-white">➕</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    More Services Coming Soon
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Additional enquiry forms will be available here as we expand
                    our service offerings.
                  </p>
                  <Button variant="secondary" disabled data-testid="button-coming-soon">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <Card className="max-w-4xl mx-auto fade-in bg-white/90 shadow-lg">
              <CardContent className="p-8">
                <h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  data-testid="text-need-help"
                >
                  Need Help Choosing?
                </h3>
                <p className="text-gray-600 mb-6">
                  Not sure which enquiry form is right for you? Our team is here
                  to help guide you to the appropriate service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-blue-500 text-white font-medium hover:opacity-90"
                    data-testid="button-schedule-call"
                  >
                    Schedule a Call
                  </Button>
                  <Button
                    variant="outline"
                    className="px-6 py-3 border-blue-500 text-blue-600 hover:bg-blue-50"
                    data-testid="button-live-chat"
                  >
                    Live Chat Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
