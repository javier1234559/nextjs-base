import About from "@/views/About";
import Hero from "@/views/Hero";
import Properties from "@/views/Properties";
import Services from "@/views/Services";
import Testimonials from "@/views/Testimonials";
import { Contact } from "lucide-react";

export default function Home() {
    return <div className="min-h-screen">
        <Hero />
        <About />
        <Services />
        <Properties />
        <Testimonials />
        <Contact />
    </div>;
}