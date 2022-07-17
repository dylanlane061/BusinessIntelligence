#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(BellaBarChartManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(animation, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(chartBackgroundColor, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(chartDescription, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(data, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(legend, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onSelect, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(viewPortOffsets, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(xAxis, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(yAxis, NSDictionary)
@end
