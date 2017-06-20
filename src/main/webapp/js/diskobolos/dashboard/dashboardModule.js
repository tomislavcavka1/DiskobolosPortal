/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the membership category data.
 * 
 * @author Tihomir Cavka
 */
var dashboardModule = angular.module('dashboardModule', []);

dashboardModule.controller('dashboardController', function (
        $scope) {

    $scope.chart = {};
    /**
     * dashboardFlotTwo - simple controller for data
     * for Flot chart in Dashboard view
     */

    $scope.chart.sportData = {
        labels: ["Sport", "Sport", "Sport", "Sport", "Sport", "Sport", "Sport", "Sport", "Sport", "Sport"
                    , "Sport", "Sport", "Sport", "Sport", "Sport", "Sport", "Sport", "Sport", "Sport", "Sport"],
        datasets: [
            {
                fillColor: "rgba(26,179,148,0.4)",
                pointColor: "rgba(151,187,205,0)",
                pointStrokeColor: "#e67e22",
                data: [0, 15, 25, 35, 50, 35, 20, 10, 5, 13, 17, 20, 17, 35, 15, 23, 35, 32, 43, 32]
            }
        ]
    };

    $scope.chart.clubData = {
        labels: ["Klub1", "Klub2", "Klub3", "Klub4", "Klub5", "Klub6", "Klub7", "Klub8", "Klub9",
            "Klub10", "Klub11", "Klub12", "Klub13", "Klub14", "Klub15", "Klub16", "Klub17", "Klub18", "Klub19", "Klub20"],
        datasets: [
            {
                fillColor: "rgba(26,179,148,0.4)",
                pointColor: "rgba(151,187,205,0)",
                pointStrokeColor: "#e67e22",
                data: [0, 15, 25, 35, 50, 35, 20, 10, 5, 13, 17, 20, 17, 35, 15, 23, 35, 32, 43, 32]
            }
        ]
    };

    //Globals
    $scope.chart.myChartOptions = {
        // Boolean - Whether to animate the chart
        animation: true,
        // Number - Number of animation steps
        animationSteps: 60,
        // String - Animation easing effect
        animationEasing: "easeOutQuart",
        // Boolean - If we should show the scale at all
        showScale: true,
        // Boolean - If we want to override with a hard coded scale
        scaleOverride: false,
        // ** Required if scaleOverride is true **
        // Number - The number of steps in a hard coded scale
        scaleSteps: null,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: null,
        // Number - The scale starting value
        scaleStartValue: null,
        // String - Colour of the scale line
        scaleLineColor: "rgba(255,255,255,.1)",
        // Number - Pixel width of the scale line
        scaleLineWidth: 0,
        // Boolean - Whether to show labels on the scale
        scaleShowLabels: true,
        // Interpolated JS string - can access value
        scaleLabel: "<%=value%>",
        // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
        scaleIntegersOnly: true,
        // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: false,
        // String - Scale label font declaration for the scale label
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        // Number - Scale label font size in pixels
        scaleFontSize: 12,
        // String - Scale label font weight style
        scaleFontStyle: "normal",
        // String - Scale label font colour
        scaleFontColor: "#666",
        // Boolean - whether or not the chart should be responsive and resize when the browser does.
        responsive: false,
        // Boolean - Determines whether to draw tooltips on the canvas or not
        showTooltips: true,
        // Array - Array of string names to attach tooltip events
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],
        // String - Tooltip background colour
        tooltipFillColor: "rgba(0,0,0,0.8)",
        // String - Tooltip label font declaration for the scale label
        tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        // Number - Tooltip label font size in pixels
        tooltipFontSize: 14,
        // String - Tooltip font weight style
        tooltipFontStyle: "normal",
        // String - Tooltip label font colour
        tooltipFontColor: "#fff",
        // String - Tooltip title font declaration for the scale label
        tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        // Number - Tooltip title font size in pixels
        tooltipTitleFontSize: 14,
        // String - Tooltip title font weight style
        tooltipTitleFontStyle: "bold",
        // String - Tooltip title font colour
        tooltipTitleFontColor: "#fff",
        // Number - pixel width of padding around tooltip text
        tooltipYPadding: 6,
        // Number - pixel width of padding around tooltip text
        tooltipXPadding: 6,
        // Number - Size of the caret on the tooltip
        tooltipCaretSize: 8,
        // Number - Pixel radius of the tooltip border
        tooltipCornerRadius: 6,
        // Number - Pixel offset from point x to tooltip edge
        tooltipXOffset: 10,
        // String - Template string for single tooltips
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
        // String - Template string for single tooltips
        multiTooltipTemplate: "<%= value %>",
        // Function - Will fire on animation progression.
        onAnimationProgress: function () {},
        // Function - Will fire on animation completion.
        onAnimationComplete: function () {}
    };
   
    /**
     * chartJsCtrl - Controller for data for ChartJs plugin
     * used in Chart.js view
     */

    /**
     * Data for Doughnut chart
     */
    $scope.chart.doughnutData = [
        {
            value: 300,
            color: "#a3e1d4",
            highlight: "#1ab394",
            label: "Zadovoljili uvjete"
        },
        {
            value: 50,
            color: "#dedede",
            highlight: "#1ab394",
            label: "Upitnik nije ispunjen"
        },
        {
            value: 100,
            color: "#fb8692",
            highlight: "#1ab394",
            label: "Nisu zadovoljili uvjete"
        }
    ];

    /**
     * Options for Doughnut chart
     */
    $scope.chart.doughnutOptions = {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 45, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false
    };



});

