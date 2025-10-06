import { useState, useEffect } from "react";

interface Structure {
  _id: string;
  nome: string;
  data_costruzione: string;
  ncList: string[];
  hasNc: boolean;
}

export default function DataTablePage() {
  const [data, setData] = useState<Structure[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from localhost
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/structures");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("[v0] Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      {/* Gray Section */}
      <div className="h-16 bg-gray-200" />

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Title and Search */}
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Product selection
            </h2>

            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-y border-gray-200">
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Data Costruzione
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">Presenza NC</div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Numero NC
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => (
                    <tr key={row._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                        {row._id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {row.nome}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {formatDate(row.data_costruzione)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {row.hasNc ? (
                          <span className="inline-block">▲</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {row.ncList.length}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
