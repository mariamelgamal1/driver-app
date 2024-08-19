import { useState, useEffect } from "react";
import { getAlldrivers } from "../apis/driver";
import DriverTable from "./table";
import Pagination from "../../pagination";

const DriverPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  const totalPages = 6; // Total number of pages
  const getDrivers = async () => {
    try {
      const response = await getAlldrivers(currentPage, pageSize);
      //console.log(response.data.data);
      const data = await getAlldrivers(currentPage, pageSize);
      setDrivers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };


  useEffect(() => {
    getDrivers(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <DriverTable drivers={drivers} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DriverPage;


