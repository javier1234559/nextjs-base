'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone } from "lucide-react"
import { toast } from "sonner"

interface ContactFormProps {
    onSubmit: (data: { name: string; email: string; phone: string; message: string }) => void
}

export function ContactForm({ onSubmit }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "I'm interested in this property. Please contact me with more information.",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Input name="phone" type="tel" placeholder="Your Phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
                <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows={4} />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Send Message
            </Button>
        </form>
    )
}


interface AgentContactProps {
    agent: {
        name: string
        email: string
        phone: string
        avatar?: string
    }
}

export function AgentContact({ agent }: AgentContactProps) {
    const [showContactForm, setShowContactForm] = useState(false)

    const handleContactSubmit = (data: { name: string; email: string; phone: string; message: string }) => {
        console.log("Contact form submitted:", data)
        // Handle form submission here

        toast.success("Message sent successfully!")
        setShowContactForm(false)
    }



    return (
        <Card className="sticky top-8 shadow-lg">
            <CardContent className="p-6">
                <div className="text-center mb-6">
                    <Avatar className="w-16 h-16 mx-auto mb-4 shadow-lg">
                        <AvatarImage src={agent.avatar} alt={agent.name} className="object-cover" />
                        <AvatarFallback className="text-xl font-bold text-muted-foreground">
                            {agent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{agent.name}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{agent.email}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{agent.phone}</span>
                        </div>
                    </div>
                </div>

                {!showContactForm ? (
                    <div className="space-y-3">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setShowContactForm(true)}>
                            Contact agent
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-foreground">Contact Agent</h4>
                            <Button variant="ghost" size="sm" onClick={() => setShowContactForm(false)}>
                                ✕
                            </Button>
                        </div>
                        <ContactForm onSubmit={handleContactSubmit} />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}