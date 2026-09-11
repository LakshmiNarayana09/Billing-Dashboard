
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Layout";
import BillingOverview from "./pages/BillingOverview";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import PaymentMethods from "./pages/PaymentMethods";
import Invoices from "./pages/Invoices";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" element={<BillingOverview />} />
        <Route path="/plans" element={<SubscriptionPlans />} />
        <Route path="/payments" element={<PaymentMethods />} />
        <Route path="/invoices" element={<Invoices />} />

      </Route>
    </Routes>
  );
}

export default App;

