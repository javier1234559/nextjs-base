import { Building, Key, TrendingUp, Users, MapPin, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Services = () => {
  const services = [
    {
      icon: Building,
      title: "Luxury Home Sales",
      description: "Specializing in high-end residential properties with personalized marketing strategies and expert pricing guidance."
    },
    {
      icon: Key,
      title: "Buyer Representation",
      description: "Comprehensive buyer services including property search, market analysis, and negotiation to secure your dream home."
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "In-depth market insights and property valuations to help you make informed real estate decisions."
    },
    {
      icon: Users,
      title: "Relocation Services",
      description: "Full-service relocation assistance for clients moving to or within Florida's luxury markets."
    },
    {
      icon: MapPin,
      title: "Multi-Market Expertise",
      description: "Deep knowledge of Tampa Bay, Daytona, Boca Grande, and luxury markets throughout Florida."
    },
    {
      icon: Shield,
      title: "Referral Network",
      description: "Trusted professional network including inspectors, contractors, attorneys, and financial advisors."
    }
  ];

  const markets = [
    {
      name: "Tampa Bay",
      description: "A fast-growing university town with a laid-back coastal vibe, Tampa Bay offers affordable suburbs, booming job opportunities and year-round sunshine on Florida's west coast.",
      image: "https://i.imgur.com/DLK58nF.png"
    },
    {
      name: "Daytona Beach",
      description: "A quiet, upscale island with world class fishing on the Gulf, Boca Grande is perfect for buyers seeking Old Florida charm, pristine beaches, offering a slower pace of life and an exclusive golf community.",
      image: "https://i.imgur.com/WJ9TyPa.jpeg"
    },
    {
      name: "Boca Grande",
      description: "Known for its iconic beaches and motorsports scene, Daytona Beach combines oceanfront living with the most affordable housing and a relaxed lifestyle, and room for growth.",
      image: "https://i.imgur.com/4RYpGMC.jpeg"
    },
    {
      name: "Statewide Florida",
      description: "Florida offers a diverse mix of coastal cities, quiet suburbs, and vibrant communities—with no state income tax, year-round sunshine, and home options for every lifestyle and budget.",
      image: "https://i.imgur.com/ilZjmXE.jpeg"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Services Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Cyndi's Professional Services
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive real estate services tailored to luxury home buyers and sellers 
            throughout Florida's most desirable markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-soft hover:shadow-luxury transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Markets Section */}
        <div className="bg-cream rounded-none md:rounded-3xl p-0 md:p-12 -mx-4 md:mx-0">
          <div className="text-center mb-12 px-4 md:px-0">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Cyndi's Primary Markets
            </h3>
            <p className="text-lg text-muted-foreground">
              Serving Florida's most prestigious luxury real estate markets
            </p>
          </div>

          <Carousel className="w-full mx-auto">
            <CarouselContent className="ml-0 md:-ml-1">
              {markets.map((market, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-1 md:basis-1/2 lg:basis-1/3">
                  <Card className="border-none shadow-soft hover:shadow-luxury transition-all duration-300 group overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={market.image} 
                        alt={`${market.name} luxury real estate`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-xl font-semibold text-white mb-2 text-center">{market.name}</h4>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1 flex items-center justify-center">
                      <p className="text-muted-foreground text-center">{market.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Services;