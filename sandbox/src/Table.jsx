import { useState, useEffect, useRef } from "react";

function DataTable({ data }) {
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedRows, setSelectedRows] = useState(null);
  const checkboxRef = useRef({});

  // If all is checked, uncheck all. Otherwise, check all
  const handleAll = (event) => {
    if (event.target.checked) {
      Object.values(checkboxRef.current).forEach((el) => {
        el.checked = true;
      });
    } else {
      Object.values(checkboxRef.current).forEach((el) => {
        el.checked = false;
      });
    }
  };

  // Uncheck all checkboxes when the data changes
  useEffect(() => {
    Object.values(checkboxRef.current).forEach((el) => {
      el.checked = false;
    });
  }, [data]);

  useEffect(() => {
    let sorted = [...data].sort((a, b) => a.value - b.value);
    if (sortOrder === "desc") {
      sorted.reverse();
    }
    setSortedData(sorted);
  }, [data]);

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleRowClick = (id) => {
    setSelectedRows(id);
  };

  return (
    <div>
      <button onClick={handleSort}>Sort</button>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                // Write the ref for the "all" checkbox
                ref={(el) => (checkboxRef.current["all"] = el)}
                onClick={handleAll}
              />
            </th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  // Write a ref for each checkbox
                  ref={(el) => (checkboxRef.current[item.id] = el)}
                  onChange={handleRowClick(item.id)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRows && <div>Selected rows: {selectedRows}</div>}
    </div>
  );
}

export default DataTable;
