import Hero from './components/Hero';
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
    <div className="text-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Your Ultimate Travel Planner ✈️🌍
      </h1>
      <Hero />
    </div>
    </>
  );
}

export default App;
