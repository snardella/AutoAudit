import * as XLSX from "xlsx"

const ImportExcelFile = (file) => {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = (e) => {
      const bufferArray = e.target.result
      const wb = XLSX.read(bufferArray, { type: "buffer" })
      const wsName = wb.SheetNames[0]
      const ws = wb.Sheets[wsName]
      const data = XLSX.utils.sheet_to_json(ws)
      resolve(data)
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })

  let fileToExport
  promise.then((d) => {
    console.log(d)
    const columnNames = []
    console.log(Object.entries(d))
    fileToExport = d
  })
  debugger
  return fileToExport
}

export default ImportExcelFile
