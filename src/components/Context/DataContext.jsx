// import React, { createContext, useContext, useState, useEffect } from "react";

// const DataContext = createContext();

// export const DataContextProvider = ({ children }) => {
//   const [customers, setCustomers] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [selectedCustomerId, setSelectedCustomerId] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const customersData = [
//         { id: 1, name: "Ahmed Ali" },
//         { id: 2, name: "Aya Elsayed" },
//         { id: 3, name: "Mina Adel" },
//         { id: 4, name: "Sarah Reda" },
//         { id: 5, name: "Mohamed Sayed" },
//       ];

//       const transactionsData = [
//         { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
//         { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
//         { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
//         { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
//         { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
//         { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
//         { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
//         { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
//         { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 },
//       ];

//       setCustomers(customersData);
//       setTransactions(transactionsData);
//     };

//     fetchData();
//   }, []);

//   const getTransactionsWithCustomerNames = () => {
//     return transactions.map((transaction) => {
//       const customer = customers.find((c) => c.id === transaction.customer_id);
//       return {
//         ...transaction,
//         customerName: customer ? customer.name : "Unknown",
//       };
//     });
//   };

//   return (
//     <DataContext.Provider
//       value={{
//         customers,
//         transactions: getTransactionsWithCustomerNames(),
//         selectedCustomerId,
//         setSelectedCustomerId,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useDataContext = () => useContext(DataContext);





import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customers data
        const customersResponse = await axios.get(`https://customer-transaction.vercel.app/customers`);
        if (customersResponse.status !== 200) {
          throw new Error("Failed to fetch customers");
        }
        setCustomers(Array.isArray(customersResponse.data) ? customersResponse.data : []);

        // Fetch transactions data
        const transactionsResponse = await axios.get(`https://customer-transaction.vercel.app/transaction`);
        if (transactionsResponse.status !== 200) {
          throw new Error("Failed to fetch transactions");
        }
        setTransactions(Array.isArray(transactionsResponse.data) ? transactionsResponse.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Log the detailed Axios error response for debugging
        if (error.response) {
          console.log("Axios detailed error response:", error.response);
        }
      }
    };

    fetchData();
  }, []);

  // Function to map transactions with customer names
  const getTransactionsWithCustomerNames = () => {
    if (!Array.isArray(transactions)) return [];
    return transactions.map((transaction) => {
      // Find corresponding customer for the transaction
      const customer = customers.find((customer) => {
        return customer.id === transaction.customer_id;
      });
      // Return transaction with customerName
      return {
        ...transaction,
        customerName: customer ? customer.name : "Unknown",
      };
    });
  };

  return (
    <DataContext.Provider
      value={{
        customers,
        transactions: getTransactionsWithCustomerNames(),
        selectedCustomerId,
        setSelectedCustomerId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
