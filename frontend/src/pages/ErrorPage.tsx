import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-extrabold">잘못된 페이지입니다.</h1>
      <Button asChild className="text-xl">
        <Link to={`/`}>메인 페이지로 이동</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
