# DatalyzePro 📊

**A powerful, responsive data visualization web application that transforms CSV and Excel files into interactive charts.**

DatalyzePro automates the chart generation process, enabling users to upload multi-column datasets and instantly create professional visualizations across multiple chart formats with intelligent data validation and real-time rendering.

---

## 🌟 Features

### Core Functionality
- **📁 Multi-Format File Support** - Upload and parse CSV and Excel (.xlsx, .xls) files
- **📊 5+ Chart Types** - Generate Bar, Line, Pie, Radar, and Doughnut charts
- **🔄 Multi-Column Analysis** - Compare multiple data series simultaneously
- **✅ Intelligent Data Validation** - Built-in error detection and user-friendly feedback
- **💾 Chart Export** - Download generated charts as PNG images
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop devices

### Advanced Features
- **Dynamic Column Selection** - Choose which data columns to visualize
- **Real-Time Chart Generation** - Instant chart updates with data changes
- **Interactive Editing** - Click on chart elements to remove data points
- **Sample Data Generator** - Download pre-built sample datasets for testing
- **Smart Color Coding** - Automatic color assignment for multiple data series
- **Data Quality Checks** - Validates data before visualization to prevent errors

---

## 🚀 Demo

### Live Demo
[View Live Demo](#) *(https://johnmartin0301.github.io/DatalyzePro/)*

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Styling with responsive design (Flexbox, Media Queries)
- **JavaScript (ES6+)** - Core application logic

### Libraries & APIs
- **[Chart.js](https://www.chartjs.org/) (v4.4.3)** - Chart rendering and visualization
- **[PapaParse](https://www.papaparse.com/) (v5.4.1)** - CSV file parsing
- **[SheetJS](https://sheetjs.com/) (v0.18.5)** - Excel file processing
- **File API** - File upload and reading
- **Canvas API** - Chart rendering and PNG export
- **Blob API** - File download generation

### Design
- **Google Fonts (Roboto)** - Typography
- **Mobile-First Design** - Responsive across all devices

---

## 📦 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/JohnMartin0301/datalyze-pro.git
   cd datalyze-pro
   ```

2. **Open the application**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # Or on Windows
   start index.html
   # Or on Linux
   xdg-open index.html
   ```

3. **Start visualizing!**
   - Upload a CSV/Excel file, or
   - Download the sample data, or
   - Manually enter data points

### File Structure
```
datalyze-pro/
├── index.html          # Main HTML file
├── README.md           # Project documentation
├── screenshots/        # Application screenshots
│   ├── main-interface.png
│   ├── column-selection.png
│   └── chart-example.png
└── sample-data/        # Sample CSV files
    ├── business-finance.csv
    ├── marketing-analytics.csv
    └── health-fitness.csv
```

---

## 💻 Usage

### Uploading Data

#### Method 1: File Upload
1. Click **"Upload CSV/Excel"** button
2. Select your CSV or Excel file
3. If your file has multiple columns, select which ones to visualize
4. Click **"Apply Selection"**
5. Your chart will be generated automatically!

#### Method 2: Manual Entry
1. Enter a label in the **"Label"** field
2. Enter a numeric value in the **"Data"** field
3. Click **"Add Data"**
4. Repeat to add more data points

#### Method 3: Sample Data
1. Click **"Download Sample"** to get a pre-built dataset
2. Upload the downloaded file to test the application

### Changing Chart Types
1. Select your desired chart type from the dropdown menu
2. Click **"Change Chart"**
3. Your data will be visualized in the new format

### Downloading Charts
1. Generate your chart
2. Click **"Download Chart"**
3. The chart will be saved as a PNG image

### Removing Data Points
- Click directly on any data point in the chart to remove it
- The chart will update automatically

---

## 📊 Supported File Formats

### CSV Files
```csv
Label,Value1,Value2,Value3
January,4500,3200,1300
February,5200,3400,1800
March,4800,3100,1700
```

### Excel Files (.xlsx, .xls)
- Same structure as CSV
- First row: Headers
- First column: Labels
- Subsequent columns: Data values

### Requirements
- **Minimum:** 2 columns (1 label column + 1 data column)
- **Maximum:** Unlimited columns (up to 10 recommended for readability)
- **Headers:** First row must contain column headers
- **Data Types:** First column (text/labels), other columns (numbers)

---

## 🎨 Chart Types

### 1. Bar Chart
- Best for: Comparing categories
- Example: Monthly sales by product

### 2. Line Chart
- Best for: Trends over time
- Example: Temperature changes, stock prices

### 3. Pie Chart
- Best for: Proportions and percentages
- Example: Market share, budget allocation

### 4. Radar Chart
- Best for: Multi-dimensional comparisons
- Example: Skill assessments, product features

### 5. Doughnut Chart
- Best for: Proportions with central space for labels
- Example: Expense categories, demographic data

---

## 🔧 Configuration

### Customizing Colors
Edit the `colorPalettes` array in the JavaScript section:
```javascript
const colorPalettes = [
    { bg: 'rgba(53, 114, 165, 0.8)', border: 'rgba(53, 114, 165, 1)' },
    { bg: 'rgba(241, 224, 90, 0.8)', border: 'rgba(241, 224, 90, 1)' },
    // Add more colors here
];
```

### Adjusting Chart Height
Modify the `.chart-container` height in CSS:
```css
.chart-container {
    height: 400px; /* Change this value */
}
```

### Responsive Breakpoints
Adjust media query breakpoints in CSS:
```css
@media (max-width: 768px) { /* Tablet */ }
@media (max-width: 480px) { /* Mobile */ }
```

---

## 🐛 Troubleshooting

### Issue: "No data entered" message when downloading
**Solution:** Ensure you've added data either by uploading a file or manually entering values.

### Issue: File upload not working
**Solution:** Check that your file is in CSV or Excel format (.csv, .xlsx, .xls) and contains valid data.

### Issue: Chart not displaying
**Solution:** 
- Verify your data has at least 2 columns
- Check browser console for errors
- Ensure JavaScript is enabled

### Issue: Multi-column selector not appearing
**Solution:** Your file needs 3+ columns. Files with only 2 columns automatically generate charts.

### Issue: Colors not displaying correctly
**Solution:** Make sure your browser supports rgba colors and Canvas API.

---

## 🚀 Future Enhancements

- [ ] Add more chart types (Scatter, Bubble, Area)
- [ ] Export data to CSV/Excel format
- [ ] Save chart configurations
- [ ] Custom color picker
- [ ] Chart annotations and labels
- [ ] API integration for live data
- [ ] Dark mode theme
- [ ] Chart templates library
- [ ] Collaborative features
- [ ] Advanced filtering options

---

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 John Martin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**John Martin**
- GitHub: [@JohnMartin0301](https://github.com/JohnMartin0301)

---

## 🙏 Acknowledgments

- **[Chart.js](https://www.chartjs.org/)** - Amazing charting library
- **[PapaParse](https://www.papaparse.com/)** - Powerful CSV parser
- **[SheetJS](https://sheetjs.com/)** - Excel file processing
- **Google Fonts** - Roboto typeface

---

## 📞 Support

If you have any questions or need help:

- **Issues:** [Open an issue](https://github.com/JohnMartin0301/datalyze-pro/issues)
- **Discussions:** [Join discussions](https://github.com/JohnMartin0301/datalyze-pro/discussions)

---

## ⭐ Show Your Support

If you found this project helpful, please consider:
- Giving it a ⭐ on GitHub
- Sharing it with others
- Reporting bugs or suggesting features

---

<div align="center">

**Made with ⚛ and JavaScript**

[Report Bug](https://github.com/JohnMartin0301/datalyze-pro/issues) • [Request Feature](https://github.com/JohnMartin0301/datalyze-pro/issues) • [View Demo](https://johnmartin0301.github.io/DatalyzePro/)

</div>

---

© 2025 John Martin. All Rights Reserved.
