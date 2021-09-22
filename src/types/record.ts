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

export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>;

export type RecordAction =
  | GET_RECORDS_START
  | GET_RECORDS_SUCCESS
  | GET_RECORDS_ERROR;
