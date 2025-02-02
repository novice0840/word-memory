import { Button } from "shared/ui";
import { Link } from "react-router-dom";
import { CircleAlert } from "lucide-react";

import { ERROR_PAGE_BUTTON_TEXT, ERROR_PAGE_TITLE } from "../constants/message";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <CircleAlert className="w-16 h-16 text-red-500" />
      <h1 className="text-xl font-extrabold">{ERROR_PAGE_TITLE}</h1>
      <Button asChild>
        <Link to="/">{ERROR_PAGE_BUTTON_TEXT}</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
