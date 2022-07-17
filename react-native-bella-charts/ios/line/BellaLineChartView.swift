import Charts
import SwiftyJSON

class BellaLineChartView: BellaChartViewBase {
    let _chart: LineChartView;
    let _dataExtract : LineDataExtract;
    
    override var chart: LineChartView {
        return _chart
    }
    
    fileprivate var barLineChart: BarLineChartViewBase {
        get {
            return chart
        }
    }

    override var dataExtract: DataExtract {
        return _dataExtract
    }
    
    override init(frame: CoreGraphics.CGRect) {
        
        self._chart = LineChartView(frame: frame)
        self._dataExtract = LineDataExtract()
        
        super.init(frame: frame);
        
        self._chart.delegate = self
        self.addSubview(_chart);
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
