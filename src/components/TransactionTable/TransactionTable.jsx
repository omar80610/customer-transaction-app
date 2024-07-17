import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDataContext } from "../Context/DataContext";
import { CirclesWithBar } from "react-loader-spinner";

const TransactionTable = () => {
  const { transactions } = useDataContext();
  const [filters, setFilters] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initFilters();
  }, []);

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: "contains" },
      id: { value: null, matchMode: "equals" },
      customerName: { value: null, matchMode: "contains" },
      date: { value: null, matchMode: "contains" },
      amount: { value: null, matchMode: "equals" },
    });
    setIsLoading(false);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearFilter = () => {
    initFilters();
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center flex-wrap search-input">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined mb-3 sm:mb-0"
          onClick={clearFilter}
        />
        <span
          className="p-input-icon-left w-full sm:w-auto"
          style={{ display: "flex", alignItems: "center", backgroundColor: "#ffeed6" }}
        >
          <i
            className="pi pi-search"
            style={{
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              marginRight: "0.5rem"
            }}
          />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="w-full sm:w-auto"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      {isLoading ? (
        <div className="d-flex justify-content-center vh-100 align-items-center">
          <CirclesWithBar
            height="100"
            width="100"
            color="#e9b772"
            outerCircleColor="#e9b772"
            innerCircleColor="#e9b772"
            barColor="#e9b772"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <DataTable
          value={transactions}
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={["id", "customerName", "date", "amount"]}
          header={header}
          emptyMessage="No transactions found."
          responsiveLayout="scroll"
          className="custom-table"
          style={{ backgroundColor: "#000" }}
        >
          <Column
            field="id"
            header="ID"
            sortable
            filter
            filterPlaceholder="Search by ID"
            style={{ width: "50%", backgroundColor: "#F7E7DC" }}
            bodyClassName="text-center"
          />
          <Column
            field="customerName"
            header="Customer Name"
            sortable
            filter
            filterPlaceholder="Search by Customer Name"
            style={{ width: "50%", backgroundColor: "#F7E7DC" }}
            bodyClassName="text-center"
          />
          <Column
            field="date"
            header="Date"
            sortable
            filter
            filterPlaceholder="Search by Date"
            style={{ width: "50%", backgroundColor: "#F7E7DC" }}
            bodyClassName="text-center"
          />
          <Column
            field="amount"
            header="Amount"
            sortable
            filter
            filterPlaceholder="Search by Amount"
            style={{ width: "50%", backgroundColor: "#F7E7DC" }}
            bodyClassName="text-center"
          />
        </DataTable>
      )}
    </div>
  );
};

export default TransactionTable;
