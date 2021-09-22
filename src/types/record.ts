import { ThunkDispatch } from "redux-thunk";
import { Category } from "./category";

export interface Record {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface RecordForm {
  title: string;
  amount: number;
  category_id: number;
}

export interface RecordState {
  data: Record[];
  loading: boolean;
  error: string;
}

interface GET_RECORDS_START {
  type: "GET_RECORDS_START";
}

interface GET_RECORDS_SUCCESS {
  type: "GET_RECORDS_SUCCESS";
  payload: Record[];
}

interface GET_RECORDS_ERROR {
  type: "GET_RECORDS_ERROR";
}

interface ADD_RECORD_START {
  type: "ADD_RECORD_START";
}

interface ADD_RECORD_SUCCESS {
  type: "ADD_RECORD_SUCCESS";
  payload: Record;
}

interface ADD_RECORD_ERROR {
  type: "ADD_RECORD_ERROR";
}

interface UPDATE_RECORD_START {
  type: "UPDATE_RECORD_START";
}

interface UPDATE_RECORD_SUCCESS {
  type: "UPDATE_RECORD_SUCCESS";
  payload: Record;
}

interface UPDATE_RECORD_ERROR {
  type: "UPDATE_RECORD_ERROR";
}

interface DELETE_RECORD_START {
  type: "DELETE_RECORD_START";
}

interface DELETE_RECORD_SUCCESS {
  type: "DELETE_RECORD_SUCCESS";
  payload: Record;
}

interface DELETE_RECORD_ERROR {
  type: "DELETE_RECORD_ERROR";
}

export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>;

export type RecordAction =
  | GET_RECORDS_START
  | GET_RECORDS_SUCCESS
  | GET_RECORDS_ERROR
  | ADD_RECORD_START
  | ADD_RECORD_SUCCESS
  | ADD_RECORD_ERROR
  | UPDATE_RECORD_START
  | UPDATE_RECORD_SUCCESS
  | UPDATE_RECORD_ERROR
  | DELETE_RECORD_START
  | DELETE_RECORD_SUCCESS
  | DELETE_RECORD_ERROR;
