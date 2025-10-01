'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Share, Link, MessageSquare, Mail, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { toast } from "sonner";

interface SharePopoverProps {
    link: string;
    title: string;
    message: string;
    onClick?: (e: React.MouseEvent) => void;
}

export default function SharePopover({ link, title, message, onClick }: SharePopoverProps) {
    const [open, setOpen] = useState(false);
    const { copyToClipboard } = useCopy();

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        copyToClipboard(link);
        toast.success("Link copied to clipboard", {
            description: "You can now share the link with your friends",
        });
    };

    const handleShareMessage = (e: React.MouseEvent) => {
        e.stopPropagation();
        const href = `sms:?&body=${encodeURIComponent(message)}`;
        window.open(href, "_blank");
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: message,
                    url: link,
                });
            } catch (err) {
                console.error("Share canceled or failed:", err);
            }
        } else {
            alert("Your browser does not support native sharing.");
        }
    };


    const handleShareEmail = (e: React.MouseEvent) => {
        e.stopPropagation();
        const href = `mailto:?body=${encodeURIComponent(message)}`;
        window.open(href, "_blank");
    };

    const items = [
        { icon: <Link className="w-5 h-5" />, label: "Copy link", onClick: handleCopy },
        { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", onClick: handleShareMessage },
        { icon: <Upload className="w-5 h-5" />, label: "Share to…", onClick: handleNativeShare },
        { icon: <Mail className="w-5 h-5" />, label: "Email", onClick: handleShareEmail },
    ];

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <motion.button
                    className="text-white p-3 rounded-full transition-all duration-300 bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    whileHover={{ scale: 1.1 }}
                    onClick={onClick}
                >
                    <Share className="w-4 h-4" />
                </motion.button>
            </PopoverTrigger>

            <AnimatePresence>
                {open && (
                    <PopoverContent
                        className="w-fit p-4 bg-white rounded-xl shadow-lg border border-gray-200"
                        align="center"
                        sideOffset={8}
                        asChild
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <p className="text-sm font-medium">Share property</p>
                                <button
                                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                    onClick={() => setOpen(false)}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                {items.map((item) => (
                                    <motion.button
                                        key={item.label}
                                        className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-gray-100"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={item.onClick}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <span className="text-xs">{item.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </PopoverContent>
                )}
            </AnimatePresence>
        </Popover>
    );
}
