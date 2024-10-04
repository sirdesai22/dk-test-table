"use client";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  Theme,
} from "@glideapps/glide-data-grid";
import React, { useCallback } from "react";

type Props = {};

const columns: GridColumn[] = [
  {
    title: "Logo",
    id: "name",
  },
  {
    title: "Company",
    id: "company",
  },
  {
    title: "Email",
    id: "email",
  },
  {
    title: "Phone",
    id: "phone",
  },
];

const data = [
  {
    name: "Hines Fowler",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127",
  },
  {
    name: "Hines Fowler",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127",
  },
  {
    name: "Hines Fowler",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127",
  },
  {
    name: "Hines Fowler",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127",
  },
];

const customTheme: Partial<Theme> = {
  bgCell: "#1F2937", // Tailwind's gray-800
  bgHeader: "#111827", // Tailwind's gray-900
  bgHeaderHasFocus: "#374151", // Tailwind's gray-700
  bgHeaderHovered: "#4B5563", // Tailwind's gray-600
  textDark: "#F9FAFB", // Tailwind's gray-50
  textMedium: "#E5E7EB", // Tailwind's gray-200
  textLight: "#D1D5DB", // Tailwind's gray-300
  borderColor: "#4B5563", // Tailwind's gray-600
  accentColor: "#3B82F6", // Tailwind's blue-500
  accentLight: "#60A5FA", // Tailwind's blue-400
  textHeader: "#FFF"
};

const page = (props: Props) => {
  const getCellContent = useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow:any = data[row];
    const indexes = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      readonly: false,
      displayData: d,
      data: d,
    };
  }, []);

  const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
    if (newValue.kind !== GridCellKind.Text) {
      // we only have text cells, might as well just die here.
      return;
    }

    const indexes = ["name", "company", "email", "phone"];
    const [col, row] = cell;
    const key = indexes[col];
    data[row][key] = newValue.data;
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-700 to-indigo-700">
      <div className="rounded-lg overflow-hidden">
        <DataEditor
          getCellContent={getCellContent}
          columns={columns}
          rows={data.length}
          onCellEdited={onCellEdited}
          theme={customTheme}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default page;
