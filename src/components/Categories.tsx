import { Tag, Table, Button, Modal, Select, Form, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";
import { SketchPicker } from "react-color";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type Mode = "new" | "edit" | "delete";

function Categories() {
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>({
    name: "",
    type: "expense",
    color: "black",
  });
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") {
      dispatch(addCategory(form));
    } else if (mode === "edit" && typeof updateId === "number") {
      dispatch(updateCategory(form, updateId));
    } else if (mode === "delete" && typeof deleteId === "number") {
      dispatch(deleteCategory(deleteId));
    }
    setIsModalVisible(false);
    setMode("new");
    setForm({
      name: "",
      type: "expense",
      color: "black",
    });
    setUpdateId(null);
    setDeleteId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm({
      name: "",
      type: "expense",
      color: "black",
    });
    setUpdateId(null);
    setDeleteId(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}> {text.toUpperCase()} </Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, category: Category) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => {
              showModal("edit");
              setForm(category);
              setUpdateId(category.id);
            }}
          />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => {
              showModal("delete");
              setDeleteId(category.id);
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getCategories());
    //eslint-disable-next-line
  }, []);

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
            Create New Category
          </Button>
        </div>
        <Modal
          title={
            mode === "new"
              ? "Create New Category"
              : mode === "edit"
              ? "Update Category"
              : "Delete Category"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !form.name }}
        >
          {mode === "delete" ? (
            <div>Are you sure want to delete category ?</div>
          ) : (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item
                rules={[
                  { required: true, message: "Category name must be filled.!" },
                ]}
                label="Category Name"
              >
                <Input
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Category Type">
                <Select
                  value={form.type}
                  defaultValue="expense"
                  onChange={(e) => setForm({ ...form, type: e })}
                >
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Color">
                <SketchPicker
                  color={form.color}
                  onChange={(color) => setForm({ ...form, color: color.hex })}
                />
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} />
    </React.Fragment>
  );
}

export default Categories;
