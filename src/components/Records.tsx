import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { Record, RecordForm } from "../types/record";
import { Tag, Table, Button, Modal, Select, Form, Input, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  addRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from "../store/actions/recordActions";
import { Category } from "../types/category";
import { Mode } from "../types/general";
import { getCategories } from "../store/actions/categoryActions";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};

const Records = () => {
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );
  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") {
      dispatch(addRecord(form));
    } else if (mode === "edit" && typeof updateId === "number") {
      dispatch(updateRecord(form, updateId));
    } else if (mode === "delete" && typeof deleteId === "number") {
      dispatch(deleteRecord(deleteId));
    }
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
  };

  const isFormValid = !(
    !form.title ||
    form.amount === 0 ||
    form.category_id === 0
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
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: Record) => {
        return <>{new Date(updatedAt).toLocaleDateString("tr")}</>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Record) => {
        const { title, amount } = record;
        const category_id = record.category.id;
        return (
          <Space size="middle">
            <EditOutlined
              style={{ color: "blue" }}
              onClick={() => {
                showModal("edit");
                setForm({ title, amount, category_id });
                setUpdateId(record.id);
              }}
            />
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => {
                showModal("delete");
                setDeleteId(record.id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getRecords());
    !categories.length && dispatch(getCategories());
    //eslint-disable-next-line
  }, [dispatch]);

  return (
    <React.Fragment>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button type="primary" onClick={() => showModal("new")}>
            Create New Records
          </Button>
        </div>
        <Modal
          title={
            mode === "new"
              ? "Create New Record"
              : mode === "edit"
              ? "Update Record"
              : "Delete Record"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
        >
          {mode === "delete" ? (
            <div>Are you sure want to delete record ?</div>
          ) : (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item
                rules={[
                  { required: true, message: "Record title must be filled.!" },
                ]}
                label="Title"
              >
                <Input
                  name="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Form.Item>

              <Form.Item
                rules={[{ required: true, message: "Amount must be filled.!" }]}
                label="Amount"
              >
                <Input
                  name="amount"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: Number(e.target.value) })
                  }
                />
              </Form.Item>

              <Form.Item label="Category">
                <Select
                  value={form.category_id}
                  defaultValue={form.category_id}
                  onChange={(category_id) => setForm({ ...form, category_id })}
                >
                  <Select.Option value={0} disabled>
                    Select a category
                  </Select.Option>
                  {categories.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
      <Table rowKey="id" loading={loading} columns={columns} dataSource={data} />
    </React.Fragment>
  );
};

export default Records;
