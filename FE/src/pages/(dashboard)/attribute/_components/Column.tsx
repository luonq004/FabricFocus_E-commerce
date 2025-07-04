import { ColumnDef } from "@tanstack/react-table";

import ActionCell from "./ActionCell";
import { Attribute } from "@/common/types/Product";

export const columnAttribute: ColumnDef<Attribute>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Tên",
  },

  {
    accessorKey: "values",
    header: "Giá trị",
    cell: ({ row }) => {
      const attribute = row.original;

      return (
        <div className="flex space-x-2">
          {Array.isArray(attribute.values) && attribute.values.length > 0 ? (
            attribute.values.map((value, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded"
                title={value.name}
              >
                {value.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500">Không có giá trị</span>
          )}
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
