module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
  ],
};


// module.exports = function (api) {
//   const plugins = ['transform-remove-console', 'react-native-reanimated/plugin'];

//   return {
//     presets: ['module:metro-react-native-babel-preset'],
//     plugins: api.env('production') ? plugins : [],
//   };
// };

