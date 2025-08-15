import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "@/router/AppRouter";

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}
