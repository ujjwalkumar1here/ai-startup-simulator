import Loader from "./Loader.jsx";

export default function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <Loader size="h-10 w-10" />
    </div>
  );
}
