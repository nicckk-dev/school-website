import React, { useCallback } from "react";
import { unparse } from 'papaparse';

export const CSVLinkComp = ({ data, data2, headers, filename, excelFilter,gridData,gridHeader }) => {

    const handleExport = useCallback(() => {
        let filterCsv = unparse({ data: excelFilter });
        let csvData = unparse({ data: data2, fields: headers });
        let csvData2 = unparse({ data: gridData, fields: gridHeader });

        let multiBlobContent = (gridData?.length > 0 && gridHeader?.length > 0) ? `${filterCsv}\n\n${csvData}\n\n\n\n${csvData2}` : `${filterCsv}\n\n${csvData}`;
        
        const csvLink = document.createElement('a');
        const blob = new Blob([multiBlobContent], { type: 'text/csv;charset=utf-8;' });
        
        csvLink.href = URL.createObjectURL(blob);
        csvLink.setAttribute('download', `${filename}.csv`);
        csvLink.style.display = 'none';
        document.body.appendChild(csvLink);
        csvLink.click();
        document.body.removeChild(csvLink);

    }, [data, data2, headers, excelFilter]);

    return(
        <li>
            <div className="dropdown-item" onClick={handleExport}>CSV</div>
        </li>
    )
}