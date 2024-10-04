"use client"
import React from "react";
import DataEditor, { GridCell, GridCellKind, GridColumn, Item, Theme } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";

const columns: GridColumn[] = [
  { title: "Link", id: "link" },
  { title: "Name", id: "name"},
  { title: "Description", id: "description"},
  { title: "Photo", id: "photo"},
  { title: "Health", id: "health"},
];

const dataSource = [
  {
    key: '1',
    link: 'www.google.com',
    name: 'Google',
    description: 'The world\'s most popular search engine.',
    photo: 'https://picsum.photos/1080',
    health: '90%'
  },
  {
    key: '2',
    link: 'www.youtube.com',
    name: 'YouTube',
    description: 'A platform for watching and sharing videos.',
    photo: 'https://picsum.photos/1081',
    health: '85%'
  },
  {
    key: '3',
    link: 'www.github.com',
    name: 'GitHub',
    description: 'A platform for hosting and collaborating on software projects.',
    photo: 'https://picsum.photos/1082',
    health: '98%'
  },
  {
    key: '4',
    link: 'www.stackoverflow.com',
    name: 'Stack Overflow',
    description: 'A question and answer site for programmers.',
    photo: 'https://picsum.photos/1083',
    health: '92%'
  },
  {
    key: '5',
    link: 'www.apple.com',
    name: 'Apple',
    description: 'A leading technology company known for its iPhones and Macs.',
    photo: 'https://picsum.photos/1043',
    health: '88%'
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
  };

export default function Grid() {
  function getData([col, row]: Item): GridCell {
    const item = dataSource[row];
    if (!item) return { kind: GridCellKind.Text, data: "", displayData: "", allowOverlay: false };

    switch (col) {
      case 0:
        return {
          kind: GridCellKind.Uri,
          data: item.link,
          allowOverlay: false,
          displayData: item.link,
        };
      case 1:
        return {
          kind: GridCellKind.Text,
          data: item.name,
          allowOverlay: false,
          displayData: item.name,
        };
      case 2:
        return {
          kind: GridCellKind.Text,
          data: item.description,
          allowOverlay: false,
          displayData: item.description,
        };
      case 3:
        return {
          kind: GridCellKind.Image,
          data: [item.photo],
          allowOverlay: false,
          displayData: [item.photo],
        };
      case 4:
        return {
          kind: GridCellKind.Text,
          data: item.health,
          allowOverlay: false,
          displayData: item.health,
        };
      default:
        throw new Error(`Invalid column index: ${col}`);
    }
  }

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white">Data Grid Example</h1>
      </div>
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <DataEditor
          getCellContent={getData}
          columns={columns}
          rows={dataSource.length}
          theme={customTheme}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}