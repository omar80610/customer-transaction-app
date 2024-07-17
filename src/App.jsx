import {  createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Customer from "./components/Customer/Customer";
import Transaction from "./components/Transaction/Transaction";
import Statistics from "./components/Statistics/Statistics";
import NotFound from "./components/NotFound/NotFound";
import Layout from "./components/Layout/Layout";
import { DataContextProvider } from "./components/Context/DataContext";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Customer /> },
        { path: "customer", element: <Customer /> },
        { path: "transaction", element: <Transaction /> },
        { path: "statistics", element: <Statistics /> },
        { path: "*", element: <NotFound /> },
        { path: "not-found", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <DataContextProvider>
        <RouterProvider router={router} />
      </DataContextProvider>
    </>
  );
}

export default App;
