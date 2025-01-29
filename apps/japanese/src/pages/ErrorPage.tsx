import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ERROR_PAGE_TITLE, ERROR_PAGE_BUTTON_TEXT } from "@/constants/message";
import { DangerCircle } from "@mynaui/icons-react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <DangerCircle className="w-16 h-16 text-red-500" />
      <h1 className="text-xl font-extrabold">{ERROR_PAGE_TITLE}</h1>
      <Button asChild>
        <Link to="/">{ERROR_PAGE_BUTTON_TEXT}</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
