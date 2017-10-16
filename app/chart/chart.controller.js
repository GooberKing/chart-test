// Controller for the chart that stores model data, chart options, and settings
chartModule.controller('ChartController', ['$filter', 'SalesService', function ChartController($filter, SalesService) {
    var tempData = [];

    // Data model
    this.model = {
        chartType: 'discreteBarChart',
        cohort: '',
        statistic: '',
        orderBy: 'A to Z',
        data: []
    };

    // NVD3 Chart options
    this.options = {
        chart: {
            type: this.model.chartType,
            height: 600,
            margin : {
                top: 14,
                right: 28,
                bottom: 70,
                left: 70
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',')(d);
            },
            transitionDuration: 500,
            xAxis: {},
            yAxis: {
                tickFormat: function (d){
                    return d3.format(',')(d);
                }                
            },
            labelSunbeamLayout: true
        }
    }

    // Settings drop-down lists
    this.settings = [
        {
            name: 'Chart Type',
            prop: 'chartType',
            onChange: 'updateChart',
            values:[
                {name: 'Bar', value:'discreteBarChart'},
                {name: 'Line', value:'stackedAreaChart'},
                {name: 'Pie', value:'pieChart'}
            ]
        },
        {
            name: 'Cohort',
            prop: 'cohort',
            onChange: 'updateData',
            values:[
                {name: 'All Records', value:''},
                {name: 'Product', value:'product'},
                {name: 'Category', value:'category'},
                {name: 'Channel', value:'channel'}
            ]
        },
        {
            name: 'Statistic',
            prop: 'statistic',
            onChange: 'updateData',
            values: [
                {name: 'Count', value:''},
                {name: 'Sum', value:'sum'}
            ]
        },
        {
            name: 'Order By',
            prop: 'orderBy',
            onChange: 'sortData',
            values: [
                {name: 'Ascending', value:'A to Z'},
                {name: 'Descending', value:'Z to A'},
                {name: 'Smallest to Largest', value:'min to max'},
                {name: 'Largest to Smallest', value:'max to min'}
            ]
        }
    ];

    // Function for updating the chart settings
    this.updateChart = function() {
        this.formatData();
        
        this.options.chart.type = this.model.chartType;

        var cohorts = $filter('filter')(this.settings, {prop: 'cohort'})[0].values;
        this.options.chart.xAxis.axisLabel = $filter('filter')(cohorts, {value: this.model.cohort})[0].name;

        var statistics = $filter('filter')(this.settings, {prop: 'statistic'})[0].values;
        this.options.chart.yAxis.axisLabel = $filter('filter')(statistics, {value: this.model.statistic})[0].name;
    };

    // Function for updating the data set from the remove server
    this.updateData = function() {
        var self = this;
        SalesService.getData(this.model.statistic, this.model.cohort, function(data) {
            tempData = data;
            self.sortData();
            self.updateChart();
        });
    };

    // Function for sorting the data
    this.sortData = function() {
        var orderBy = this.model.orderBy;
        tempData.sort(function(a,b) {
            switch (orderBy) {
                case 'A to Z':
                    return a.label.localeCompare(b.label);
                case 'Z to A':
                    return b.label.localeCompare(a.label);
                case 'min to max':
                    return a.value - b.value;
                case 'max to min':
                    return b.value - a.value;
            }
        });

        this.formatData();
    };

    // Function for formatting the data based on the current chart type
    this.formatData = function() {
        switch(this.model.chartType) {
            // Bar chart needs an array of objects with a key and values array
            case 'discreteBarChart':
                this.model.data = [{key: this.model.cohort, values: tempData}];
                break;
            // Line chart needs a key and an array of x/y values
            case 'stackedAreaChart':
                var modelData = [];
                tempData.forEach(function(data) {
                    modelData.push({key: data.label, values: [{label: 0, value: 0},{label: 1, value: data.value}]});
                });
                this.model.data = modelData;
                break;
            // Otherwise, just use the raw array of label/value pairs
            default:
                this.model.data = tempData;
        }
    };

    // Initialize the data set based on default settings
    this.updateData();
}]);