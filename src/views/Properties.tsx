import { ExternalLink, Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import luxuryHome1 from "@/assets/luxury-home-1.jpg";
import luxuryHome2 from "@/assets/luxury-home-2.jpg";
import luxuryHome3 from "@/assets/luxury-home-3.jpg";

const Properties = () => {
  const properties = [
    {
      id: 1,
      image: "https://i.imgur.com/CWM5x4f.jpeg",
      price: "$3,475,000",
      status: "Active",
      address: "16211 Villarreal De Avila, Tampa, FL",
      beds: 5,
      baths: 7,
      sqft: "7,014",
      link: "https://cyndikaszirer.smithandassociates.com/listing/16211-villarreal-de-avila-tampa-fl-33613-tb8360938/",
      description: "This elegant Avila estate offers over 32,000 sq ft of luxury living, featuring 5 bedrooms, 7 bathrooms, a chef's kitchen with premium appliances, dual offices, an exercise room, and a 3-car air-conditioned garage. The bright, open layout includes a grand primary suite with a 350+ sq ft custom closet, expansive views, and outdoor amenities such as a resort-style pool, private courtyard shower, and park-like backyard. Located in a prestigious gated community, residents enjoy world-class golf, tennis, fitness, and year-round social activities, all priced at $495/sqft."
    },
    {
      id: 2,
      image: "https://i.imgur.com/ckaG1rQ.jpeg",
      price: "$9,550,000",
      status: "Sold",
      address: "1625 Gaspar Drive S, Boca Grande, FL",
      beds: 4,
      baths: 5,
      sqft: "4,200",
      link: "https://cyndikaszirer.smithandassociates.com/listing-stellar_sold/1625-gaspar-drive-s-boca-grande-fl-33921-tb8381450/",
      description: "This custom-built 2014 modern home in Boca Grande Isles offers single-floor living with a master suite, home office, parlor, and a stunning kitchen and great room overlooking an infinity-edge pool and deep-water dock. Designed for luxury and entertaining, the home includes guest bedrooms and a billiard room accessible by elevator, all with high-end finishes and panoramic bayou views. Located in a gated neighborhood, it's just a short walk or golf cart ride to Boca Grande's beaches, shops, and restaurants."
    },
    {
      id: 3,
      image: "https://i.imgur.com/awbdWGg.jpeg",
      price: "$4,650,000",
      status: "Sold",
      address: "4911 South Atlantic Avenue, Ponce Inlet, FL",
      beds: 3,
      baths: 4,
      sqft: "3,800",
      link: "https://cyndikaszirer.smithandassociates.com/listing-stellar_sold/4911-south-atlantic-avenue-ponce-inlet-fl-32127-v4941514/",
      description: "This gated oceanfront estate in Ponce Inlet offers over 7,500 sq ft of luxurious living, featuring 5 bedrooms, 5.5 baths, a chef's kitchen, home theater, and breathtaking panoramic ocean views from nearly every room. Highlights include marble and travertine finishes, a turret with 360-degree views, a saltwater pool, and a private dune walkway to the beach. Located steps from the lighthouse and Disappearing Island, this property defines coastal elegance at $656/sqft."
    }
  ];

  return (
    <section id="properties" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Cyndi's Featured Properties
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Showcasing exceptional luxury homes and Cyndi's recent successful sales across 
            Florida's most prestigious markets.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="border-none shadow-soft hover:shadow-luxury transition-all duration-300 overflow-hidden group h-full flex flex-col">
              <div className="relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.address}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={property.status === "Active" ? "default" : "secondary"}
                    className={property.status === "Active" ? "bg-primary" : "bg-luxury-gold text-white"}
                  >
                    {property.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.price}
                  </div>
                </div>
              </div>

              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {property.address}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {property.description}
                    </p>
                  </div>

                  <div className="flex justify-center text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.beds} beds</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.baths} baths</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Square className="h-4 w-4" />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors mt-auto"
                  asChild
                >
                  <a href={property.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <a href="https://cyndikaszirer.smithandassociates.com/" target="_blank" rel="noopener noreferrer">
              View All Properties
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Properties;