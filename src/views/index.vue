<template>
  <div id="home">
    <el-button @click="exportExcel">导出Excel</el-button>
    <el-table
      :data="tableData"
      ref="table"
      style="width: 100%"
      :header-cell-style="rowCenter"
      :cell-style="rowCenter"
    >
      <el-table-column ref="tableHeader" class="th1" prop="date" label="一级表头" width="150">
        <el-table-column class="th2" label="2级表头1">
          <el-table-column prop="td1" label="1-1" width="120"></el-table-column>
          <el-table-column prop="td2" label="1-2" width="120"></el-table-column>
          <el-table-column prop="td3" label="1-3" width="120"></el-table-column>
          <el-table-column prop="td4" label="1-4" width="120"></el-table-column>
          <el-table-column prop="td5" label="1-5" width="120"></el-table-column>
          <el-table-column prop="td6" label="1-6" width="120"></el-table-column>
          <el-table-column prop="td7" label="1-7" width="120"></el-table-column>
          <el-table-column prop="td8" label="1-8" width="120"></el-table-column>
          <el-table-column prop="td9" label="1-9" width="120"></el-table-column>
        </el-table-column>
        <el-table-column class="th2" label="2级表头2">
          <el-table-column prop="td10" label="2-1" width="120"></el-table-column>
          <el-table-column prop="td11" label="2-2" width="120"></el-table-column>
          <el-table-column prop="td12" label="2-3" width="120"></el-table-column>
          <el-table-column prop="td13" label="2-4" width="120"></el-table-column>
          <el-table-column prop="td14" label="2-5" width="120"></el-table-column>
          <el-table-column prop="td15" label="2-6" width="120"></el-table-column>
          <el-table-column prop="td16" label="2-7" width="120"></el-table-column>
          <el-table-column prop="td17" label="2-8" width="120"></el-table-column>
          <el-table-column prop="td18" label="2-9" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
    <LineChart></LineChart>
  </div>
</template>
<script>
import XLSX from 'xlsx-style'
import FileSaver from 'file-saver'
import LineChart from '@/components/echarts/line/lineChart'
export default {
    name: 'home',
    components: {
        LineChart
    },
    data () {
        return {
            tableData: [
                {
                    td1: '1-1',
                    td2: '1-2',
                    td3: '1-3',
                    td4: '1-4',
                    td5: '1-5',
                    td6: '1-6',
                    td7: '1-7',
                    td8: '1-8',
                    td9: '1-9',
                    td10: '2-1',
                    td11: '2-2',
                    td12: '2-3',
                    td13: '2-4',
                    td14: '2-5',
                    td15: '2-6',
                    td16: '2-7',
                    td17: '2-8',
                    td18: '2-9'
                }
            ],
            // 设置表格中cell默认的字体，居中，颜色等
            defaultCellStyle: {
                font: {name: '宋体', sz: 11, color: {auto: 1}},
                border: {
                    bottom: {
                        style: 'thin',
                        color: {
                            rgb: '000000'
                        }
                    },
                    top: {
                        style: 'thin',
                        color: {
                            rgb: '000000'
                        }
                    },
                    left: {
                        style: 'thin',
                        color: {
                            rgb: '000000'
                        }
                    },
                    right: {
                        style: 'thin',
                        color: {
                            rgb: '000000'
                        }
                    }
                },
                alignment: {
                    /// 自动换行
                    wrapText: 1,
                    // 居中
                    horizontal: 'center',
                    vertical: 'center',
                    indent: 0
                }
            }
        }
    },
    methods: {
        rowCenter () {
            return 'text-align:center'
        },
        // 从json转化为sheet，xslx中没有aoaToSheet的方法，该方法摘自官方test
        sheet_from_array_of_arrays (data) {
            const lengthArr = data.map((item) => item.length)
            const columnMax = Math.max(...lengthArr)
            const ws = {}
            // r:行；c:列
            const range = {s: {c: 1, r: 1}, e: {c: 0, r: 0}}
            for (let R = 0; R < data.length; R++) {
                for (let C = 0; C < columnMax; C++) {
                    if (range.s.r > R) {range.s.r = R}
                    if (range.s.c > C) {range.s.c = C}
                    if (range.e.r < R) {range.e.r = R}
                    if (range.e.c < C) {range.e.c = C}
                    const cell = {v: data[R][C], s: this.defaultCellStyle}
                    const cellRef = XLSX.utils.encode_cell({c: C, r: R})
                    ws[cellRef] = cell
                }
            }

            if (range.s.c < 10000000) {ws['!ref'] = XLSX.utils.encode_range(range)}
            return ws
        },
        // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
        sheet2blob (sheet, sheetName) {
            sheetName = sheetName || 'sheet1'
            const workbook = {
                SheetNames: [sheetName],
                Sheets: {}
            }
            workbook.Sheets[sheetName] = sheet
            // 生成excel的配置项
            const wopts = {
                bookType: 'xlsx', // 要生成的文件类型
                bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                type: 'binary'
            }

            const wbout = XLSX.write(workbook, wopts, {
                defaultCellStyle: this.defaultCellStyle
            })
            const blob = new Blob([s2ab(wbout)], {
                type: 'application/octet-stream'
            })
            // 字符串转ArrayBuffer
            function s2ab (s) {
                const buf = new ArrayBuffer(s.length)
                const view = new Uint8Array(buf)
                for (let i = 0; i !== s.length; ++i) {view[i] = s.charCodeAt(i) & 0xff}
                return buf
            }
            return blob
        },
        exportExcel () {
            // 自动获取表都 label 值
            const labels = this.$refs.table.columns.map((item) => item.label)
            // 自动获取表都 property 值
            const labelsProp = this.$refs.table.columns.map((item) => item.property)
            // 自动获取表格数据
            const tabelData = this.$refs.table.data.map((item) => {
                const arr = []
                for (let i = 0; i < labelsProp.length; i++) {
                    arr.push(item[labelsProp[i]])
                }
                return arr
            })
            // 拼装表格
            tabelData.unshift(labels)
            tabelData.unshift(['2级表头1', '2级表头2'])
            tabelData.unshift(['一级表头'])
            // json => sheet
            const sheet = this.sheet_from_array_of_arrays(tabelData)
            sheet.J2 = sheet.B2
            const mergeTitle = [
                {
                    s: {r: 0, c: 0},
                    e: {r: 0, c: labels.length - 1}
                },
                {
                    s: {r: 1, c: 0},
                    e: {r: 1, c: 8}
                },
                {
                    s: {r: 1, c: 9},
                    e: {r: 1, c: 17}
                }
            ]
            sheet['!merges'] = mergeTitle
            const wbBlob = this.sheet2blob(sheet, '1')
            // 保存下载
            FileSaver.saveAs(wbBlob, 'd.xlsx')
        }
    },
    mounted () {
        for (let i = 0; i < 10; i++) {
            this.tableData.push(this.tableData[0])
        }
    }
}
</script>
