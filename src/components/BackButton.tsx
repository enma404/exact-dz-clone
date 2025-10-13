import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  to?: string;
  label?: string;
}

const BackButton = ({ to, label = "رجوع" }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="group mb-6 hover:bg-primary/10 transition-all duration-300"
    >
      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      {label}
    </Button>
  );
};

export default BackButton;
