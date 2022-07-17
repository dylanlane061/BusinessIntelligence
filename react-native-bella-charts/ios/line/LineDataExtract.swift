import Foundation
import SwiftyJSON
import Charts
import UIKit

class LineDataExtract : DataExtract {
    override func createData() -> ChartData {
        return LineChartData();
    }

    override func createDataSet(_ entries: [ChartDataEntry]?, label: String?) -> IChartDataSet {
        return LineChartDataSet(entries: entries, label: label)
    }

    override func dataSetConfig(_ dataSet: IChartDataSet, config: JSON) {
        let lineDataSet = dataSet as! LineChartDataSet;
        
        if config["color"].int != nil {
            lineDataSet.setColor(RCTConvert.uiColor(config["color"].intValue))
        }

        if config["colors"].array != nil {
            lineDataSet.colors = ChartUtils.parseColors(config["colors"].arrayValue)
        }

        if config["drawValues"].bool != nil {
            lineDataSet.drawValuesEnabled = config["drawValues"].boolValue;
        }

        if config["lineWidth"].float != nil {
            lineDataSet.lineWidth = CGFloat(config["lineWidth"].floatValue);
        }

       if config["drawCircles"].bool != nil {
           lineDataSet.drawCirclesEnabled = config["drawCircles"].boolValue
       }
        
        if config["drawHighlightIndicators"].bool != nil {
            lineDataSet.setDrawHighlightIndicators(config["drawHighlightIndicators"].boolValue);
        }

        if config["drawVerticalHighlightIndicator"].bool != nil {
            lineDataSet.drawVerticalHighlightIndicatorEnabled = config["drawVerticalHighlightIndicator"].boolValue;
        }

        if config["drawHorizontalHighlightIndicator"].bool != nil {
            lineDataSet.drawHorizontalHighlightIndicatorEnabled = config["drawHorizontalHighlightIndicator"].boolValue;
        }

        if config["highlightLineWidth"].float != nil {
            lineDataSet.highlightLineWidth = CGFloat(config["highlightLineWidth"].floatValue);
        }
        
        if config["highlightColor"].int != nil {
            lineDataSet.highlightColor = RCTConvert.uiColor(config["highlightColor"].intValue);
        }
        
        if config["formatAsPrice"].bool != nil {
            lineDataSet.valueFormatter = PriceFormatter();
        }
    }

    override func createEntry(_ values: [JSON], index: Int) -> ChartDataEntry {
        var entry: ChartDataEntry;

        var x = Double(index);
        let value = values[index];

        if value.dictionary != nil {
            let dict = value;
            
            if dict["x"].double != nil {
                x = Double((dict["x"].doubleValue));
            }

            if dict["y"].number == nil {
                fatalError("invalid data " + values.description);
            }
     
            entry = ChartDataEntry(x: x, y: dict["y"].doubleValue, data: dict as AnyObject?);
            
        } else if value.double != nil {
            entry = ChartDataEntry(x: x, y: value.doubleValue);
        } else {
            fatalError("invalid data " + values.description);
        }

        return entry;
    }
}
