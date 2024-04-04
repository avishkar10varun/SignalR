var salesData;
var truncLengh = 30;
var title_clicked = '';
var perc_clicked = 0.0;
// $(document).ready(function () {
// Plot();
// });
function Plot(chartDataOEE) {
TransformChartData(chartDataOEE, chartOptionsOEE);
BuildBar("chart", chartDataOEE, chartOptionsOEE);
}
function BuildBar(id, chartDataOEE, options, level) {   


    //d3.selectAll("#" + id + " .innerContOEE").remove();
    //$("#" + id).append(chartInnerDiv);
    chart = d3.select("#" + id + " .innerCont");
    chart.selectAll("svg").remove();
    var margin = { top: 30, right: 10, bottom: 75, left: 50 },
        width = $(chart[0]).outerWidth() - margin.left - margin.right,
        height = $(chart[0]).outerHeight() - margin.top - margin.bottom 
    var xVarName;
    var yVarName = options[0].yaxis;

    if (level == 6) {
        xVarName = options[0].xaxisl6;
    }
    else

        if (level == 5) {
            xVarName = options[0].xaxisl5;
        }
        else
            if (level == 4) {
                xVarName = options[0].xaxisl4;
            }
            else
                if (level == 3) {
                    xVarName = options[0].xaxisl3;
                }
                else
                    if (level == 2) {
                        xVarName = options[0].xaxisl2;
                    }
                    else
                        if (level == 1) {
                            xVarName = options[0].xaxisl1;
                        }
                        else {
                            xVarName = options[0].xaxis;
                        }

 
    sortJSON(runningData,'Perc','321'); 
    var xAry = runningData.map(function (el) {
        return el[xVarName];
    });

    var yAry = runningData.map(function (el) {
        return el[yVarName];
    });


    // Code to skip blank reasons etc
    if (xAry.length == 1 && yAry.length == 1) {
        if (title_clicked == xAry[0] && yAry[0] == perc_clicked) {
            if (level <= 6) {
                level = level + 1;
                TransformChartData(chartDataOEE, options, level, title_clicked);
                BuildBar(id, chartDataOEE, options, level);

                if(level ==7)
                {
                    jQuery("#level0").text('');
                jQuery("#messageSpan1").text('');
                jQuery("#messageSpan2").text('');
                jQuery("#messageSpan3").text('');
                jQuery("#messageSpan4").text('');
                jQuery("#messageSpan5").text('');
                jQuery("#messageSpan6").text('');
                }
                return;
            }
        }
    }

    var capAry = runningData.map(function (el) { return el.caption; });


    var x = d3.scale.ordinal().domain(xAry).rangeRoundBands([0, width], .5);
    var y = d3.scale.linear().domain([0, d3.max(runningData, function (d) { return d[yVarName]; })]).range([height, 0]);
    var rcolor = d3.scale.ordinal().range(runningColors);

    chart = chart
        .append("svg")  //append svg element inside #chart
        .attr("width", width + margin.left + margin.right)    //set width
        .attr("height", height + margin.top + margin.bottom);  //set height

    var bar = chart.selectAll("g")
        .data(runningData)
        .enter()
        .append("g")
        //.attr("filter", "url(#dropshadow)")
        .attr("transform", function (d) {
            return "translate(" + x(d[xVarName]) + ", 0)";
        });

    var ctrtxt = 0;
    var xAxis = d3.svg.axis()
        .scale(x)
        //.orient("bottom").ticks(xAry.length).tickValues(capAry);  //orient bottom because x-axis tick labels will appear on the
        .orient("bottom").ticks(xAry.length)
        .tickFormat(function (d) {
            if (level == 0) {
                var mapper = options[0].captions[0]
                return mapper[d]
            }
            else {
                var r = runningData[ctrtxt].caption;
                ctrtxt += 1;
                return r;
            }
        });

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left").ticks(5); //orient left because y-axis tick labels will appear on the left side of the axis.

    bar.append("rect")
        .attr("y", function (d) {
            return y(d.Perc) + margin.top - 15;
        })
        .attr("x", function (d) {
            return (margin.left);
        })
        .on("mouseenter", function (d) {
            d3.select(this)
                .attr("stroke", "white")
                .attr("stroke-width", 1)
                .attr("height", function (d) {
                    return height - y(d[yVarName]) + 5;
                })
                .attr("y", function (d) {
                    return y(d.Perc) + margin.top - 20;
                })
                .attr("width", x.rangeBand() + 10)
                .attr("x", function (d) {
                    return (margin.left - 5);
                })
                .transition()
                .duration(200);


        })
        .on("mouseleave", function (d) {
            d3.select(this)
                .attr("stroke", "none")
                .attr("height", function (d) {
                    return height - y(d[yVarName]);;
                })
                .attr("y", function (d) {
                    return y(d[yVarName]) + margin.top - 15;
                })
                .attr("width", x.rangeBand())
                .attr("x", function (d) {
                    return (margin.left);
                })
                .transition()
                .duration(200);

        })
        .on("click", function (d) {
            if (this._listenToEvents) {
                // Reset inmediatelly
                d3.select(this).attr("transform", "translate(0,0)")
                // Change level on click if no transition has started                
                path.each(function () {
                    this._listenToEvents = false;
                });
            }


            // set the var of clicked 
            title_clicked = d.title;
            perc_clicked = d.Perc;


            d3.selectAll("#" + id + " svg").remove();

            
            if (level == 6) {

                jQuery("#level0").text('');
                jQuery("#messageSpan1").text('');
                jQuery("#messageSpan2").text('');
                jQuery("#messageSpan3").text('');
                jQuery("#messageSpan4").text('');
                jQuery("#messageSpan5").text('');
                jQuery("#messageSpan6").text('');

                TransformChartData(chartDataOEE, chartOptionsOEE); // Go back
                BuildBar("chart", chartDataOEE, chartOptionsOEE);
            } else

                if (level == 5) {
                    jQuery("#messageSpan5").text(' / ' + d.caption);

                    $('#messageSpan5').click(function (e) {

                        d3.selectAll("#" + id + " svg").remove();

                        jQuery("#messageSpan6").text('');
                        TransformChartData(chartDataOEE, options, 6, d[xVarName]);
                        BuildBar(id, chartDataOEE, options, 6);

                    });

                    jQuery("#messageSpan6").text('');
                    TransformChartData(chartDataOEE, options, 6, d[xVarName]);
                    BuildBar(id, chartDataOEE, options, 6);
                } else

                    if (level == 4) {
                        jQuery("#messageSpan4").text(' / ' + d.caption);

                        $('#messageSpan4').click(function (e) {

                            d3.selectAll("#" + id + " svg").remove();

                            jQuery("#messageSpan5").text('');
                            jQuery("#messageSpan6").text('');
                            TransformChartData(chartDataOEE, options, 5, d[xVarName]);
                            BuildBar(id, chartDataOEE, options, 5);

                        });

                        jQuery("#messageSpan5").text('');
                        jQuery("#messageSpan6").text('');
                        TransformChartData(chartDataOEE, options, 5, d[xVarName]);
                        BuildBar(id, chartDataOEE, options, 5);
                    } else
                        if (level == 3) {
                            alert('Hello 3' );
                            jQuery("#messageSpan3").text(' / ' + d.caption);

                            $('#messageSpan3').click(function (e) {

                                d3.selectAll("#" + id + " svg").remove();

                                jQuery("#messageSpan4").text('');
                                jQuery("#messageSpan5").text('');
                                jQuery("#messageSpan6").text('');
                                TransformChartData(chartDataOEE, options, 4, d[xVarName]);
                                BuildBar(id, chartDataOEE, options, 4);

                            });


                            jQuery("#messageSpan4").text('');
                            jQuery("#messageSpan5").text('');
                            jQuery("#messageSpan6").text('');
                            TransformChartData(chartDataOEE, options, 4, d[xVarName]);
                            BuildBar(id, chartDataOEE, options, 4);
                        } else

                            if (level == 2) {
                                
                                jQuery("#messageSpan2").text(' / ' + d.caption);

                                $('#messageSpan2').click(function (e) {

                                    d3.selectAll("#" + id + " svg").remove();

                                    jQuery("#messageSpan3").text('');
                                    jQuery("#messageSpan4").text('');
                                    jQuery("#messageSpan5").text('');
                                    jQuery("#messageSpan6").text('');
                                    TransformChartData(chartDataOEE, options, 3, d[xVarName]);
                                    BuildBar(id, chartDataOEE, options, 3);

                                });

                                jQuery("#messageSpan3").text('');
                                jQuery("#messageSpan4").text('');
                                jQuery("#messageSpan5").text('');
                                jQuery("#messageSpan6").text('');
                                TransformChartData(chartDataOEE, options, 3, d[xVarName]);
                                BuildBar(id, chartDataOEE, options, 3);
                            } else
                                if (level == 1) {
                                   

                                    jQuery("#messageSpan1").text(' / ' + d.caption);

                                    $('#messageSpan1').click(function (e) {

                                        d3.selectAll("#" + id + " svg").remove();

                                        jQuery("#messageSpan2").text('');
                                        jQuery("#messageSpan3").text('');
                                        jQuery("#messageSpan4").text('');
                                        jQuery("#messageSpan5").text('');
                                        jQuery("#messageSpan6").text('');
                                        TransformChartData(chartDataOEE, options, 2, d[xVarName]);
                                        BuildBar(id, chartDataOEE, options, 2);

                                    });

                                    jQuery("#messageSpan2").text('');
                                    jQuery("#messageSpan3").text('');
                                    jQuery("#messageSpan4").text('');
                                    jQuery("#messageSpan5").text('');
                                    jQuery("#messageSpan6").text('');
                                    TransformChartData(chartDataOEE, options, 2, d[xVarName]);
                                    BuildBar(id, chartDataOEE, options, 2);
                                }
                                else {
                                    var nonSortedChart = chartDataOEE.sort(function (a, b) {
                                        return parseFloat(b[options[0].yaxis]) - parseFloat(a[options[0].yaxis]);
                                    });
                                    jQuery("#level0").text(d.caption);
                                    jQuery("#messageSpan1").text('');
                                    jQuery("#messageSpan2").text('');
                                    jQuery("#messageSpan3").text('');
                                    jQuery("#messageSpan4").text('');
                                    jQuery("#messageSpan5").text('');
                                    jQuery("#messageSpan6").text('');

                                    TransformChartData(nonSortedChart, options, 1, d[xVarName]);
                                    BuildBar(id, nonSortedChart, options, 1);
                                }

            $(function () {
                $('#level0').click(function (e) {
                    d3.selectAll("#" + id + " svg").remove();
                    TransformChartData(chartDataOEE, options, 0, d[xVarName]);
                    BuildBar(id, chartDataOEE, options, 0);


                    jQuery("#messageSpan1").text('');
                    jQuery("#messageSpan2").text('');
                    jQuery("#messageSpan3").text('');
                    jQuery("#messageSpan4").text('');
                    jQuery("#messageSpan5").text('');
                    jQuery("#messageSpan6").text('');

                });



            });

        });


    bar.selectAll("rect").attr("height", function (d) {
        return height - y(d[yVarName]);
    })
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000)
        .attr("width", x.rangeBand()) //set width base on range on ordinal data
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000);

    bar.selectAll("rect").style("fill", function (d) {
        return rcolor(d[xVarName]);
    })
        .style("opacity", function (d) {
            return d["op"];
        });

    bar.append("text")
        .attr("x", x.rangeBand() / 2 + margin.left - 25)
        .attr("y", function (d) { return y(d[yVarName]) + margin.top - 25; })
        .attr("dy", ".35em")
        .text(function (d) {
            return d[yVarName] + " %";
        });

    bar.append("svg:title")
        .text(function (d) {
            //return xVarName + ":  " + d["title"] + " \x0A" + yVarName + ":  " + d[yVarName];
            return d["title"] + " (" + d[yVarName] + " %)";
        });

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top - 15) + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .attr("transform", "rotate(-65)" )
    //.text("Year");

    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + (margin.top - 15) + ")")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
    //.text("Sales Data");

    //alert('Hello');
    //alert('level is '+runningData.length);
    if (runningData.length >5) { // if number of bars is more than 5, tilt the xaxis labels
        chart.select(".x.axis")
           .selectAll("text")
           .style("text-anchor", "end")
           .attr("transform", " translate(-20,0) rotate(-45)");
    }

}
function TransformChartData(chartDataOEE, opts, level, filter) {
    var result = [];
    var resultColors = [];
    var counter = 0;
    var hasMatch;
    var xVarName;
    var yVarName = opts[0].yaxis;

    if (level == 6) {
        xVarName = opts[0].xaxisl6;

        for (var i in chartDataOEE) {
            hasMatch = false;
            for (var index = 0; index < result.length; ++index) {
                var data = result[index];

                if ((data[xVarName] == chartDataOEE[i][xVarName]) && (chartDataOEE[i][opts[0].xaxisl5]) == filter) {
                    result[index][yVarName] = (result[index][yVarName] * 100 + chartDataOEE[i][yVarName] * 100) / 100;
                    result[index][yVarName] = roundNumberOEE(result[index][yVarName]);
                    hasMatch = true;
                    break;
                }

            }
            if ((hasMatch == false) && ((chartDataOEE[i][opts[0].xaxisl5]) == filter)) {
                if (result.length < 9) {
                    ditem = {}
                    ditem[xVarName] = chartDataOEE[i][xVarName];
                    ditem[yVarName] =  roundNumberOEE(chartDataOEE[i][yVarName]);
                    ditem["caption"] = chartDataOEE[i][xVarName];//.substring(0, 10) + '...';
                    ditem["title"] = chartDataOEE[i][xVarName];
                    ditem["op"] = 1.0 ;//- parseFloat("0." + (result.length));
                    result.push(ditem);

                    resultColors[counter] = opts[0].color[0][chartDataOEE[i][opts[0].xaxis]];

                    counter += 1;
                }
            }
        }
    }
    else
        if (level == 5) {
            xVarName = opts[0].xaxisl5;

            for (var i in chartDataOEE) {
                hasMatch = false;
                for (var index = 0; index < result.length; ++index) {
                    var data = result[index];

                    if ((data[xVarName] == chartDataOEE[i][xVarName]) && (chartDataOEE[i][opts[0].xaxisl4]) == filter) {
                        result[index][yVarName] = (result[index][yVarName] * 100 + chartDataOEE[i][yVarName] * 100) / 100;
                        result[index][yVarName] = roundNumberOEE(result[index][yVarName]);
                        hasMatch = true;
                        break;
                    }

                }
                if ((hasMatch == false) && ((chartDataOEE[i][opts[0].xaxisl4]) == filter)) {
                    if (result.length < 9) {
                        ditem = {}
                        ditem[xVarName] = chartDataOEE[i][xVarName];
                        ditem[yVarName] =  roundNumberOEE(chartDataOEE[i][yVarName]);



                        ditem["caption"] = chartDataOEE[i][xVarName];//.substring(0, 10) + '...';
                        ditem["title"] = chartDataOEE[i][xVarName];
                        ditem["op"] = 1.0;// - parseFloat("0." + (result.length));
                        result.push(ditem);

                        resultColors[counter] = opts[0].color[0][chartDataOEE[i][opts[0].xaxis]];

                        counter += 1;
                    }
                }
            }
        }
        else
            if (level == 4) {
                xVarName = opts[0].xaxisl4;

                for (var i in chartDataOEE) {
                    hasMatch = false;
                    for (var index = 0; index < result.length; ++index) {
                        var data = result[index];

                        if ((data[xVarName] == chartDataOEE[i][xVarName]) && (chartDataOEE[i][opts[0].xaxisl3]) == filter) {
                            result[index][yVarName] = (result[index][yVarName] * 100 + chartDataOEE[i][yVarName] * 100) / 100;
                            result[index][yVarName] = roundNumberOEE(result[index][yVarName]);
                            hasMatch = true;
                            break;
                        }

                    }
                    if ((hasMatch == false) && ((chartDataOEE[i][opts[0].xaxisl3]) == filter)) {
                        if (result.length < 9) {
                            ditem = {}
                            ditem[xVarName] = chartDataOEE[i][xVarName];
                            ditem[yVarName] =  roundNumberOEE(chartDataOEE[i][yVarName]);



                            ditem["caption"] = chartDataOEE[i][xVarName];//.substring(0, 10) + '...';
                            ditem["title"] = chartDataOEE[i][xVarName];
                            ditem["op"] = 1.0;// - parseFloat("0." + (result.length));
                            result.push(ditem);

                            resultColors[counter] = opts[0].color[0][chartDataOEE[i][opts[0].xaxis]];

                            counter += 1;
                        }
                    }
                }
            }
            else
                if (level == 3) {
                    xVarName = opts[0].xaxisl3;

                    for (var i in chartDataOEE) {
                        hasMatch = false;
                        for (var index = 0; index < result.length; ++index) {
                            var data = result[index];

                            if ((data[xVarName] == chartDataOEE[i][xVarName]) && (chartDataOEE[i][opts[0].xaxisl2]) == filter) {
                                result[index][yVarName] = (result[index][yVarName] * 100 + chartDataOEE[i][yVarName] * 100) / 100;
                                result[index][yVarName] = roundNumberOEE(result[index][yVarName]);
                                hasMatch = true;
                                break;
                            }

                        }
                        if ((hasMatch == false) && ((chartDataOEE[i][opts[0].xaxisl2]) == filter)) {
                            if (result.length < 9) {
                                ditem = {}
                                ditem[xVarName] = chartDataOEE[i][xVarName];
                                ditem[yVarName] =  roundNumberOEE(chartDataOEE[i][yVarName]);



                                ditem["caption"] = chartDataOEE[i][xVarName];//.substring(0, 10) + '...';
                                ditem["title"] = chartDataOEE[i][xVarName];
                                ditem["op"] = 1.0; // - parseFloat("0." + (result.length));
                                result.push(ditem);

                                resultColors[counter] = opts[0].color[0][chartDataOEE[i][opts[0].xaxis]];

                                counter += 1;
                            }
                        }
                    }
                }
                else
                    if (level == 2) {
                        xVarName = opts[0].xaxisl2;

                        for (var i in chartDataOEE) {
                            hasMatch = false;
                            for (var index = 0; index < result.length; ++index) {
                                var data = result[index];

                                if ((data[xVarName] == chartDataOEE[i][xVarName]) && (chartDataOEE[i][opts[0].xaxisl1]) == filter) {
                                    result[index][yVarName] = (result[index][yVarName] * 100 + chartDataOEE[i][yVarName] * 100) / 100;
                                    result[index][yVarName] = roundNumberOEE(result[index][yVarName]);
                                    hasMatch = true;
                                    break;
                                }

                            }
                            if ((hasMatch == false) && ((chartDataOEE[i][opts[0].xaxisl1]) == filter)) {
                                if (result.length < 9) {
                                    ditem = {}
                                    ditem[xVarName] = chartDataOEE[i][xVarName];
                                    ditem[yVarName] =  roundNumberOEE(chartDataOEE[i][yVarName]);
                                    ditem["caption"] = chartDataOEE[i][xVarName];//.substring(0, 10) + '...';
                                    ditem["title"] = chartDataOEE[i][xVarName];
                                    ditem["op"] = 1.0; // - parseFloat("0." + (result.length));
                                    result.push(ditem);

                                    resultColors[counter] = opts[0].color[0][chartDataOEE[i][opts[0].xaxis]];

                                    counter += 1;
                                }
                            }
                        }
                    }
                    else
                        if (level == 1) {
                            xVarName = opts[0].xaxisl1;

                            for (var i in chartDataOEE) {
                                hasMatch = false;
                                for (var index = 0; index < result.length; ++index) {
                                    var data = result[index];

                                    if ((data[xVarName] == chartDataOEE[i][xVarName]) && (chartDataOEE[i][opts[0].xaxis]) == filter) {
                                        result[index][yVarName] = (result[index][yVarName] * 100 + chartDataOEE[i][yVarName] * 100) / 100;
                                        result[index][yVarName] = roundNumberOEE(result[index][yVarName]);
                                        hasMatch = true;
                                        break;
                                    }

                                }
                                if ((hasMatch == false) && ((chartDataOEE[i][opts[0].xaxis]) == filter)) {
                                    if (result.length < 9) {
                                        ditem = {}
                                        ditem[xVarName] = chartDataOEE[i][xVarName];
                                        ditem[yVarName] =  roundNumberOEE(chartDataOEE[i][yVarName]);
                                        ditem["caption"] = chartDataOEE[i][xVarName];//.substring(0, 10) + '...';
                                        ditem["title"] = chartDataOEE[i][xVarName];
                                        ditem["op"] = 1.0;// - parseFloat("0." + (result.length)); //change color of opacity
                                        result.push(ditem);

                                        resultColors[counter] = opts[0].color[0][chartDataOEE[i][opts[0].xaxis]];

                                        counter += 1;
                                    }
                                }
                            }
                        }
                        else {
                            xVarName = opts[0].xaxis;

                            for (var i in chartDataOEE) {
                                hasMatch = false;
                                for (var index = 0; index < result.length; ++index) {
                                    var data = result[index];

                                    if (data[xVarName] == chartDataOEE[i][xVarName]) {
                                        result[index][yVarName] = (result[index][yVarName] * 100 + chartDataOEE[i][yVarName] * 100) / 100;

                                        result[index][yVarName] = roundNumberOEE(result[index][yVarName]);

                                        hasMatch = true;
                                        break;
                                    }
                                }
                                if (hasMatch == false) {
                                    ditem = {};
                                    ditem[xVarName] = chartDataOEE[i][xVarName];
                                    ditem[yVarName] =  roundNumberOEE(chartDataOEE[i][yVarName]);
                                    ditem["caption"] = opts[0].captions != undefined ? opts[0].captions[0][chartDataOEE[i][xVarName]] : "";
                                    ditem["title"] = opts[0].captions != undefined ? opts[0].captions[0][chartDataOEE[i][xVarName]] : "";
                                    ditem["op"] = 1;
                                    result.push(ditem);

                                    resultColors[counter] = opts[0].color != undefined ? opts[0].color[0][chartDataOEE[i][xVarName]] : "";

                                    counter += 1;
                                }
                            }
                        }

    // sort the array
    result = sortJSON(result, xVarName, '321'); // 123 or 321

    runningData = result;
    runningColors = resultColors;
    return;
}
var chartDataOEE = [];
chartOptionsOEE = [{
    "captions": [{ "Availability Loss": "Availability Loss", "Performance Loss": "Performance Loss", "Quality Loss": "Quality Loss" }],
    "color": [{ "Availability Loss": "#ff1414", "Performance Loss": "#0808c0", "Quality Loss": "#10ce9c" }],
    "xaxis": "Main",
    "xaxisl1": "Category",
    "xaxisl2": "Reson",
    "xaxisl3": "Reson2",
    "xaxisl4": "Reson3",
    "xaxisl5": "Reson4",
    "xaxisl6": "Fault",
    "yaxis": "Perc"
}]

function nFormatter(num, digits) {

    if (digits === undefined) {
        digits = 1;
    }
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: " K" },
        { value: 1E6, symbol: " M" },
        { value: 1E9, symbol: " G" },
        { value: 1E12, symbol: " T" },
        { value: 1E15, symbol: " P" },
        { value: 1E18, symbol: " E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}
function sortJSON(arr, key, way) {
    return arr.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

function roundNumberOEE(number) {
    var newnumber = new Number(number + '').toFixed(2);
    return parseFloat(newnumber);
}
function setDatasource(data){
    chartDataOEE == null ? null : chartDataOEE.length =0; 
    chartDataOEE = data;
    Plot(chartDataOEE);
   
}

//=====================================================================Monthly Output loss =======================================================================//
function bindOutputLoss(chartOutputLossData) {
    $('#pieChartContentOutputLoss').empty().append('<canvas id="outputloss" height="350"></canvas>');
    const labels = chartOutputLossData.map(o => o.label).concat('Total');
    const data = [];
    let total = 0;
    for (let i = 0; i < chartOutputLossData.length; i++) {
        const vStart = total;
        total += chartOutputLossData[i].value;
        data.push([vStart, total]);
    }
    data.push(total);
    const backgroundColors = data.map((o, i) => 'rgba(15, 15, 209, ' + (i + (11 - data.length)) * 0.1 + ')');

    var chartloss = new Chart('outputloss', {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                barPercentage: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            title: {
                display: false,
                text: 'Output Loss'
            },
            "animation": {
                "duration": 1,
                "onComplete": function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(Array.isArray(data) ? nFormatter(data[1] - data[0]) : nFormatter(data), bar._model.x - 10, bar._model.y);
                        });
                    });
                }
            },
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) => {
                        const v = data.datasets[0].data[tooltipItem.index];
                        return Array.isArray(v) ? nFormatter(v[1] - v[0]) : nFormatter(v);
                    }
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        drawBorder: true,
                        display: false
                    },
                }],
                yAxes: [{
                    gridLines: {
                        drawBorder: true,
                        display: true
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return nFormatter(value, 3);
                        }
                    }

                }]
            }
        }
    });
  
   chartloss.update();
};

function setDatasourceMonthlyOutLoss(data){
    chartLossdata =[];
    chartLossdata = data;
    bindOutputLoss(chartLossdata);
}

//------------------------------------------------------------------Maintenance Dashboard---------------------------------------------------------------------------
function setDatasourceMaintenance(response) {

    chartData = response.dtData;

    var tsData = JSON.parse(JSON.stringify(chartData));
    var dpData = JSON.parse(JSON.stringify(chartData));
    var updData = JSON.parse(JSON.stringify(chartData));

    TransformChartDataMaintenance("Total Shutdown", tsData, chartOptions);
    BuildBarTS("chartTS", tsData, chartOptions);

    TransformChartDataMaintenance("Planned Downtime", dpData, chartOptions);
    BuildBarPD("chartPD", dpData, chartOptions);

    TransformChartDataMaintenance("Unplanned Downtime", updData, chartOptions);
    BuildBarUPD("chartUPD", updData, chartOptions);
}


function BuildBarTS(id, chartData, options, level) {
    //d3.selectAll("#" + id + " .innerCont").remove();
    //$("#" + id).append(chartInnerDiv);
    chart = d3.select("#" + id + " .innerCont");
    chart.selectAll("svg").remove();

    var margin = { top: 50, right: 10, bottom: 30, left: 50 },
        width = $(chart[0]).outerWidth() - margin.left - margin.right,
        height = $(chart[0]).outerHeight() - margin.top - margin.bottom
    var xVarName;
    var yVarName = options[0].yaxis;


    if (level == 3) {
        xVarName = options[0].xaxisl3;
    }
    else
        if (level == 2) {
            xVarName = options[0].xaxisl2;
        }
        else
            if (level == 1) {
                xVarName = options[0].xaxisl1;
            }
            else {
                xVarName = options[0].xaxis;
            }

    var xAry = runningDataTS.map(function (el) {
        return el[xVarName];
    });

    var yAry = runningDataTS.map(function (el) {
        return el[yVarName];
    });

    var capAry = runningDataTS.map(function (el) { return el.caption; });


    var x = d3.scale.ordinal().domain(xAry).rangeRoundBands([0, width], .5);
    var y = d3.scale.linear().domain([0, d3.max(runningDataTS, function (d) { return d[yVarName]; })]).range([height, 0]);
    var rcolor = d3.scale.ordinal().range(runningColors);

    chart = chart
        .append("svg")  //append svg element inside #chart
        .attr("width", width + margin.left + margin.right)    //set width
        .attr("height", height + margin.top + margin.bottom);  //set height

    var bar = chart.selectAll("g")
        .data(runningDataTS)
        .enter()
        .append("g")
        //.attr("filter", "url(#dropshadow)")        
        .attr("transform", function (d) {
            return "translate(" + x(d[xVarName]) + ", 0)";
        });

    var ctrtxt = 0;
    var xAxis = d3.svg.axis()
        .scale(x)
        //.orient("bottom").ticks(xAry.length).tickValues(capAry);  //orient bottom because x-axis tick labels will appear on the
        .orient("bottom").ticks(xAry.length)
        .tickFormat(function (d) {
            if (level == 0) {
                //var mapper = options[0].captions[0]
                //return mapper[d]
                var r = runningDataTS[ctrtxt].caption;
                ctrtxt += 1;
                return r;
            }
            else {
                var r = runningDataTS[ctrtxt].caption;
                ctrtxt += 1;
                return r;
            }
        });

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left").ticks(5); //orient left because y-axis tick labels will appear on the left side of the axis.

    bar.append("rect")
        .attr("y", function (d) {
            return y(d.Duration) + margin.top - 15;
        })
        .attr("x", function (d) {
            return (margin.left);
        })
        .on("mouseenter", function (d) {
            d3.select(this)
                .attr("stroke", "white")
                .attr("stroke-width", 1)
                .attr("height", function (d) {
                    return height - y(d[yVarName]) + 5;
                })
                .attr("y", function (d) {
                    return y(d.Duration) + margin.top - 20;
                })
                .attr("width", x.rangeBand() + 10)
                .attr("x", function (d) {
                    return (margin.left - 5);
                })
                .transition()
                .duration(200);


        })
        .on("mouseleave", function (d) {
            d3.select(this)
                .attr("stroke", "none")
                .attr("height", function (d) {
                    return height - y(d[yVarName]);;
                })
                .attr("y", function (d) {
                    return y(d[yVarName]) + margin.top - 15;
                })
                .attr("width", x.rangeBand())
                .attr("x", function (d) {
                    return (margin.left);
                })
                .transition()
                .duration(200);

        })
        .on("click", function (d) {
            if (this._listenToEvents) {
                // Reset inmediatelly
                d3.select(this).attr("transform", "translate(0,0)")
                // Change level on click if no transition has started                
                path.each(function () {
                    this._listenToEvents = false;
                });
            }
            d3.selectAll("#" + id + " svg").remove();


            if (level == 3) {

                jQuery("#TSmessageSpan1").text('');
                jQuery("#TSmessageSpan2").text('');
                jQuery("#TSmessageSpan3").text('');
                jQuery("#TSmessageSpan4").text('');
                jQuery("#TSmessageSpan5").text('');
                jQuery("#TSmessageSpan6").text('');

                TransformChartDataMaintenance("Total Shutdown", chartData, options, 0, d[xVarName]);
                BuildBarTS(id, chartData, options, 0);



            } else

                if (level == 2) {

                    jQuery("#TSmessageSpan3").text(' / ' + d.caption);

                    $('#TSmessageSpan3').click(function (e) {

                        d3.selectAll("#" + id + " svg").remove();

                        jQuery("#TSmessageSpan4").text('');
                        jQuery("#TSmessageSpan5").text('');
                        jQuery("#TSmessageSpan6").text('');
                        TransformChartDataMaintenance("Total Shutdown", chartData, options, 3, d[xVarName]);
                        BuildBarTS(id, chartData, options, 3);

                    });


                    jQuery("#TSmessageSpan4").text('');
                    jQuery("#TSmessageSpan5").text('');
                    jQuery("#TSmessageSpan6").text('');
                    TransformChartDataMaintenance("Total Shutdown", chartData, options, 3, d[xVarName]);
                    BuildBarTS(id, chartData, options, 3);
                } else
                    if (level == 1) {

                        jQuery("#TSmessageSpan2").text(' / ' + d.caption);

                        $('#TSmessageSpan2').click(function (e) {

                            d3.selectAll("#" + id + " svg").remove();

                            jQuery("#TSmessageSpan3").text('');
                            jQuery("#TSmessageSpan4").text('');
                            jQuery("#TSmessageSpan5").text('');
                            jQuery("#TSmessageSpan6").text('');
                            TransformChartDataMaintenance("Total Shutdown", chartData, options, 2, d[xVarName]);
                            BuildBarTS(id, chartData, options, 2);

                        });

                        jQuery("#TSmessageSpan3").text('');
                        jQuery("#TSmessageSpan4").text('');
                        jQuery("#TSmessageSpan5").text('');
                        jQuery("#TSmessageSpan6").text('');
                        TransformChartDataMaintenance("Total Shutdown", chartData, options, 2, d[xVarName]);
                        BuildBarTS(id, chartData, options, 2);
                    }
                    else {
                        var nonSortedChart = chartData.sort(function (a, b) {
                            return parseFloat(b[options[0].yaxis]) - parseFloat(a[options[0].yaxis]);
                        });
                        //jQuery("#TSlevel0").text(d.caption);
                        jQuery("#TSmessageSpan1").text(' / ' + d.caption);

                        $('#TSmessageSpan1').click(function (e) {

                            d3.selectAll("#" + id + " svg").remove();

                            jQuery("#TSmessageSpan2").text('');
                            jQuery("#TSmessageSpan3").text('');
                            jQuery("#TSmessageSpan4").text('');
                            jQuery("#TSmessageSpan5").text('');
                            jQuery("#TSmessageSpan6").text('');
                            TransformChartDataMaintenance("Total Shutdown", chartData, options, 1, d[xVarName]);
                            BuildBarTS(id, chartData, options, 1);

                        });

                        //jQuery("#TSmessageSpan1").text('');
                        jQuery("#TSmessageSpan2").text('');
                        jQuery("#TSmessageSpan3").text('');
                        jQuery("#TSmessageSpan4").text('');
                        jQuery("#TSmessageSpan5").text('');
                        jQuery("#TSmessageSpan6").text('');

                        TransformChartDataMaintenance("Total Shutdown", nonSortedChart, options, 1, d[xVarName]);
                        BuildBarTS(id, nonSortedChart, options, 1);
                    }

            $(function () {
                $('#TSlevel0').click(function (e) {
                    d3.selectAll("#" + id + " svg").remove();
                    TransformChartDataMaintenance("Total Shutdown", chartData, options, 0, undefined);
                    BuildBarTS(id, chartData, options, 0);
                    jQuery("#TSmessageSpan1").text('');
                    jQuery("#TSmessageSpan2").text('');
                    jQuery("#TSmessageSpan3").text('');
                    jQuery("#TSmessageSpan4").text('');
                    jQuery("#TSmessageSpan5").text('');
                    jQuery("#TSmessageSpan6").text('');

                });



            });

        });


    bar.selectAll("rect").attr("height", function (d) {
        return height - y(d[yVarName]);
    })
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000)
        .attr("width", x.rangeBand()) //set width base on range on ordinal data
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000);

    bar.selectAll("rect").style("fill", function (d) {
        return rcolor(d[xVarName]);
    })
        .style("opacity", function (d) {
            return d["op"];
        });

    bar.append("text")
        .attr("x", x.rangeBand() / 2 + margin.left - 25)
        .attr("y", function (d) { return y(d[yVarName]) + margin.top - 25; })
        .attr("dy", ".35em")
        .text(function (d) {
            return d[yVarName];
        });

    bar.append("svg:title")
        .text(function (d) {
            //return xVarName + ":  " + d["title"] + " \x0A" + yVarName + ":  " + d[yVarName];
            return d["title"] + " (" + d[yVarName] + ")";
        });

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top - 15) + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
    //.text("Year");

    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + (margin.top - 15) + ")")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
    //.text("Sales Data");

    if (level == 1) {
        //chart.select(".x.axis")
        //    .selectAll("text")
        //    .attr("transform", " translate(-20,10) rotate(-35)");
    }

}


function BuildBarPD(id, chartData, options, level) {
    //d3.selectAll("#" + id + " .innerCont").remove();
    //$("#" + id).append(chartInnerDiv);
    chart = d3.select("#" + id + " .innerCont");
    chart.selectAll("svg").remove();

    var margin = { top: 50, right: 10, bottom: 30, left: 50 },
        width = $(chart[0]).outerWidth() - margin.left - margin.right,
        height = $(chart[0]).outerHeight() - margin.top - margin.bottom
    var xVarName;
    var yVarName = options[0].yaxis;


    if (level == 3) {
        xVarName = options[0].xaxisl3;
    }
    else
        if (level == 2) {
            xVarName = options[0].xaxisl2;
        }
        else
            if (level == 1) {
                xVarName = options[0].xaxisl1;
            }
            else {
                xVarName = options[0].xaxis;
            }

    var xAry = runningDataPD.map(function (el) {
        return el[xVarName];
    });

    var yAry = runningDataPD.map(function (el) {
        return el[yVarName];
    });

    var capAry = runningDataPD.map(function (el) { return el.caption; });


    var x = d3.scale.ordinal().domain(xAry).rangeRoundBands([0, width], .5);
    var y = d3.scale.linear().domain([0, d3.max(runningDataPD, function (d) { return d[yVarName]; })]).range([height, 0]);
    var rcolor = d3.scale.ordinal().range(runningColors);

    chart = chart
        .append("svg")  //append svg element inside #chart
        .attr("width", width + margin.left + margin.right)    //set width
        .attr("height", height + margin.top + margin.bottom);  //set height

    var bar = chart.selectAll("g")
        .data(runningDataPD)
        .enter()
        .append("g")
        //.attr("filter", "url(#dropshadow)")
        .attr("transform", function (d) {
            return "translate(" + x(d[xVarName]) + ", 0)";
        });

    var ctrtxt = 0;
    var xAxis = d3.svg.axis()
        .scale(x)
        //.orient("bottom").ticks(xAry.length).tickValues(capAry);  //orient bottom because x-axis tick labels will appear on the
        .orient("bottom").ticks(xAry.length)
        .tickFormat(function (d) {
            if (level == 0) {

                var r = runningDataPD[ctrtxt].caption;
                ctrtxt += 1;
                return r;

                //var mapper = options[0].captions[0]
                //return mapper[d]
            }
            else {
                var r = runningDataPD[ctrtxt].caption;
                ctrtxt += 1;
                return r;
            }
        });

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left").ticks(5); //orient left because y-axis tick labels will appear on the left side of the axis.

    bar.append("rect")
        .attr("y", function (d) {
            return y(d.Duration) + margin.top - 15;
        })
        .attr("x", function (d) {
            return (margin.left);
        })
        .on("mouseenter", function (d) {
            d3.select(this)
                .attr("stroke", "white")
                .attr("stroke-width", 1)
                .attr("height", function (d) {
                    return height - y(d[yVarName]) + 5;
                })
                .attr("y", function (d) {
                    return y(d.Duration) + margin.top - 20;
                })
                .attr("width", x.rangeBand() + 10)
                .attr("x", function (d) {
                    return (margin.left - 5);
                })
                .transition()
                .duration(200);


        })
        .on("mouseleave", function (d) {
            d3.select(this)
                .attr("stroke", "none")
                .attr("height", function (d) {
                    return height - y(d[yVarName]);;
                })
                .attr("y", function (d) {
                    return y(d[yVarName]) + margin.top - 15;
                })
                .attr("width", x.rangeBand())
                .attr("x", function (d) {
                    return (margin.left);
                })
                .transition()
                .duration(200);

        })
        .on("click", function (d) {
            if (this._listenToEvents) {
                // Reset inmediatelly
                d3.select(this).attr("transform", "translate(0,0)")
                // Change level on click if no transition has started                
                path.each(function () {
                    this._listenToEvents = false;
                });
            }
            d3.selectAll("#" + id + " svg").remove();


            if (level == 3) {


                //$('#PDmessageSpan3').click(function (e) {

                //    d3.selectAll("#" + id + " svg").remove();
                //    TransformChartData("Planned Downtime", chartData, options, 0, d[xVarName]);
                //    BuildBarPD(id, chartData, options, 0);
                //    jQuery("#PDmessageSpan1").text('');
                //    jQuery("#PDmessageSpan2").text('');
                //    jQuery("#PDmessageSpan3").text('');
                //    jQuery("#PDmessageSpan4").text('');
                //    jQuery("#PDmessageSpan5").text('');
                //    jQuery("#PDmessageSpan6").text('');

                //});

                jQuery("#PDmessageSpan1").text('');
                jQuery("#PDmessageSpan2").text('');
                jQuery("#PDmessageSpan3").text('');
                jQuery("#PDmessageSpan4").text('');
                jQuery("#PDmessageSpan5").text('');
                jQuery("#PDmessageSpan6").text('');

                TransformChartDataMaintenance("Planned Downtime", chartData, options, 0, d[xVarName]);
                BuildBarPD(id, chartData, options, 0);

                //TransformChartData("Planned Downtime", chartData, options, 4, d[xVarName]);
                //BuildBarPD(id, chartData, options, 4);

            } else

                if (level == 2) {
                    jQuery("#PDmessageSpan3").text(' / ' + d.caption);

                    $('#PDmessageSpan3').click(function (e) {

                        d3.selectAll("#" + id + " svg").remove();

                        jQuery("#PDmessageSpan4").text('');
                        jQuery("#PDmessageSpan5").text('');
                        jQuery("#PDmessageSpan6").text('');
                        TransformChartDataMaintenance("Planned Downtime", chartData, options, 3, d[xVarName]);
                        BuildBarPD(id, chartData, options, 3);

                    });


                    //jQuery("#PDmessageSpan3").text('');
                    jQuery("#PDmessageSpan4").text('');
                    jQuery("#PDmessageSpan5").text('');
                    jQuery("#PDmessageSpan6").text('');
                    TransformChartDataMaintenance("Planned Downtime", chartData, options, 3, d[xVarName]);
                    BuildBarPD(id, chartData, options, 3);
                } else
                    if (level == 1) {
                        jQuery("#PDmessageSpan2").text(' / ' + d.caption);

                        $('#PDmessageSpan2').click(function (e) {

                            d3.selectAll("#" + id + " svg").remove();

                            jQuery("#PDmessageSpan3").text('');
                            jQuery("#PDmessageSpan4").text('');
                            jQuery("#PDmessageSpan5").text('');
                            jQuery("#PDmessageSpan6").text('');
                            TransformChartDataMaintenance("Planned Downtime", chartData, options, 2, d[xVarName]);
                            BuildBarPD(id, chartData, options, 2);

                        });


                        //jQuery("#PDmessageSpan2").text('');
                        jQuery("#PDmessageSpan3").text('');
                        jQuery("#PDmessageSpan4").text('');
                        jQuery("#PDmessageSpan5").text('');
                        jQuery("#PDmessageSpan6").text('');
                        TransformChartDataMaintenance("Planned Downtime", chartData, options, 2, d[xVarName]);
                        BuildBarPD(id, chartData, options, 2);
                    }
                    else {
                        var nonSortedChart = chartData.sort(function (a, b) {
                            return parseFloat(b[options[0].yaxis]) - parseFloat(a[options[0].yaxis]);
                        });

                        //jQuery("#PSlevel0").text(d.caption);
                        jQuery("#PDmessageSpan1").text(' / ' + d.caption);

                        $('#PDmessageSpan1').click(function (e) {

                            d3.selectAll("#" + id + " svg").remove();

                            jQuery("#PDmessageSpan2").text('');
                            jQuery("#PDmessageSpan3").text('');
                            jQuery("#PDmessageSpan4").text('');
                            jQuery("#PDmessageSpan5").text('');
                            jQuery("#PDmessageSpan6").text('');
                            TransformChartDataMaintenance("Planned Downtime", chartData, options, 1, d[xVarName]);
                            BuildBarPD(id, chartData, options, 1);

                        });

                        //jQuery("#PDmessageSpan1").text('');
                        jQuery("#PDmessageSpan2").text('');
                        jQuery("#PDmessageSpan3").text('');
                        jQuery("#PDmessageSpan4").text('');
                        jQuery("#PDmessageSpan5").text('');
                        jQuery("#PDmessageSpan6").text('');

                        TransformChartDataMaintenance("Planned Downtime", nonSortedChart, options, 1, d[xVarName]);
                        BuildBarPD(id, nonSortedChart, options, 1);
                    }

            $(function () {
                $('#PDlevel0').click(function (e) {
                    d3.selectAll("#" + id + " svg").remove();
                    TransformChartDataMaintenance("Planned Downtime", chartData, options, 0, undefined);
                    BuildBarPD(id, chartData, options, 0);
                    jQuery("#PDmessageSpan1").text('');
                    jQuery("#PDmessageSpan2").text('');
                    jQuery("#PDmessageSpan3").text('');
                    jQuery("#PDmessageSpan4").text('');
                    jQuery("#PDmessageSpan5").text('');
                    jQuery("#PDmessageSpan6").text('');

                });



            });

        });


    bar.selectAll("rect").attr("height", function (d) {
        return height - y(d[yVarName]);
    })
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000)
        .attr("width", x.rangeBand()) //set width base on range on ordinal data
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000);

    bar.selectAll("rect").style("fill", function (d) {
        return rcolor(d[xVarName]);
    })
        .style("opacity", function (d) {
            return d["op"];
        });

    bar.append("text")
        .attr("x", x.rangeBand() / 2 + margin.left - 25)
        .attr("y", function (d) { return y(d[yVarName]) + margin.top - 25; })
        .attr("dy", ".35em")
        .text(function (d) {
            return d[yVarName];
        });

    bar.append("svg:title")
        .text(function (d) {
            //return xVarName + ":  " + d["title"] + " \x0A" + yVarName + ":  " + d[yVarName];
            return d["title"] + " (" + d[yVarName] + ")";
        });

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top - 15) + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
    //.text("Year");

    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + (margin.top - 15) + ")")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
    //.text("Sales Data");

    if (level == 1) {
        //chart.select(".x.axis")
        //    .selectAll("text")
        //    .attr("transform", " translate(-20,10) rotate(-35)");
    }

}


function BuildBarUPD(id, chartData, options, level) {
    //d3.selectAll("#" + id + " .innerCont").remove();
    //$("#" + id).append(chartInnerDiv);


    chart = d3.select("#" + id + " .innerCont");
    chart.selectAll("svg").remove();

    var margin = { top: 50, right: 10, bottom: 30, left: 50 },
        width = $(chart[0]).outerWidth() - margin.left - margin.right,
        height = $(chart[0]).outerHeight() - margin.top - margin.bottom
    var xVarName;
    var yVarName = options[0].yaxis;


    if (level == 3) {
        xVarName = options[0].xaxisl3;
    }
    else
        if (level == 2) {
            xVarName = options[0].xaxisl2;
        }
        else
            if (level == 1) {
                xVarName = options[0].xaxisl1;
            }
            else {
                xVarName = options[0].xaxis;
            }

    var xAry = runningDataUPD.map(function (el) {
        return el[xVarName];
    });

    var yAry = runningDataUPD.map(function (el) {
        return el[yVarName];
    });

    var capAry = runningDataUPD.map(function (el) { return el.caption; });


    var x = d3.scale.ordinal().domain(xAry).rangeRoundBands([0, width], .5);
    var y = d3.scale.linear().domain([0, d3.max(runningDataUPD, function (d) { return d[yVarName]; })]).range([height, 0]);
    var rcolor = d3.scale.ordinal().range(runningColors);

    chart = chart
        .append("svg")  //append svg element inside #chart
        .attr("width", width + margin.left + margin.right)    //set width
        .attr("height", height + margin.top + margin.bottom);  //set height

    var bar = chart.selectAll("g")
        .data(runningDataUPD)
        .enter()
        .append("g")
        //.attr("filter", "url(#dropshadow)")
        .attr("transform", function (d) {
            return "translate(" + x(d[xVarName]) + ", 0)";
        });

    var ctrtxt = 0;
    var xAxis = d3.svg.axis()
        .scale(x)
        //.orient("bottom").ticks(xAry.length).tickValues(capAry);  //orient bottom because x-axis tick labels will appear on the
        .orient("bottom").ticks(xAry.length)
        .tickFormat(function (d) {
            if (level == 0) {

                var r = runningDataUPD[ctrtxt].caption;
                ctrtxt += 1;
                return r;

                //var mapper = options[0].captions[0]
                //return mapper[d]
            }
            else {
                var r = runningDataUPD[ctrtxt].caption;
                ctrtxt += 1;
                return r;
            }
        });

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left").ticks(5); //orient left because y-axis tick labels will appear on the left side of the axis.

    bar.append("rect")
        .attr("y", function (d) {
            return y(d.Duration) + margin.top - 15;
        })
        .attr("x", function (d) {
            return (margin.left);
        })
        .on("mouseenter", function (d) {
            d3.select(this)
                .attr("stroke", "white")
                .attr("stroke-width", 1)
                .attr("height", function (d) {
                    return height - y(d[yVarName]) + 5;
                })
                .attr("y", function (d) {
                    return y(d.Duration) + margin.top - 20;
                })
                .attr("width", x.rangeBand() + 10)
                .attr("x", function (d) {
                    return (margin.left - 5);
                })
                .transition()
                .duration(200);


        })
        .on("mouseleave", function (d) {
            d3.select(this)
                .attr("stroke", "none")
                .attr("height", function (d) {
                    return height - y(d[yVarName]);;
                })
                .attr("y", function (d) {
                    return y(d[yVarName]) + margin.top - 15;
                })
                .attr("width", x.rangeBand())
                .attr("x", function (d) {
                    return (margin.left);
                })
                .transition()
                .duration(200);

        })
        .on("click", function (d) {
            if (this._listenToEvents) {
                // Reset inmediatelly
                d3.select(this).attr("transform", "translate(0,0)")
                // Change level on click if no transition has started                
                path.each(function () {
                    this._listenToEvents = false;
                });
            }
            d3.selectAll("#" + id + " svg").remove();


            if (level == 3) {


                //$('#UPDmessageSpan3').click(function (e) {

                //    d3.selectAll("#" + id + " svg").remove();
                //    TransformChartData("Unplanned Downtime", chartData, options, 0, d[xVarName]);
                //    BuildBarUPD(id, chartData, options, 0);
                //    jQuery("#UPDmessageSpan1").text('');
                //    jQuery("#UPDmessageSpan2").text('');
                //    jQuery("#UPDmessageSpan3").text('');
                //    jQuery("#UPDmessageSpan4").text('');
                //    jQuery("#UPDmessageSpan5").text('');
                //    jQuery("#UPDmessageSpan6").text('');

                //});

                jQuery("#UPDmessageSpan1").text('');
                jQuery("#UPDmessageSpan2").text('');
                jQuery("#UPDmessageSpan3").text('');
                jQuery("#UPDmessageSpan4").text('');
                jQuery("#UPDmessageSpan5").text('');
                jQuery("#UPDmessageSpan6").text('');

                TransformChartDataMaintenance("Unplanned Downtime", chartData, options, 0, d[xVarName]);
                BuildBarUPD(id, chartData, options, 0);

                //TransformChartData("Unplanned Downtime", chartData, options, 4, d[xVarName]);
                //BuildBarUPD(id, chartData, options, 4);

            } else

                if (level == 2) {
                    jQuery("#UPDmessageSpan3").text(' / ' + d.caption);

                    $('#UPDmessageSpan3').click(function (e) {

                        d3.selectAll("#" + id + " svg").remove();

                        jQuery("#UPDmessageSpan4").text('');
                        jQuery("#UPDmessageSpan5").text('');
                        jQuery("#UPDmessageSpan6").text('');
                        TransformChartDataMaintenance("Unplanned Downtime", chartData, options, 3, d[xVarName]);
                        BuildBarUPD(id, chartData, options, 3);

                    });


                    //jQuery("#UPDmessageSpan3").text('');
                    jQuery("#UPDmessageSpan4").text('');
                    jQuery("#UPDmessageSpan5").text('');
                    jQuery("#UPDmessageSpan6").text('');
                    TransformChartDataMaintenance("Unplanned Downtime", chartData, options, 3, d[xVarName]);
                    BuildBarUPD(id, chartData, options, 3);
                } else
                    if (level == 1) {
                        jQuery("#UPDmessageSpan2").text(' / ' + d.caption);

                        $('#UPDmessageSpan2').click(function (e) {

                            d3.selectAll("#" + id + " svg").remove();

                            jQuery("#UPDmessageSpan3").text('');
                            jQuery("#UPDmessageSpan4").text('');
                            jQuery("#UPDmessageSpan5").text('');
                            jQuery("#UPDmessageSpan6").text('');
                            TransformChartDataMaintenance("Unplanned Downtime", chartData, options, 2, d[xVarName]);
                            BuildBarUPD(id, chartData, options, 2);

                        });


                        //jQuery("#UPDmessageSpan2").text('');
                        jQuery("#UPDmessageSpan3").text('');
                        jQuery("#UPDmessageSpan4").text('');
                        jQuery("#UPDmessageSpan5").text('');
                        jQuery("#UPDmessageSpan6").text('');
                        TransformChartDataMaintenance("Unplanned Downtime", chartData, options, 2, d[xVarName]);
                        BuildBarUPD(id, chartData, options, 2);
                    }
                    else {
                        var nonSortedChart = chartData.sort(function (a, b) {
                            return parseFloat(b[options[0].yaxis]) - parseFloat(a[options[0].yaxis]);
                        });

                        //jQuery("#PSlevel0").text(d.caption);
                        jQuery("#UPDmessageSpan1").text(' / ' + d.caption);

                        $('#UPDmessageSpan1').click(function (e) {

                            d3.selectAll("#" + id + " svg").remove();

                            jQuery("#UPDmessageSpan2").text('');
                            jQuery("#UPDmessageSpan3").text('');
                            jQuery("#UPDmessageSpan4").text('');
                            jQuery("#UPDmessageSpan5").text('');
                            jQuery("#UPDmessageSpan6").text('');
                            TransformChartDataMaintenance("Unplanned Downtime", chartData, options, 1, d[xVarName]);
                            BuildBarUPD(id, chartData, options, 1);

                        });

                        //jQuery("#UPDmessageSpan1").text('');
                        jQuery("#UPDmessageSpan2").text('');
                        jQuery("#UPDmessageSpan3").text('');
                        jQuery("#UPDmessageSpan4").text('');
                        jQuery("#UPDmessageSpan5").text('');
                        jQuery("#UPDmessageSpan6").text('');

                        TransformChartDataMaintenance("Unplanned Downtime", nonSortedChart, options, 1, d[xVarName]);
                        BuildBarUPD(id, nonSortedChart, options, 1);
                    }

            $(function () {
                $('#UPDlevel0').click(function (e) {
                    d3.selectAll("#" + id + " svg").remove();
                    TransformChartDataMaintenance("Unplanned Downtime", chartData, options, 0, undefined);
                    BuildBarUPD(id, chartData, options, 0);
                    jQuery("#UPDmessageSpan1").text('');
                    jQuery("#UPDmessageSpan2").text('');
                    jQuery("#UPDmessageSpan3").text('');
                    jQuery("#UPDmessageSpan4").text('');
                    jQuery("#UPDmessageSpan5").text('');
                    jQuery("#UPDmessageSpan6").text('');

                });



            });

        });


    bar.selectAll("rect").attr("height", function (d) {
        return height - y(d[yVarName]);
    })
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000)
        .attr("width", x.rangeBand()) //set width base on range on ordinal data
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000);

    bar.selectAll("rect").style("fill", function (d) {
        return rcolor(d[xVarName]);
    })
        .style("opacity", function (d) {
            return d["op"];
        });

    bar.append("text")
        .attr("x", x.rangeBand() / 2 + margin.left - 25)
        .attr("y", function (d) { return y(d[yVarName]) + margin.top - 25; })
        .attr("dy", ".35em")
        .text(function (d) {
            return d[yVarName];
        });

    bar.append("svg:title")
        .text(function (d) {
            //return xVarName + ":  " + d["title"] + " \x0A" + yVarName + ":  " + d[yVarName];
            return d["title"] + " (" + d[yVarName] + ")";
        });

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top - 15) + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
    //.text("Year");

    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + (margin.top - 15) + ")")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
    //.text("Sales Data");

    if (level == 1) {
        //chart.select(".x.axis")
        //    .selectAll("text")
        //    .attr("transform", " translate(-20,10) rotate(-35)");
    }

}



function TransformChartDataMaintenance(category, chartData, opts, level, filter) {
    var result = [];
    var resultColors = [];
    var counter = 0;
    var hasMatch;
    var xVarName;
    var yVarName = opts[0].yaxis;

    chartData = chartData.filter(function (v) {
        return v.Category == category;
    });


    if (level == 3) {
        xVarName = opts[0].xaxisl3;

        for (var i in chartData) {
            hasMatch = false;
            for (var index = 0; index < result.length; ++index) {
                var data = result[index];

                if ((data[xVarName] == chartData[i][xVarName]) && (chartData[i][opts[0].xaxisl2]) == filter) {
                    result[index][yVarName] = (result[index][yVarName] * 100 + chartData[i][yVarName] * 100) / 100;
                    result[index][yVarName] = roundNumberMaintenance(result[index][yVarName]);
                    hasMatch = true;
                    break;
                }

            }
            if ((hasMatch == false) && ((chartData[i][opts[0].xaxisl2]) == filter)) {
                if (result.length < 9) {
                    ditem = {}
                    ditem[xVarName] = chartData[i][xVarName];
                    ditem[yVarName] = chartData[i][yVarName];



                    ditem["caption"] = chartData[i][xVarName];//.substring(0, 10) + '...';
                    ditem["title"] = chartData[i][xVarName];
                    ditem["op"] = 1.0 - parseFloat("0." + (result.length));
                    result.push(ditem);

                    resultColors[counter] = opts[0].color[0];

                    counter += 1;
                }
            }
        }
    }
    else
        if (level == 2) {
            xVarName = opts[0].xaxisl2;

            for (var i in chartData) {
                hasMatch = false;
                for (var index = 0; index < result.length; ++index) {
                    var data = result[index];

                    if ((data[xVarName] == chartData[i][xVarName]) && (chartData[i][opts[0].xaxisl1]) == filter) {
                        result[index][yVarName] = (result[index][yVarName] * 100 + chartData[i][yVarName] * 100) / 100;
                        result[index][yVarName] = roundNumberMaintenance(result[index][yVarName]);
                        hasMatch = true;
                        break;
                    }

                }
                if ((hasMatch == false) && ((chartData[i][opts[0].xaxisl1]) == filter)) {
                    if (result.length < 9) {
                        ditem = {}
                        ditem[xVarName] = chartData[i][xVarName];
                        ditem[yVarName] = chartData[i][yVarName];
                        ditem["caption"] = chartData[i][xVarName];//.substring(0, 10) + '...';
                        ditem["title"] = chartData[i][xVarName];
                        ditem["op"] = 1.0 - parseFloat("0." + (result.length));
                        result.push(ditem);

                        resultColors[counter] = opts[0].color[2];

                        counter += 1;
                    }
                }
            }
        }
        else
            if (level == 1) {
                xVarName = opts[0].xaxisl1;

                for (var i in chartData) {
                    hasMatch = false;
                    for (var index = 0; index < result.length; ++index) {
                        var data = result[index];

                        if ((data[xVarName] == chartData[i][xVarName]) && (chartData[i][opts[0].xaxis]) == filter) {
                            result[index][yVarName] = (result[index][yVarName] * 100 + chartData[i][yVarName] * 100) / 100;
                            result[index][yVarName] = roundNumberMaintenance(result[index][yVarName]);
                            hasMatch = true;
                            break;
                        }

                    }
                    if ((hasMatch == false) && ((chartData[i][opts[0].xaxis]) == filter)) {
                        if (result.length < 9) {
                            ditem = {}
                            ditem[xVarName] = chartData[i][xVarName];
                            ditem[yVarName] = chartData[i][yVarName];
                            ditem["caption"] = chartData[i][xVarName];//.substring(0, 10) + '...';
                            ditem["title"] = chartData[i][xVarName];
                            ditem["op"] = 1.0 - parseFloat("0." + (result.length));
                            result.push(ditem);

                            resultColors[counter] = opts[0].color[1];

                            counter += 1;
                        }
                    }
                }
            }
            else {
                xVarName = opts[0].xaxis;

                for (var i in chartData) {
                    hasMatch = false;
                    for (var index = 0; index < result.length; ++index) {
                        var data = result[index];

                        if (data[xVarName] == chartData[i][xVarName]) {
                            result[index][yVarName] = (result[index][yVarName] * 100 + chartData[i][yVarName] * 100) / 100;

                            result[index][yVarName] = roundNumberMaintenance(result[index][yVarName]);

                            hasMatch = true;
                            break;
                        }
                    }
                    if (hasMatch == false) {
                        if (result.length < 9) {
                            ditem = {};
                            ditem[xVarName] = chartData[i][xVarName];
                            ditem[yVarName] = chartData[i][yVarName];
                            ditem["caption"] = chartData[i][xVarName];//.substring(0, 10) + '...';
                            ditem["title"] = chartData[i][xVarName];
                            ditem["op"] = 1.0 - parseFloat("0." + (result.length));
                            result.push(ditem);

                            resultColors[counter] = opts[0].color != undefined ? opts[0].color[0] : "";

                            counter += 1;
                        }
                    }
                }
            }


    if (category == "Total Shutdown") {
        $('#lblTSCount').text(chartData.length);

        var totalMin = 0;

        $.each(chartData, function () {
            totalMin += this.Duration;
        });



        $('#lblTSDuration').text(totalMin ? totalMin.toFixed() : 0);


        runningDataTS = result;
        BindFaultChart("tstTotalShutdown", chartData, xVarName, filter);
    }
    else if (category == "Planned Downtime") {

        $('#lblPDCount').text(chartData.length);

        var totalMin = 0;

        $.each(chartData, function () {
            totalMin += this.Duration;
        });

        $('#lblPDDuration').text(totalMin ? totalMin.toFixed(0) : 0);

        runningDataPD = result;
        BindFaultChart("tsdPlannedDowntime", chartData, xVarName, filter);
    }
    else {
        $('#lblUPDCount').text(chartData.length);

        var totalMin = 0;

        $.each(chartData, function () {
            totalMin += this.Duration;
        });

        $('#lblUPDDuration').text(totalMin ? totalMin.toFixed(0) : 0);

        runningDataUPD = result;

        BindFaultChart("tsdUPlannedDowntime", chartData, xVarName, filter);
    }

    runningColors = resultColors;
    return;
}


function BindFaultChart(chartId, faultChartData, ColumnName, ColumnValue) {

    if (chartId == "tstTotalShutdown")
        $('#divTS').empty().append('<canvas id="' + chartId + '"></canvas>');
    if (chartId == "tsdPlannedDowntime")
        $('#divPD').empty().append('<canvas id="' + chartId + '"></canvas>');
    if (chartId == "tsdUPlannedDowntime")
        $('#divUPD').empty().append('<canvas id="' + chartId + '"></canvas>');




    mylocalData = faultChartData;

    if (ColumnValue != undefined) {
        mylocalData = faultChartData.filter(function (v) {
            return v[ColumnName] == ColumnValue;
        });
    }


    var barOptions_stacked = {
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: function (tooltipItems, data) {
                    var datasets = data.datasets;
                    for (i = 0; i < datasets.length; i++) {
                        var multistringText = ['Minute :' + datasets[i].data[tooltipItems.index]];
                        multistringText.push('Total Count :' + datasets[i].dataminute[tooltipItems.index]);
                        return multistringText;
                    }

                }
            }

        },
        title: {
            display: false,
            text: 'Faulty Summary (Top 10)'
        },

        hover: {
            animationDuration: 0
        },
        scales: {
            xAxes: [{
                barPercentage: 1,
                ticks: {
                    beginAtZero: true,
                    fontFamily: "'Open Sans Bold', sans-serif",
                    fontSize: 11,
                    callback: function (value, index, values) {
                        if (parseInt(value) > 999) {
                            return (value / 1000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' K';
                        } else if (parseInt(value) < -999) {
                            return '- ' + (Math.abs(value) / 1000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' K';
                        } else {
                            return value;
                        }
                    }
                },
                scaleLabel: {
                    display: false
                },
                gridLines: {
                },
                stacked: true
            }],
            yAxes: [{
                barThickness: 20,  // number (pixels) or 'flex'
                maxBarThickness: 20, // number (pixels)
                gridLines: {
                    display: false,
                    color: "#fff",
                    zeroLineColor: "#fff",
                    zeroLineWidth: 0
                },

                ticks: {
                    fontFamily: "'Open Sans Bold', sans-serif",
                    fontSize: 11
                },
                stacked: true
            }]
        },
        legend: {

            display: false
        },

        animation: {

        },
        pointLabelFontFamily: "Quadon Extra Bold",
        scaleFontFamily: "Quadon Extra Bold",
    };

    var ctx = document.getElementById(chartId);
    var myLabels = [];
    var myLocalData = [];
    var myLocalCount = [];

    var result = [];
    mylocalData.reduce(function (res, value) {
        if (!res[value.Fault]) {
            res[value.Fault] = {
                Duration: 0,
                countt: 0,
                Fault: value.Fault
            };
            result.push(res[value.Fault])
        }
        res[value.Fault].Duration += value.Duration
        res[value.Fault].countt++;
        return res;
    }, {});


    result = sortJSON(result, "Duration", '321'); // 123 or 321

    for (var i in result) {

        if (i <= 9) {
            myLabels.push(result[i]["Fault"]);
            myLocalData.push(result[i]["Duration"]);
            myLocalCount.push(result[i]["countt"]);
        }
    }




    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: myLabels,

            datasets: [{
                label: 'Total Count',
                data: myLocalData,
                dataminute: myLocalCount,
                //backgroundColor: ['#5a0cf5', '#00a65a', '#f5330c', '#00c0ef', '#6e49e6', '#5e1a75', '#f56954', '#37b0a8', '#123994', '#909412', '#5a0cf5', '#00a65a', '#f5330c', '#00c0ef', '#6e49e6', '#5e1a75', '#f56954', '#37b0a8', '#123994', '#909412'],
                backgroundColor: ['#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4', '#3aafe4'],
                hoverBackgroundColor: '#3aafe4'
            },

            ]
        },

        options: barOptions_stacked,
    });

}

var chartData = [];

function sortJSON(arr, key, way) {
    return arr.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

function roundNumberMaintenance(number) {
    var newnumber = new Number(number + '').toFixed(2);
    return parseFloat(newnumber);
}

chartOptions = [{
    "captions": [{ "Total Shutdown": "Total Shutdown", "Planned Downtime": "Planned Downtime", "Unplanned Downtime": "Unplanned Downtime" }],
    //"color": ["#FFA500", "#0070C0", "#ff0000"],
    "color": ["#3aafe4", "#3aafe4", "#3aafe4"],
    "xaxis": "Reson",
    "xaxisl1": "Reson2",
    "xaxisl2": "Reson3",
    "xaxisl3": "Reson4",
    "yaxis": "Duration"
}]



