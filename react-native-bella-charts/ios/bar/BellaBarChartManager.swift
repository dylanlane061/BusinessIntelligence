import UIKit

@objc(BellaBarChartManager)
@objcMembers
open class BellaBarChartManager: RCTViewManager {
  var _bridge: RCTBridge? {get{return self.bridge}}
  
  override open func view() -> UIView! {
    let ins = BellaBarChartView()
    return ins;
  }

  override public static func requiresMainQueueSetup() -> Bool {
    return true;
  }
}
