import React from "react";
import DataTable from "react-data-table-component";
import Loader from "../Loader";
import { m } from "framer-motion";
import "./customDataTable.css";

const CustomDataTable = ({
  columns,
  data,
  noHeight,
  pagination,
  paginationServer,
  paginationTotalRows,
  onChangePage,
  highlightOnHover,
  progressPending,
  onRowClicked,
}) => {
  const tableStyles = (noHeight) => {
    return {
      table: {
        style: {
          minHeight: !noHeight && "70vh",
          backgroundColor: "#ececec",
        },
      },
      headRow: {
        style: {
          fontFamily: "Raleway",
          backgroundColor: "#c3c3c3",
          minHeight: "56px",
          borderBottomWidth: "1px",
          borderBottomColor: "var(--primary-color)",
          borderBottomStyle: "solid",
          fontWeight: "800",
          fontSize: "16px",
        },
      },
      rows: {
        style: {
          fontFamily: "Quicksand",
          fontSize: "16px",
          fontWeight: 600,
          color: "#6b6b6b",
          backgroundColor: "#e5e5e5",
          minHeight: "65px",
          "&:not(:last-of-type)": {
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: "#6b6b6b",
          },
        },
        highlightOnHoverStyle: {
          color: "#000",
          backgroundColor: "#6bbaa71e",
          transitionDuration: "0.15s",
          transitionProperty: "background-color",
          borderBottomColor: "#6bbaa7",
          outlineStyle: "solid",
          outlineWidth: "1px",
          outlineColor: "#6bbaa7",
        },
      },
      pagination: {
        style: {
          color: "#000",
          fontSize: "14px",
          minHeight: "56px",
          backgroundColor: "#e5e5e5",
          borderTopStyle: "solid",
          borderTopWidth: "1px",
          borderTopColor: "var(--primary-color)",
        },
        pageButtonsStyle: {
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          padding: "8px",
          margin: "px",
          cursor: "pointer",
          transition: "0.4s",
          color: "var(--primary-color)",
          fill: "var(--primary-color)",
          backgroundColor: "transparent",
        },
      },
      progress: {
        style: {
          padding: "2rem",
          backgroundColor: "#e5e5e5",
        },
      },
    };
  };

  return (
    <div className="table-wrapper">
      <m.div
        className="main-table"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >
        <DataTable
          columns={columns}
          data={data}
          customStyles={tableStyles(noHeight)}
          responsive
          highlightOnHover={highlightOnHover}
          progressPending={progressPending}
          progressComponent={
            <div className="flex-gap">
              <Loader />
            </div>
          }
          pagination={pagination}
          paginationServer={paginationServer}
          paginationTotalRows={paginationTotalRows}
          onChangePage={onChangePage}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
          onRowClicked={onRowClicked}
        />
      </m.div>
    </div>
  );
};

export default CustomDataTable;
