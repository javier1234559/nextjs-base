'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SharePopover from "./share-popover";
import LoveButton from "./love-button";

interface ImageGalleryProps {
    images: string[];
    selectedIndex: number;
    onImageSelect: (index: number) => void;
    onLike: () => void;
    isLiked: boolean;
}

interface LightboxProps {
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
    onLike: () => void;
    isLiked: boolean;
}

function Lightbox({
    images,
    currentIndex,
    onClose,
    onPrevious,
    onNext,
    onLike,
    isLiked
}: LightboxProps) {
    const [direction, setDirection] = useState(0);

    const handlePrevious = () => {
        setDirection(-1);
        onPrevious();
    };

    const handleNext = () => {
        setDirection(1);
        onNext();
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        if (newDirection > 0) {
            handleNext();
        } else {
            handlePrevious();
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Top Toolbar */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-50">
                <motion.button
                    onClick={onClose}
                    className="text-white p-3 rounded-full transition-all duration-300 hover:scale-110 bg-black/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <X className="w-5 h-5" />
                </motion.button>

                <div className="bg-black/70 text-white text-center px-4 py-2 rounded-full text-sm transition-all duration-300">
                    {currentIndex + 1} / {images.length}
                </div>

                <div className="flex space-x-4">
                    <LoveButton onLike={onLike} isLiked={isLiked} />
                    <SharePopover
                        link={window.location.href}
                        title="Check out this property"
                        message="Check out this property"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    />
                </div>
            </div>

            {/* Navigation Buttons */}
            <motion.button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed bg-black/50 backdrop-blur-sm"
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
            >
                <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed bg-black/50 backdrop-blur-sm"
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
            >
                <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Main Image Display with Framer Motion */}
            <div className="flex items-center justify-center h-full p-4 overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full h-full flex items-center justify-center z-30 rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.img
                            src={images[currentIndex]}
                            alt={`Image ${currentIndex + 1}`}
                            className="max-h-full max-w-full object-contain"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Keyboard Navigation */}
            <div
                className="absolute inset-0 z-10"
                onKeyDown={(e) => {
                    if (e.key === 'Escape') onClose();
                    if (e.key === 'ArrowLeft') handlePrevious();
                    if (e.key === 'ArrowRight') handleNext();
                }}
                tabIndex={0}
            />
        </motion.div>
    );
}

export default function ImageGallery({
    images,
    selectedIndex,
    onImageSelect,
    onLike,
    isLiked,
}: ImageGalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);

    const handleOpenLightbox = (index: number) => {
        onImageSelect(index);
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const handlePrevious = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        onImageSelect(newIndex);

        console.log("newIndex", newIndex);
    };

    const handleNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        onImageSelect(newIndex);

        console.log("newIndex", newIndex);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const thumbnails = images.slice(1, 5);
    const extraCount = images.length - 5;

    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-2 rounded-lg overflow-hidden">
            {/* Big Image */}
            <div
                className="relative aspect-[4/3] cursor-pointer rounded-lg overflow-hidden"
                onClick={() => handleOpenLightbox(0)}
            >
                <img
                    src={images[selectedIndex]}
                    alt="Property main view"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                    <LoveButton onLike={onLike} isLiked={isLiked} />
                    <SharePopover
                        link={window.location.href}
                        title="Check out this property"
                        message="Check out this property"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    />
                </div>
                <Button
                    variant="secondary"
                    className="absolute bottom-4 right-4 text-white bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(true);
                    }}
                >
                    All photos ({images.length})
                </Button>
            </div>

            {/* Small Images */}
            <div className="grid grid-cols-2 gap-2">
                {thumbnails.map((src, i) => {
                    const index = i + 1;
                    const isLast = i === thumbnails.length - 1 && extraCount > 0;

                    return (
                        <div
                            key={index}
                            className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
                            onClick={() => handleOpenLightbox(index)}
                        >
                            <img
                                src={src}
                                alt={`Thumbnail ${index}`}
                                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                            />
                            {isLast && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-lg transition-all duration-300">
                                    +{extraCount}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Lightbox with Framer Motion */}
            <AnimatePresence>
                {isOpen && (
                    <Lightbox
                        images={images}
                        currentIndex={currentIndex}
                        onClose={handleClose}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        onLike={onLike}
                        isLiked={isLiked}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}