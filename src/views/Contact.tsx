import { Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      detail: "(813) 743-2847",
      action: "tel:+18137432847",
      description: "Text for instant response"
    },
    {
      icon: Mail,
      title: "Email",
      detail: "ckaszirer@smithandassociates.com",
      action: "mailto:ckaszirer@smithandassociates.com",
      description: "Response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Location",
      detail: "3801 W Bay to Bay Boulevard, Tampa, FL",
      action: "https://maps.google.com/?q=3801+W+Bay+to+Bay+Boulevard,+Tampa,+FL",
      description: "Smith & Associates Real Estate"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background pb-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get In Touch With Cyndi
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to buy or sell luxury real estate in Florida? Contact Cyndi today 
            for a personalized consultation and exceptional service.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((contact, index) => (
            <Card key={index} className="border-none shadow-soft hover:shadow-luxury transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                  <contact.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{contact.title}</h3>
                <a 
                  href={contact.action}
                  className="text-lg font-medium text-foreground mb-2 hover:text-primary transition-colors cursor-pointer block"
                  {...(contact.title === "Location" && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {contact.detail}
                </a>
                <p className="text-sm text-muted-foreground mb-6">{contact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;