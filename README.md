# BI

Displays a list of companies, allowing a user to drill down into each and see up to 6 months of revenue data. Graph is interactable and can be filtered.

Each business can be "watched" which will add it a watchlist at the top of the home screen. From there the 6 month company revenue totals can be compared.

Also supports dark mode!

The iOS Graph implemention is setup as its own RN lib in the folder [react-native-bella-charts](https://github.com/dylanlane061/BusinessIntelligence/tree/master/react-native-bella-charts). It's symlinked to the project so if you have any trouble with it try linking it manually.

![](Demo_Light.gif) ![](Demo_Dark.gif)

## Setup

Clone the repo:

```
git clone https://github.com/dylanlane061/BusinessIntelligence
```

Install dependencies:

```
npm i
```

Note. Any inconsistencies in the intended envioronment will be found here by the solidarity check. These aren't required but snapshot of the system where its known to work.

Install pods within ios folder:

```
pod install
```

Run the app:

```
npx react-native run-ios
```

If you face any issues with the iOS or Xcode setup check out the [setup docs](https://reactnative.dev/docs/environment-setup#xcode) provided by the React Native team.
