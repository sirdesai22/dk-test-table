"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef, InputRef, TableProps } from "antd";
import { Button, Form, Input, Popconfirm, Table, Tag } from "antd";
import Image from "next/image";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  logo: any;
  name: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
}

type ColumnTypes = Exclude<TableProps<DataType>["columns"], undefined>;

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      logo: "https://picsum.photos/1090",
      name: "Google",
      url: "www.google.com",
      category: "Search engine",
      description: "Google is a search engine.",
      tags: ["SEO", "Google"]
    },
    {
      key: "1",
      logo: "https://picsum.photos/1080",
      name: "Youtube",
      url: "www.youtube.com",
      category: "Streaming",
      description: "YouTube is a streaming application.",
      tags: ["Streaming", "Video"]
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Favicon",
      dataIndex: "logo",
      // editable: true,
      render: (text: any) => (
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
      title: "Company Name",
      dataIndex: "name",
    //   width: "30%",
      editable: true,
    },
    {
        title: "Tags",
        dataIndex: "tags",
        // width: "30%",
        // editable: true,
        render: (_: any, { tags }: any) => (
            <>
              {tags.map((tag: any) => {
                let color = tag.length < 7 ? "blue" : tag.length>7? "green": "yellow";
                if (tag === "fetching...") {
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
      title: "URL",
      dataIndex: "url",
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      editable: true,
    },

    {
      title: "Description",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button className="bg-red-500 font-semibold text-white border-none">
              Delete
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      logo: `https://picsum.photos/109${count}`,
      name: "Company Name",
      url: "www.example.com",
      category: "Eg: Technology",
      description: "Company Description",
      tags: ["fetching..."]

    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: (props: any) => {
        const cellProps = {
          ...props,
          className: `!text-white !bg-[#17161b] !border-gray-500 border !px-5 ${
            props.className || ""
          }`,
        };
        return <EditableCell {...cellProps} />;
      },
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  useEffect(() => {
    // Apply styles that override Ant Design's default styles
    const style = document.createElement("style");
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
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table<DataType>
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        className="[&_.ant-table-cell]:!py-2 [&_.ant-table-cell]:!px-4"
        // components={{
        //   body: {
        //     cell: (props:any) => (
        //       <td {...props} className="!text-white !bg-[#17161b] !border-gray-500 border !px-5" />
        //     ),
        //   },
        // }}
      />
    </div>
  );
};

export default App;
