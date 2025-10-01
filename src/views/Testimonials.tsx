import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Steven J",
      review: "Cyndi was fantastic. She is the reason we do business with Smith. She goes above and beyond anything we could ask and consistently exceeds expectations.",
      rating: 5
    },
    {
      name: "Simone M",
      review: "Cyndi was great, responsive, efficient and communicated clearly. She was great at negotiating and offered great advice. Would highly recommend!!!",
      rating: 5
    },
    {
      name: "Philip L",
      review: "Thank you Cynthia! Thank you Smith & Associates! Cynthia has given us an education on what realtors can do. We had a fantastic time with this purchase. She says she will do something and you can take it off your list of things to do. She delivers quickly, correctly, and gave us the impression that she was working for us.",
      rating: 5
    },
    {
      name: "Kevin R",
      review: "Cindy is wonderful to work with. She knew the properties extremely well and easily stepped us through the buying process.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Cyndi's Testimonials
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hear what clients say about their experience working with Cyndi Kaszirer
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-soft hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <Quote className="h-12 w-12 text-primary/30" />
                  </div>
                  
                  <div className="flex justify-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>

                  <blockquote className="text-foreground text-center leading-relaxed italic">
                    "{testimonial.review}"
                  </blockquote>

                  <div className="text-center">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">Verified Client</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-primary/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Consistently Exceeding Expectations
            </h3>
            <p className="text-lg text-muted-foreground">
              Join the growing number of satisfied clients who have experienced 
              Cyndi's exceptional service and expertise in luxury real estate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;