import Foundation
import UIKit
import Charts
import SwiftyJSON

@objcMembers
class BellaChartViewBase: UIView, ChartViewDelegate {
    open var onSelect: RCTBubblingEventBlock?

    open var onChange: RCTBubblingEventBlock?
    
    var savedVisibleRange: NSDictionary?

    var savedZoom: NSDictionary?
  
    var _onYaxisMinMaxChange: RCTBubblingEventBlock?

    var timer: Timer?

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
        if config["inverted"].bool != nil {
            axis.inverted = config["inverted"].boolValue
        }

        if config["spaceTop"].float != nil {
            axis.spaceTop = CGFloat(config["spaceTop"].floatValue)
        }

        if config["spaceBottom"].float != nil {
            axis.spaceBottom = CGFloat(config["spaceBottom"].floatValue)
        }

        // zero line
        if config["zeroLine"].exists() {
            let zeroLineConfig = config["zeroLine"]

            if zeroLineConfig["enabled"].bool != nil {
                axis.drawZeroLineEnabled = zeroLineConfig["enabled"].boolValue
            }


            if zeroLineConfig["lineWidth"].float != nil {
                axis.zeroLineWidth = CGFloat(zeroLineConfig["lineWidth"].floatValue);
            }

            if zeroLineConfig["lineColor"].int != nil {
                axis.zeroLineColor = RCTConvert.uiColor(zeroLineConfig["lineColor"].intValue);
            }
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

        // style
//        if let font = FontUtils.getFont(config) {
//            axis.labelFont  = font
//        }

        if config["textColor"].int != nil {
            axis.labelTextColor = RCTConvert.uiColor(config["textColor"].intValue)
        }

        if config["textSize"].float != nil {
            axis.labelFont = axis.labelFont.withSize(CGFloat(config["textSize"].floatValue))
        }

        if config["labelCount"].int != nil {
            var labelCountForce = false
            if config["labelCountForce"].bool != nil {
                labelCountForce = config["labelCountForce"].boolValue
            }
            axis.setLabelCount(config["labelCount"].intValue, force: labelCountForce)
        }

        if config["centerAxisLabels"].bool != nil {
            axis.centerAxisLabelsEnabled = config["centerAxisLabels"].boolValue
        }
    }

    func setOnYaxisMinMaxChange(_ callback: RCTBubblingEventBlock?) {
      self._onYaxisMinMaxChange = callback;
      self.timer?.invalidate();
      if callback == nil {
        return;
      }
      
      var lastMin: Double = 0;
      var lastMax: Double = 0;
      
      let axis = (self.chart as! BarLineChartViewBase).getAxis(.right);
        
      if #available(iOS 10.0, *) {
        // Interval for 16ms
        self.timer = Timer.scheduledTimer(withTimeInterval: 1/60, repeats: true) { timer in
          let minimum = axis.axisMinimum;
          let maximum = axis.axisMaximum;
          if lastMin != minimum || lastMax != maximum {
            print("Update the view", minimum, lastMin, maximum, lastMax)
            
            guard let callback = self._onYaxisMinMaxChange else {
              return;
            }
            callback([
              "minY": minimum,
              "maxY": maximum,
            ]);
          }
          lastMin = minimum;
          lastMax = maximum;
        }
      } else {
        // Fallback on earlier versions
      }
    }

    func setMaxHighlightDistance(_  maxHighlightDistance: CGFloat) {
        barLineChart.maxHighlightDistance = maxHighlightDistance;
    }

    func setDrawGridBackground(_  enabled: Bool) {
        barLineChart.drawGridBackgroundEnabled = enabled;
    }

    func setGridBackgroundColor(_ color: Int) {
        barLineChart.gridBackgroundColor = RCTConvert.uiColor(color);
    }

    func setDrawBorders(_ enabled: Bool) {
        barLineChart.drawBordersEnabled = enabled;
    }

    func setBorderColor(_ color: Int) {
        barLineChart.borderColor = RCTConvert.uiColor(color);
    }

    func setBorderWidth(_ width: CGFloat) {
        barLineChart.borderLineWidth = width;
    }

    func setMaxVisibleValueCount(_ count: NSInteger) {
        barLineChart.maxVisibleCount = count;
    }
    
    func setVisibleRange(_ config: NSDictionary) {
        // delay visibleRange handling until chart data is set
        savedVisibleRange = config
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
    
    func setAutoScaleMinMaxEnabled(_  enabled: Bool) {
        barLineChart.autoScaleMinMaxEnabled = enabled
    }

    func setKeepPositionOnRotation(_  enabled: Bool) {
        barLineChart.keepPositionOnRotation = enabled
    }

    func setScaleEnabled(_  enabled: Bool) {
        barLineChart.setScaleEnabled(enabled)
    }

    func setDragEnabled(_  enabled: Bool) {
        barLineChart.dragEnabled = enabled
    }

    func setScaleXEnabled(_  enabled: Bool) {
        barLineChart.scaleXEnabled = enabled
    }

    func setScaleYEnabled(_  enabled: Bool) {
        barLineChart.scaleYEnabled = enabled
    }

    func setPinchZoom(_  enabled: Bool) {
        barLineChart.pinchZoomEnabled = enabled
    }

    func setHighlightPerDragEnabled(_  enabled: Bool) {
        barLineChart.highlightPerDragEnabled = enabled
    }

    func setDoubleTapToZoomEnabled(_  enabled: Bool) {
        barLineChart.doubleTapToZoomEnabled = enabled
    }

    func setZoom(_ config: NSDictionary) {
        self.savedZoom = config
    }

    func updateZoom(_ config: NSDictionary) {
        let json = ChartUtils.toJson(config)

        if json["scaleX"].float != nil && json["scaleY"].float != nil && json["xValue"].double != nil && json["yValue"].double != nil {
            var axisDependency = YAxis.AxisDependency.left

            if json["axisDependency"].string != nil && json["axisDependency"].stringValue == "RIGHT" {
                axisDependency = YAxis.AxisDependency.right
            }
            
            barLineChart.zoom(scaleX: CGFloat(json["scaleX"].floatValue),
                    scaleY: CGFloat(json["scaleY"].floatValue),
                    xValue: json["xValue"].doubleValue,
                    yValue: json["yValue"].doubleValue,
                    axis: axisDependency)
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

    func setExtraOffsets(_ config: NSDictionary) {
        let json = ChartUtils.toJson(config)
    
        let left = json["left"].double != nil ? CGFloat(json["left"].doubleValue) : 0
        let top = json["top"].double != nil ? CGFloat(json["top"].doubleValue) : 0
        let right = json["right"].double != nil ? CGFloat(json["right"].doubleValue) : 0
        let bottom = json["bottom"].double != nil ? CGFloat(json["bottom"].doubleValue) : 0
    
        barLineChart.setExtraOffsets(left: left, top: top, right: right, bottom: bottom)
    }
    
    func onAfterDataSetChanged() {
        // clear zoom after applied, but keep visibleRange
        if let visibleRange = savedVisibleRange {
            updateVisibleRange(visibleRange)
        }

        if let zoom = savedZoom {
            updateZoom(zoom)
            savedZoom = nil
        }
    }

    func setDataAndLockIndex(_ data: NSDictionary) {
        let json = ChartUtils.toJson(data)

        let axis = barLineChart.getAxis(YAxis.AxisDependency.left).enabled ? YAxis.AxisDependency.left : YAxis.AxisDependency.right

        let contentRect = barLineChart.contentRect

        let originCenterValue = barLineChart.valueForTouchPoint(point: CGPoint(x: contentRect.midX, y: contentRect.midY), axis: axis)

        let originalVisibleXRange = barLineChart.visibleXRange
        let originalVisibleYRange = getVisibleYRange(axis)

        barLineChart.fitScreen()
        
        barLineChart.data = dataExtract.extract(json)
        barLineChart.notifyDataSetChanged()
        
        let newVisibleXRange = barLineChart.visibleXRange
        let newVisibleYRange = getVisibleYRange(axis)

        let scaleX = newVisibleXRange / originalVisibleXRange
        let scaleY = newVisibleYRange / originalVisibleYRange

        barLineChart.zoom(scaleX: CGFloat(scaleX), scaleY: CGFloat(scaleY), xValue: Double(originCenterValue.x), yValue: Double(originCenterValue.y), axis: axis)
        
        if let config = savedVisibleRange {
            updateVisibleRange(config)
        }
        barLineChart.notifyDataSetChanged()        
    }

    func getVisibleYRange(_ axis: YAxis.AxisDependency) -> CGFloat {
        let contentRect = barLineChart.contentRect

        return barLineChart.valueForTouchPoint(point: CGPoint(x: contentRect.maxX, y:contentRect.minY), axis: axis).y - barLineChart.valueForTouchPoint(point: CGPoint(x: contentRect.minX, y:contentRect.maxY), axis: axis).y
    }

    func setMarker(_ config: NSDictionary) {
//        let json = ChartUtils.toJson(config)
//
//        if json["enabled"].exists() && !json["enabled"].boolValue {
//            chart.marker = nil
//            return
//        }
//
//        var markerFont = UIFont.systemFont(ofSize: 12.0)
//
//        if json["textSize"].float != nil {
//            markerFont = markerFont.withSize(CGFloat(json["textSize"].floatValue))
//        }
//        switch (json["markerType"].string) {
//        case "circle":
//            let marker = CircleMarker(
//                color: RCTConvert.uiColor(json["markerColor"].intValue),
//                strokeColor: RCTConvert.uiColor(json["markerStrokeColor"].intValue),
//                size: CGSize(
//                    width: json["markerSize"].intValue,
//                    height: json["markerSize"].intValue
//                ),
//                strokeSize: json["markerStrokeSize"].intValue
//            )
//            chart.marker = marker
//            marker.chartView = chart
//
//        default:
//            let marker = BalloonMarker(
//                color: RCTConvert.uiColor(json["markerColor"].intValue),
//                font: markerFont,
//                textColor: RCTConvert.uiColor(json["textColor"].intValue),
//                textAlign: RCTConvert.nsTextAlignment(json["textAlign"].stringValue)
//            )
//            chart.marker = marker
//            marker.chartView = chart
//        }
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
