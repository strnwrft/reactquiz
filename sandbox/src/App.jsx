import Table from "./Table";

export default function App() {
  const data = [
    { id: 1, name: "Item 1", value: 10 },
    { id: 2, name: "Item 2", value: 20 },
    { id: 3, name: "Item 3", value: 30 },
    { id: 4, name: "Item 4", value: 40 },
    { id: 5, name: "Item 5", value: 50 },
  ];

  return <Table data={data} />;
}
