import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

export function Toast(message, bool) {
    let status = bool ? "success" : "error";
    toast[status](`${message}`, {
      position: "bottom-right",
      autoClose: 1000,
    });
  }

export function exportToExel(json,exelName){

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(json);

    XLSX.utils.book_append_sheet(wb,ws,exelName);

    XLSX.writeFile(wb,"DataSheet.xlsx");

}
