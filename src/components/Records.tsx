import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { Record } from "../types/record";
import { Table, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { getRecords } from "../store/actions/recordActions";
import { Category } from "../types/category";

const Records = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "Title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "Amount",
      render: (amount: Record["amount"], record: Record) => {
        return (
          <>
            {Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => {
        return (
          <Tag color={category.color}> {category.name.toUpperCase()} </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Record) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue" }} onClick={() => {}} />
          <DeleteOutlined style={{ color: "red" }} onClick={() => {}} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  return (
    <div>
      <Table loading={loading} columns={columns} dataSource={data} />
    </div>
  );
};

export default Records;
