import { Award, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/image/florida-coastline-hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                <Award className="h-4 w-4 mr-1" />
                Top 100 Agent in Florida
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Cyndi Kaszirer
              </h1>
              
              <div className="text-xl lg:text-2xl text-orange-100">
                REALTOR® | Smith & Associates
              </div>
              
              <p className="text-lg lg:text-xl text-gray-200 max-w-lg">
                Award-winning luxury residential specialist serving Tampa Bay, Daytona, 
                Boca Grande, and the entire state of Florida.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-orange-100">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Tampa Bay • Daytona • Boca Grande</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href="tel:+18137432847">
                  <Phone className="h-5 w-5 mr-2" />
                  Call (813) 743-2847
                </a>
              </Button>
              <Button size="lg" variant="outline-white" asChild>
                <a href="https://cyndikaszirer.smithandassociates.com/" target="_blank" rel="noopener noreferrer">
                  View Properties
                </a>
              </Button>
            </div>
          </div>

          {/* Professional Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-luxury">
                <img 
                  src="https://i.imgur.com/pHCV4wm.jpeg"
                  alt="Cyndi Kaszirer - Professional Real Estate Agent"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-full shadow-luxury">
                <Award className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;