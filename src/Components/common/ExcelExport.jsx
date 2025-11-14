import React, { useEffect, useState } from "react";
import { ReportsCss } from "./GlobalStyle";
import * as XLSX from 'sheetjs-style';
import * as FileSaver from 'file-saver';
import { CSVLinkComp } from "./CSVLinkComp";
import { DownloadOutlined } from "@ant-design/icons";
import PropTypes from 'prop-types';


export const ExcelExport = ({ data, data2, columns, showIcon, filename, excelFilter, gridData }) => {
    const [csvHeader, setCSVHeader] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [gridHeader, setGridHeader] = useState([]);
    const [subHeader, setSubHeader] = useState([]);
    const [filterArr, setFilterArr] = useState([]);
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


    useEffect(() => {
        let csvHeaders = columns.sort((a, b) => a.coL_SEQ - b.coL_SEQ)
            .map(col => {
                return col.coL_NAME
            })

        let csvSubheader = columns.sort((a, b) => a.coL_SEQ - b.coL_SEQ).map(col => col.subcoL_NAME);
        setSubHeader(csvSubheader);

        let filterData = data2.map(({ key, ...rest }) => rest);
        let Gridheaders = gridData?.columns?.map(col => col?.coL_NAME);

        columns.forEach((col) => {
            if (col.display === '0') {
                filterData = filterData.map(obj => {
                    return Object.fromEntries(
                        Object.entries(obj).filter(([key]) => {
                            return key !== col.coL_NAME
                        })
                    )
                });
                csvHeaders = csvHeaders.filter(header => col.coL_NAME !== header);
            }
        })
        setFilterArr(Object.entries(excelFilter).flatMap(([key, value]) => [`${key}:`, value]));
        setCSVHeader(csvHeaders);
        setFilterData(filterData);
        setGridHeader(Gridheaders);
    }, [columns, gridData, data, excelFilter]);

    const download = (format) => {
        let bookType;
    if (format === 'csv') {
        bookType = 'csv';
    } else if (format === 'xls') {
        bookType = 'xls';
    } else {
        bookType = 'xlsx';
    }

        try {
            const customWorkSheet = XLSX.utils.aoa_to_sheet([[]]);
            XLSX.utils.sheet_add_aoa(customWorkSheet, [filterArr], { origin: 'A1' });
            
            let headerRows = [csvHeader];
            if (subHeader?.some(value => value !== null)) {
                headerRows.push(subHeader);
            }

            let indexRow = 4;

            headerRows.forEach((row, index) => {
                XLSX.utils.sheet_add_aoa(customWorkSheet, [row], { origin: `A${indexRow}` });

                const range = XLSX.utils.decode_range(customWorkSheet['!ref']);

                for (let columnIndex = range.s.c; columnIndex <= range.e.c; columnIndex++) {
                    const cellAddress = XLSX.utils.encode_cell({ r: indexRow - 1, c: columnIndex });
                    if (!customWorkSheet[cellAddress]) {
                        customWorkSheet[cellAddress] = {};
                    }
                    if (!customWorkSheet[cellAddress].s) {
                        customWorkSheet[cellAddress].s = {};
                    }
                    customWorkSheet[cellAddress].s.font = { bold: true };
                }
                indexRow++;
            })
            XLSX.utils.sheet_add_json(customWorkSheet, filterData, { origin: `A${indexRow}`, skipHeader: true });

            const customWorkSheet2 = XLSX.utils.aoa_to_sheet([gridHeader]);
            XLSX.utils.sheet_add_json(customWorkSheet2, gridData.data, { origin: 'A2', skipHeader: true });

            setTimeout(() => {
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, customWorkSheet, 'Data1');
                if (gridData.columns.length > 0 && gridData.data.length > 0) {
                    XLSX.utils.book_append_sheet(wb, customWorkSheet2, 'Data2')
                }
                const excelBuffer = XLSX.write(wb, { bookType, type: 'array' });
                const Blobdata = new Blob([excelBuffer], { type: fileType });
                FileSaver.saveAs(Blobdata, `${filename}.${bookType}`);
            }, 100)
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`dropdown ${showIcon ? 'd-block' : 'd-none'}`}>
            <DownloadOutlined className={`${ReportsCss.IconStyle}`} data-bs-toggle="dropdown" />
            <ul className="dropdown-menu">
                <li className={`${data.length > 65536 ? 'd-none' : 'd-block'}`}><span className="dropdown-item"
                    onClick={() => download('xls')} // If Length of Data exceeds 65536, XLS option will be hidden to user
                >Excel(.xls)</span></li>
                <li className={`${data.length > 155000 ? 'd-none' : 'd-block'}`}><span className="dropdown-item"
                    onClick={() => download('xlsx')} // If Length of Data exceeds 65536, XLSX option will be hidden to user
                >Excel(.xlsx)</span></li>
                {
                    gridData.data.length > 0 ?
                        null :
                        (
                            data.length < 155000 ?
                                // If Length of Data exceeds 155000, data will be Exported in CSVLinkComp Component using papaparse, else it will continue in download()
                                (<li><span className="dropdown-item" onClick={() => download('csv')}>CSV</span></li>)
                                :
                                (<CSVLinkComp data={data} data2={data2} headers={csvHeader} subHeader={subHeader} filename={filename} excelFilter={filterArr} gridHeader={gridHeader} gridData={gridData.data} />)
                        )
                }
                {/* <CSVLinkComp data={data} data2={data2} headers={csvHeader} subHeader={subHeader} filename={filename} excelFilter={filterArr} gridHeader={gridHeader} gridData={gridData.data} /> */}
            </ul>
        </div>
    )
}

ExcelExport.propTypes = {
    data: PropTypes.array,
    data2: PropTypes.array,
    columns: PropTypes.array,
    showIcon: PropTypes.any,
    filename: PropTypes.string,
    excelFilter: PropTypes.object,
    gridData: PropTypes.object
}