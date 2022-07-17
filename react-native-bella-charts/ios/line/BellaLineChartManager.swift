import UIKit

@objc(BellaLineChartManager)
@objcMembers
open class BellaLineChartManager: RCTViewManager {
  var _bridge: RCTBridge? {get{return self.bridge}}
  
  override open func view() -> UIView! {
    let ins = BellaLineChartView()
    return ins;
  }

  override public static func requiresMainQueueSetup() -> Bool {
    return true;
  }
}
