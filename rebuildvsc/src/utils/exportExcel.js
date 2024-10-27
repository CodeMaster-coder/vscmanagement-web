import XLSX from "xlsx/dist/xlsx.full.min.js";  
  
export function exportToExcel(data, filename) {  
  // 如果没有数据，则不执行任何操作  
  if (!data || data.length === 0) {  
    console.warn("No data to export.");  
    return;  
  }  
  
  // 创建一个空的工作簿对象  
  const workbook = XLSX.utils.book_new();  
  
  // 第一步：确定所有对象的共有属性  
  // 我们将使用一个 Set 来存储所有唯一的属性名称  
  const propertySet = new Set();  
  data.forEach(obj => {  
    Object.keys(obj).forEach(key => {  
      propertySet.add(key);  
    });  
  });  
  
  // 将 Set 转换为数组，以便我们可以使用它作为工作表的标题行  
  const propertyNames = Array.from(propertySet);  
  
  // 第二步：构建工作表数据  
  // 我们将使用一个二维数组来表示工作表数据  
  // 第一个元素是标题行，其余元素是数据行  
  const worksheetData = [propertyNames, ...data.map(obj => propertyNames.map(key => obj[key] || ""))];  
  
  // 注意：如果某个对象缺少某个属性，我们使用空字符串 "" 来填充该值  
  
  // 第三步：创建工作表  
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);  
  
  // 第四步：将工作表添加到工作簿中  
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");  
  
  // 第五步：导出 Excel 文件  
  XLSX.writeFile(workbook, filename);  
}