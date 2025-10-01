import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface LoveButtonProps {
    onLike: () => void;
    isLiked: boolean;
}

export default function LoveButton({ onLike, isLiked }: LoveButtonProps) {

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        onLike();
    };

    return <Button
        variant="secondary"
        size="icon"
        className="shadow-lg p-3 transition-all duration-300 hover:scale-110 text-white bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70"
        onClick={handleLike}
    >
        <Heart
            className={`w-5 h-5 transition-all duration-300 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`}
        />
    </Button>;
}