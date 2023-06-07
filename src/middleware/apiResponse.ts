import { STATUS_CODE } from "../utils/constants";

class ApiResponse {
  statusCode: number;
  result?: any;
  error?: any;
  time: number;

  constructor(statusCode: number, result?: any) {
    this.statusCode = statusCode;
    if (statusCode == STATUS_CODE.SUCCESS) {
      result ? (this.result = result) : (this.result = {});
    } else {
      result ? (this.error = result) : (this.error = {});
    }
    this.time = new Date().getTime();
  }
}

export default ApiResponse;