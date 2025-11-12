let chartData = {
    labels: [],
    datasets: [{
        label: '# of Values',
        data: [],
        backgroundColor: [
            'rgba(53, 114, 165, 0.8)',
            'rgba(241, 224, 90, 0.8)',
            'rgba(176, 114, 25, 0.8)',
            'rgba(23, 134, 0, 0.8)',
            'rgba(227, 76, 38, 0.8)',
            'rgba(79, 93, 149, 0.8)'
        ],
        borderColor: [
            'rgba(53, 114, 165, 1)',
            'rgba(241, 224, 90, 1)',
            'rgba(176, 114, 25, 1)',
            'rgba(23, 134, 0, 1)',
            'rgba(227, 76, 38, 1)',
            'rgba(79, 93, 149, 1)'
        ],                       
        borderWidth: 1
    }]
};

let uploadedData = null;
let selectedColumns = [];

const colorPalettes = [
    { bg: 'rgba(53, 114, 165, 0.8)', border: 'rgba(53, 114, 165, 1)' },
    { bg: 'rgba(241, 224, 90, 0.8)', border: 'rgba(241, 224, 90, 1)' },
    { bg: 'rgba(176, 114, 25, 0.8)', border: 'rgba(176, 114, 25, 1)' },
    { bg: 'rgba(23, 134, 0, 0.8)', border: 'rgba(23, 134, 0, 1)' },
    { bg: 'rgba(227, 76, 38, 0.8)', border: 'rgba(227, 76, 38, 1)' },
    { bg: 'rgba(79, 93, 149, 0.8)', border: 'rgba(79, 93, 149, 1)' },
    { bg: 'rgba(233, 30, 99, 0.8)', border: 'rgba(233, 30, 99, 1)' },
    { bg: 'rgba(156, 39, 176, 0.8)', border: 'rgba(156, 39, 176, 1)' },
    { bg: 'rgba(63, 81, 181, 0.8)', border: 'rgba(63, 81, 181, 1)' },
    { bg: 'rgba(0, 188, 212, 0.8)', border: 'rgba(0, 188, 212, 1)' }
];

function createChart(type) {
    const ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, {
        type: type,
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: (event, activeElements) => {
                if (activeElements.length > 0) {
                    const { datasetIndex, index } = activeElements[0];
                    removeData(datasetIndex, index);
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: window.innerWidth < 480 ? 10 : 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            hover: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

let myChart = createChart('bar');

function addData() {
    const labelInput = document.getElementById('label-input');
    const dataInput = document.getElementById('data-input');
    if (labelInput.value && dataInput.value) {
        chartData.labels.push(labelInput.value);
        chartData.datasets.forEach((dataset) => {
            dataset.data.push(dataInput.value);
        });
        myChart.update();
        labelInput.value = '';
        dataInput.value = '';
    }
}

function updateChartType() {
    const selectedType = document.getElementById('chart-type').value;
    myChart.destroy(); 
    myChart = createChart(selectedType);
}

function removeData(datasetIndex, index) {
    if (chartData.labels.length > index) {
        chartData.labels.splice(index, 1);
        chartData.datasets[datasetIndex].data.splice(index, 1);
        myChart.update();
    }
}

window.addEventListener('resize', () => {
    if (myChart) {
        myChart.options.plugins.legend.labels.font.size = window.innerWidth < 480 ? 10 : 12;
        myChart.update();
    }
});

function showStatus(message, isError = false) {
    const existingStatus = document.querySelector('.status-message');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    const statusDiv = document.createElement('div');
    statusDiv.className = `status-message ${isError ? 'status-error' : 'status-success'}`;
    statusDiv.textContent = message;
    document.querySelector('.controls').appendChild(statusDiv);
    
    setTimeout(() => {
        statusDiv.remove();
    }, 3000);
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (fileExtension === 'csv') {
        parseCSV(file);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        parseExcel(file);
    } else {
        showStatus('Please upload a CSV or Excel file', true);
    }
    
    event.target.value = '';
}

function parseCSV(file) {
    Papa.parse(file, {
        complete: function(results) {
            processFileData(results.data);
        },
        header: false,
        skipEmptyLines: true,
        error: function(error) {
            showStatus('Error parsing CSV: ' + error.message, true);
        }
    });
}

function parseExcel(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            processFileData(jsonData);
        } catch (error) {
            showStatus('Error parsing Excel: ' + error.message, true);
        }
    };
    reader.onerror = function() {
        showStatus('Error reading file', true);
    };
    reader.readAsArrayBuffer(file);
}

function processFileData(data) {
    if (!data || data.length < 2) {
        showStatus('File must contain at least headers and one row of data', true);
        return;
    }
    
    data = data.filter(row => row && row.some(cell => cell !== null && cell !== undefined && cell !== ''));
    
    if (data.length < 2) {
        showStatus('No valid data found in file', true);
        return;
    }
    
    uploadedData = data;
    const headers = data[0];
    
    if (headers.length <= 2) {
        // Simple 2-column data
        renderSimpleChart(data);
    } else {
        // Multiple columns - show selector
        showColumnSelector(headers);
    }
}

function showColumnSelector(headers) {
    const selector = document.getElementById('column-selector');
    const options = document.getElementById('column-options');
    options.innerHTML = '';
    
    headers.forEach((header, index) => {
        if (index === 0) return; // Skip first column (labels)
        
        const option = document.createElement('div');
        option.className = 'column-option';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `col-${index}`;
        checkbox.value = index;
        checkbox.checked = index === 1; // Check first data column by default
        
        const label = document.createElement('label');
        label.htmlFor = `col-${index}`;
        label.textContent = header || `Column ${index + 1}`;
        
        option.appendChild(checkbox);
        option.appendChild(label);
        options.appendChild(option);
    });
    
    selector.classList.add('active');
    showStatus('Multiple columns detected! Select which columns to display.', false);
}

function applyColumnSelection() {
    const checkboxes = document.querySelectorAll('#column-options input[type="checkbox"]:checked');
    selectedColumns = Array.from(checkboxes).map(cb => parseInt(cb.value));
    
    if (selectedColumns.length === 0) {
        showStatus('Please select at least one column', true);
        return;
    }
    
    renderMultiColumnChart(uploadedData, selectedColumns);
    document.getElementById('column-selector').classList.remove('active');
}

function renderSimpleChart(data) {
    const labels = [];
    const values = [];
    
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row[0] && row[1] !== undefined && row[1] !== null && row[1] !== '') {
            labels.push(String(row[0]).trim());
            const value = parseFloat(row[1]);
            if (!isNaN(value)) {
                values.push(value);
            }
        }
    }
    
    if (labels.length === 0 || values.length === 0) {
        showStatus('No valid label-value pairs found', true);
        return;
    }
    
    chartData.labels = labels;
    chartData.datasets = [{
        label: data[0][1] || '# of Values',
        data: values,
        backgroundColor: colorPalettes.map(c => c.bg),
        borderColor: colorPalettes.map(c => c.border),
        borderWidth: 1
    }];
    
    myChart.destroy();
    myChart = createChart(document.getElementById('chart-type').value);
    showStatus(`Successfully loaded ${labels.length} data points!`, false);
}

function renderMultiColumnChart(data, columns) {
    const labels = [];
    const datasets = [];
    
    // Get labels from first column
    for (let i = 1; i < data.length; i++) {
        if (data[i][0]) {
            labels.push(String(data[i][0]).trim());
        }
    }
    
    // Create dataset for each selected column
    columns.forEach((colIndex, datasetIndex) => {
        const values = [];
        const header = data[0][colIndex] || `Column ${colIndex + 1}`;
        
        for (let i = 1; i < data.length; i++) {
            const value = parseFloat(data[i][colIndex]);
            values.push(isNaN(value) ? 0 : value);
        }
        
        const color = colorPalettes[datasetIndex % colorPalettes.length];
        datasets.push({
            label: header,
            data: values,
            backgroundColor: color.bg,
            borderColor: color.border,
            borderWidth: 1
        });
    });
    
    chartData.labels = labels;
    chartData.datasets = datasets;
    
    myChart.destroy();
    myChart = createChart(document.getElementById('chart-type').value);
    showStatus(`Successfully loaded ${columns.length} data series with ${labels.length} points each!`, false);
}

function downloadChart() {
    // Check if chart exists
    if (!myChart) {
        showStatus('No chart available to download', true);
        return;
    }
    
    // Check if there's any data in the chart
    if (!chartData.labels || chartData.labels.length === 0) {
        showStatus('No data entered. Please add data or upload a file first.', true);
        return;
    }
    
    // Check if datasets have data
    let hasData = false;
    for (let dataset of chartData.datasets) {
        if (dataset.data && dataset.data.length > 0) {
            hasData = true;
            break;
        }
    }
    
    if (!hasData) {
        showStatus('No data entered. Please add data or upload a file first.', true);
        return;
    }
    
    // All checks passed, download the chart
    try {
        const link = document.createElement('a');
        link.href = myChart.toBase64Image();
        link.download = `chart_${Date.now()}.png`;
        link.click();
        
        showStatus('Chart downloaded successfully!', false);
    } catch (error) {
        showStatus('Error downloading chart. Please try again.', true);
    }
}