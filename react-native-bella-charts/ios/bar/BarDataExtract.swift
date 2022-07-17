import Foundation

import SwiftyJSON
import Charts

class BarDataExtract : DataExtract {
    override open func createData() -> ChartData {
        return BarChartData();
    }
    
    override open func dataConfig(_ data: ChartData, config: JSON) {
        let barData = data as! BarChartData
      
        if config["barWidth"].double != nil {
            barData.barWidth = config["barWidth"].doubleValue
        }
    }
    
    override open func createDataSet(_ entries: [ChartDataEntry]?, label: String?) -> IChartDataSet {
        return BarChartDataSet(entries: entries, label: label)
    }
    
    override open func dataSetConfig(_ dataSet: IChartDataSet, config: JSON) {
        let barDataSet = dataSet as! BarChartDataSet
                
        if config["color"].int != nil {
            barDataSet.setColor(RCTConvert.uiColor(config["color"].intValue))
        }

        if config["colors"].array != nil {
            barDataSet.colors = ChartUtils.parseColors(config["colors"].arrayValue)
        }

        if config["valueTextSize"].float != nil {
            dataSet.valueFont = dataSet.valueFont.withSize(CGFloat(config["valueTextSize"].floatValue))
        }
        
        if config["valueTextColor"].int != nil {
            dataSet.valueTextColor = RCTConvert.uiColor(config["valueTextColor"].intValue)
        }

        if config["drawValues"].bool != nil {
            barDataSet.drawValuesEnabled = config["drawValues"].boolValue;
        }
        
        if config["highlightColor"].int != nil {
            barDataSet.highlightColor = RCTConvert.uiColor(config["highlightColor"].intValue);
        }
        
        if config["formatAsPrice"].bool != nil {
            barDataSet.valueFormatter = PriceFormatter();
        }
    }
    
    override func createEntry(_ values: [JSON], index: Int) -> BarChartDataEntry {
        var entry: BarChartDataEntry;
        
        var x = Double(index);
        let value = values[index];
        
        if value.dictionary != nil {
            let dict = value;
            
            if dict["x"].double != nil {
                x = Double(dict["x"].doubleValue);
            }
            
            if dict["y"].array != nil {
                entry = BarChartDataEntry(x: x, yValues: (dict["y"].arrayValue.map({ y in y.doubleValue })));
            } else if dict["y"].number != nil {
                entry = BarChartDataEntry(x: x, y: dict["y"].doubleValue);
            } else {
                fatalError("invalid data " + values.description);
            }
            
            entry.data = dict as AnyObject?;
        } else if value.array != nil {
            entry = BarChartDataEntry(x: x, yValues: (value.arrayValue.map({ y in y.doubleValue })));
        } else if value.double != nil {
            entry = BarChartDataEntry(x: x, y: value.doubleValue);
        } else {
            fatalError("invalid data " + values.description);
        }
        
        return entry;
    }
}
