import { Award, Heart, Home, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const achievements = [
    {
      icon: Award,
      title: "Top 100 Agent",
      description: "Recognized as one of the top 100 real estate agents in Florida"
    },
    {
      icon: Home,
      title: "Luxury Specialist",
      description: "Expert in luxury residential sales, relocations and referrals"
    },
    {
      icon: Heart,
      title: "Client-Focused",
      description: "Passionate about matching clients with their perfect home"
    },
    {
      icon: TrendingUp,
      title: "Market Expert",
      description: "Deep knowledge of Tampa Bay, Daytona, and Boca Grande markets"
    }
  ];

  return (
    <section id="about" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About Cyndi
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-lg text-foreground leading-relaxed">
              <p>
                With a focus on luxury residential sales and relocations, Cyndi Kaszirer was driven to a career in real estate by her love of people, matching them with the perfect home, and guiding them through the negotiation process. Cyndi brings her positive energy, passion for architecture, and entrepreneurial spirit to every deal, and always puts her clients first. She has earned the trust of her clients through her knowledge of the market, integrity, supreme professionalism, and transparency. In fact, she gains most of her clients through referrals because Cyndi is always willing to expend the extra effort to exceed her clients' expectations.
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-6">
              <div className="text-3xl font-bold text-primary">Top 100</div>
              <div className="text-sm text-muted-foreground">
                Agent in Florida<br />
                Smith & Associates
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-none shadow-soft hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <achievement.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;