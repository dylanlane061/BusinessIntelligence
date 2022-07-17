import Charts
import SwiftyJSON

class BellaBarChartView: BellaChartViewBase {
    let _chart: BarChartView
    let _dataExtract : BarDataExtract
    
    override var chart: BarChartView {
        return _chart
    }
    
    fileprivate var barChart: BarChartView {
        get {
            return chart
        }
    }

    override var dataExtract: DataExtract {
        return _dataExtract
    }
    
    override init(frame: CoreGraphics.CGRect) {
        self._chart = BarChartView(frame: frame)
        self._dataExtract = BarDataExtract()

        super.init(frame: frame)

        self._chart.delegate = self
        self.addSubview(_chart)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setDrawValueAboveBar(_ enabled: Bool) {
        barChart.drawValueAboveBarEnabled = enabled
    }
}
