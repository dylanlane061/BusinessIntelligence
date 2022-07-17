import Foundation
import SwiftyJSON
import Charts

class ChartUtils {
    static func parseColors(_ array: [JSON]) -> [NSUIColor] {
        return array.map {
            return RCTConvert.uiColor($0.intValue);
        }
    }
    
    static func toJson(_ dict: NSDictionary) -> JSON {
        let json = try! JSONSerialization.data(withJSONObject: dict);
        
        return JSON.init(parseJSON: NSString(data: json, encoding: String.Encoding.utf8.rawValue)! as String);
    }
}
