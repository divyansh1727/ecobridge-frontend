import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import Home from "./pages/Home";
import RoleSelect from "./components/RoleSelect";
import WasteForm from "./components/WasteForm";
import RecycleForm from "./components/RecycleForm";
import WasteStatus from "./components/WasteStatus";
import RecyclerDashboard from "./components/RecyclerDashboard";
import Footer from "./components/Footer";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [step, setStep] = useState("splash");
  const [selectedRole, setSelectedRole] = useState(null);
  const [wasteData, setWasteData] = useState(null);

  /* ---------------- Splash Screen ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep("home");
      window.history.replaceState(
        { step: "home", selectedRole: null, wasteData: null },
        "",
        ""
      );
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  /* ---------------- Push browser history ---------------- */
  useEffect(() => {
    if (step !== "splash") {
      window.history.pushState(
        { step, selectedRole, wasteData },
        "",
        ""
      );
    }
  }, [step, selectedRole, wasteData]);

  /* ---------------- Handle browser back ---------------- */
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        setStep(event.state.step);
        setSelectedRole(event.state.selectedRole);
        setWasteData(event.state.wasteData);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (step === "splash") return <Splash />;

  return (
    <>
      <Navbar currentStep={step} goHome={() => setStep("home")} />


      <div className="pt-20">
        <AnimatePresence mode="wait">

          {/* ---------------- HOME ---------------- */}
          {step === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <Home onContinue={() => setStep("role")} />
            </motion.div>
          )}

          {/* ---------------- ROLE SELECT ---------------- */}
          {step === "role" && (
            <motion.div
              key="role"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <RoleSelect
                onSelect={(role) => {
                  setSelectedRole(role);

                  if (role === "generator") {
                    setStep("wasteForm");
                  } else if (role === "recycler") {
                    setStep("recyclerForm");
                  } else if (role === "admin") {
                    alert("Admin panel coming soon!");
                  }
                }}
                onBack={() => setStep("home")}
              />
            </motion.div>
          )}

          {/* ---------------- WASTE GENERATOR FORM ---------------- */}
          {step === "wasteForm" && (
            <motion.div
              key="wasteForm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <WasteForm
                onSubmitWaste={(data) => {
                  setWasteData(data);
                  setStep("status");
                }}
                onBack={() => setStep("role")}
              />
            </motion.div>
          )}

          {/* ---------------- RECYCLER REGISTRATION ---------------- */}
          {step === "recyclerForm" && (
            <motion.div
              key="recyclerForm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <RecycleForm
                onSubmit={() => setStep("recyclerDashboard")}
                onBack={() => setStep("role")}
              />
            </motion.div>
          )}

          {/* ---------------- WASTE STATUS ---------------- */}
          {step === "status" && wasteData && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <WasteStatus
                data={wasteData}
                onBack={() => setStep("role")}
              />
            </motion.div>
          )}

          {/* ---------------- RECYCLER DASHBOARD ---------------- */}
          {step === "recyclerDashboard" && (
            <motion.div
              key="recyclerDashboard"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <RecyclerDashboard onBack={() => setStep("role")} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer />
    </>
  );
}

export default App;
