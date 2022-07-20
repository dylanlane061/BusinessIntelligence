# BI

Displays a list of companies, allowing a user to drill down into each and see up to 6 months of revenue data. Graph is interactable and can be filtered.

Each business can be "watched" which will add it a watchlist at the top of the home screen. From there the 6 month company revenue totals can be compared.

Also supports dark mode!

Sadly, no Android support for the graphs yet.

![](Demo.gif)

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
