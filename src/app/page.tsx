"use client"
import Image from "next/image";
import { Table, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useEffect } from 'react';

interface DataType {
  name: string;
  url: string;
  logo: string;
  category: string;
  tags: string[];
  description: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Logo",
    dataIndex: "logo",
    render: (text: string) => (
      <Image
        src={text}
        alt="Image"
        width={50}
        height={50}
        className="rounded-full"
      />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (text: string) => <h1 className="font-semibold">{text}</h1>
  },
  {
    title: "URL",
    dataIndex: "url",
    render: (text: string) => <a className="underline text-blue-500">{text}</a>,
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    render: (_: any, { tags }: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length < 7 ? "blue" : tag.length>7? "green": "yellow";
          if (tag === "software") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
  },
];

const data: DataType[] = [
  {
    name: "Google",
    url: "www.google.com",
    logo: "https://picsum.photos/1080",
    category: "Technology",
    tags: ["search engine", "internet", "software"],
    description: "A global technology company specializing in search, cloud computing, advertising technologies, and other internet-related products and services."
  },
  {
    name: "Amazon",
    url: "www.amazon.com",
    logo: "https://picsum.photos/1081",
    category: "E-commerce",
    tags: ["retail", "online shopping", "marketplace"],
    description: "An American multinational technology company that focuses on e-commerce, cloud computing, artificial intelligence, and digital streaming."
  },
  {
    name: "Netflix",
    url: "www.netflix.com",
    logo: "https://picsum.photos/1082",
    category: "Entertainment",
    tags: ["streaming", "movies", "TV shows"],
    description: "A global streaming service offering a wide variety of TV shows, movies, documentaries, and anime."
  },
  {
    name: "Microsoft",
    url: "www.microsoft.com",
    logo: "https://picsum.photos/1083",
    category: "Technology",
    tags: ["software", "operating systems", "cloud computing"],
    description: "An American multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and services."
  },
  {
    name: "Apple",
    url: "www.apple.com",
    logo: "https://picsum.photos/1084",
    category: "Technology",
    tags: ["hardware", "software", "electronics"],
    description: "An American multinational technology company that designs, develops, manufactures, and sells consumer electronics, computer software, and online services."
  },
  {
    name: "Facebook",
    url: "www.facebook.com",
    logo: "https://picsum.photos/1085",
    category: "Social Media",
    tags: ["networking", "communication", "social platform"],
    description: "A social networking service and website that allows users to create profiles, share photos and videos, and connect with friends and family."
  },
  {
    name: "Tesla",
    url: "www.tesla.com",
    logo: "https://picsum.photos/1086",
    category: "Automotive",
    tags: ["electric vehicles", "technology", "innovation"],
    description: "An American electric vehicle and clean energy company."
  },
  {
    name: "Spotify",
    url: "www.spotify.com",
    logo: "https://picsum.photos/1087",
    category: "Entertainment",
    tags: ["music streaming", "podcasts", "audio"],
    description: "A digital music service that provides on-demand access to millions of songs from thousands of artists."
  },
  {
    name: "LinkedIn",
    url: "www.linkedin.com",
    logo: "https://picsum.photos/1088",
    category: "Professional Networking",
    tags: ["jobs", "career", "networking"],
    description: "A professional networking service that helps people find jobs, build their professional networks, and discover insights."
  },
  {
    name: "Twitter",
    url: "www.twitter.com",
    logo: "https://picsum.photos/1089",
    category: "Social Media",
    tags: ["microblogging", "news", "social platform"],
    description: "A social networking and microblogging service that allows users to post and interact with short messages known as 'tweets'."
  },
  {
    name: "Instagram",
    url: "www.instagram.com",
    logo: "https://picsum.photos/1090",
    category: "Social Media",
    tags: ["photo sharing", "video sharing", "social platform"],
    description: "A social networking service and online photo sharing platform."
  },
  {
    name: "TikTok",
    url: "www.tiktok.com",
    logo: "https://picsum.photos/1091",
    category: "Social Media",
    tags: ["video sharing", "short-form video", "social platform"],
    description: "A social media platform for creating and sharing short videos."
  }
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function Home() {
  useEffect(() => {
    // Apply styles that override Ant Design's default styles
    const style = document.createElement('style');
    style.textContent = `
      .ant-table-thead > tr > th {
        background-color: #212121 !important;
        color: #b9b9b9 !important;  /* text-red-500 */
        padding: 15px !important;
        border-bottom: none !important;
      }
      .ant-table-thead > tr > th::before {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="p-5 min-h-screen w-full bg-gradient-to-br from-blue-800 to-indigo-800">
      <Table<DataType>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        className="[&_.ant-table-cell]:!py-2 [&_.ant-table-cell]:!px-4"
        rowClassName={() => "hover:!bg-blue-300"}
        components={{
          body: {
            cell: (props:any) => (
              <td {...props} className="!text-white !bg-[#17161b] !border-gray-500 border !px-5" />
            ),
          },
        }}
      />
    </div>
  );
}