import Foundation
import UIKit
import Charts
import SwiftyJSON

@objcMembers
class BellaChartViewBase: UIView, ChartViewDelegate {
    open var onSelect: RCTBubblingEventBlock?

    var savedVisibleRange: NSDictionary?

    var chart: ChartViewBase {
        fatalError("subclass should override this function.")
    }

    var dataExtract : DataExtract {
        fatalError("subclass should override this function.")
    }
    
    fileprivate var barLineChart: BarLineChartViewBase {
        get {
            return chart as! BarLineChartViewBase
        }
    }
    
    override open func reactSetFrame(_ frame: CGRect)
    {
        super.reactSetFrame(frame);

        let chartFrame = CGRect(x: 0, y: 0, width: frame.width, height: frame.height)
        chart.reactSetFrame(chartFrame)
    }

    func setData(_ data: NSDictionary) {
        let json = ChartUtils.toJson(data)

        chart.data = dataExtract.extract(json)
    }

    func setLegend(_ config: NSDictionary) {
        let json = ChartUtils.toJson(config)

        let legend = chart.legend;

        if json["enabled"].bool != nil {
            legend.enabled = json["enabled"].boolValue;
        }
    }

    func setChartBackgroundColor(_ backgroundColor: Int) {
        chart.backgroundColor = RCTConvert.uiColor(backgroundColor)
    }

    func setChartDescription(_ config: NSDictionary) {
        let json = ChartUtils.toJson(config)

        let chartDescription = Description()

        if json["text"].string != nil {
            chartDescription.text = json["text"].stringValue
        }

        chart.chartDescription = chartDescription
    }

    func setAnimation(_ config: NSDictionary) {
        let json = ChartUtils.toJson(config)

        let durationX = json["durationX"].double != nil ?
            json["durationX"].doubleValue / 1000.0 : 0
        let durationY = json["durationY"].double != nil ?
            json["durationY"].doubleValue / 1000.0 : 0


        let easingX: ChartEasingOption = .linear
        let easingY: ChartEasingOption = .linear

        if durationX != 0 && durationY != 0 {
            chart.animate(xAxisDuration: durationX, yAxisDuration: durationY, easingOptionX: easingX, easingOptionY: easingY)
        } else if (durationX != 0) {
            chart.animate(xAxisDuration: durationX, easingOption: easingX)
        } else if (durationY != 0) {
            chart.animate(yAxisDuration: durationY, easingOption: easingY)
        }
    }

    func setXAxis(_ config: NSDictionary) {
        let json = ChartUtils.toJson(config)

        let xAxis = chart.xAxis;

        setCommonAxisConfig(xAxis, config: json)
    }
    
    func setYAxis(_ config: NSDictionary) {
        let json = ChartUtils.toJson(config)

        if json["left"].exists() {
            let leftYAxis = barLineChart.leftAxis
            setCommonAxisConfig(leftYAxis, config: json["left"]);
            setYAxisConfig(leftYAxis, config: json["left"]);
        }


        if json["right"].exists() {
            let rightAxis = barLineChart.rightAxis
            setCommonAxisConfig(rightAxis, config: json["right"]);
            setYAxisConfig(rightAxis, config: json["right"]);
        }
    }

    func setYAxisConfig(_ axis: YAxis, config: JSON) {
        if config["spaceTop"].float != nil {
            axis.spaceTop = CGFloat(config["spaceTop"].floatValue)
        }

        if config["spaceBottom"].float != nil {
            axis.spaceBottom = CGFloat(config["spaceBottom"].floatValue)
        }
    }

    func setCommonAxisConfig(_ axis: AxisBase, config: JSON) {
        if config["enabled"].bool != nil {
            axis.enabled = config["enabled"].boolValue
        }

        if config["drawLabels"].bool != nil {
            axis.drawLabelsEnabled = config["drawLabels"].boolValue
        }

        if config["drawAxisLine"].bool != nil {
            axis.drawAxisLineEnabled = config["drawAxisLine"].boolValue
        }

        if config["drawGridLines"].bool != nil {
            axis.drawGridLinesEnabled = config["drawGridLines"].boolValue
        }

        if config["textColor"].int != nil {
            axis.labelTextColor = RCTConvert.uiColor(config["textColor"].intValue)
        }

        if config["textSize"].float != nil {
            axis.labelFont = axis.labelFont.withSize(CGFloat(config["textSize"].floatValue))
        }
    }
    
    func updateVisibleRange(_ config: NSDictionary) {
        let json = ChartUtils.toJson(config)

        let x = json["x"]
        if x["min"].double != nil {
            barLineChart.setVisibleXRangeMinimum(x["min"].doubleValue)
        }
        if x["max"].double != nil {
            barLineChart.setVisibleXRangeMaximum(x["max"].doubleValue)
        }

        let y = json["y"]
        if y["left"]["min"].double != nil {
            barLineChart.setVisibleYRangeMinimum(y["left"]["min"].doubleValue, axis: YAxis.AxisDependency.left)
        }
        if y["left"]["max"].double != nil {
            barLineChart.setVisibleYRangeMaximum(y["left"]["max"].doubleValue, axis: YAxis.AxisDependency.left)
        }

        if y["right"]["min"].double != nil {
            barLineChart.setVisibleYRangeMinimum(y["right"]["min"].doubleValue, axis: YAxis.AxisDependency.right)
        }
        if y["right"]["max"].double != nil {
            barLineChart.setVisibleYRangeMaximum(y["right"]["max"].doubleValue, axis: YAxis.AxisDependency.right)
        }
    }
    
    func setViewPortOffsets(_ config: NSDictionary) {
        let json = ChartUtils.toJson(config)

        let left = json["left"].double != nil ? CGFloat(json["left"].doubleValue) : 0
        let top = json["top"].double != nil ? CGFloat(json["top"].doubleValue) : 0
        let right = json["right"].double != nil ? CGFloat(json["right"].doubleValue) : 0
        let bottom = json["bottom"].double != nil ? CGFloat(json["bottom"].doubleValue) : 0

        barLineChart.setViewPortOffsets(left: left, top: top, right: right, bottom: bottom)
    }
    
    func onAfterDataSetChanged() {
        if let visibleRange = savedVisibleRange {
            updateVisibleRange(visibleRange)
        }
    }

    @objc public func chartValueSelected(_ chartView: ChartViewBase, entry: ChartDataEntry, highlight: Highlight) {
        if self.onSelect == nil {
            return
        } else {
            var dict = [AnyHashable: Any]()
            
            if entry.data != nil {
                dict["data"] = (entry.data as! JSON).dictionaryObject!
            }
            
            if entry is BarChartDataEntry {
                let barEntry = entry as! BarChartDataEntry;

                dict["x"] = barEntry.x
                
                if barEntry.yValues != nil {
                    dict["yValues"] = barEntry.yValues
                } else {
                    dict["y"] = barEntry.y
                }
            } else {
                dict["x"] = entry.x
                dict["y"] = entry.y
            }

            self.onSelect!(dict)
        }
    }

    @objc public func chartValueNothingSelected(_ chartView: ChartViewBase) {
        if self.onSelect == nil {
            return
        } else {
            self.onSelect!(nil)

        }
    }

    override open func didSetProps(_ changedProps: [String]!) {
        super.didSetProps(changedProps)
        chart.notifyDataSetChanged()
        onAfterDataSetChanged()
    }
}
