import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnglishLearning from '../screens/AppScreen/KidScreen/Learning/English/EnglishLearning';
import Rhymes from '../screens/AppScreen/KidScreen/Learning/English/Rhymes';
import Story from '../screens/AppScreen/KidScreen/Learning/English/Story';
import Alphabet from '../screens/AppScreen/KidScreen/Learning/English/Alphabet';
import Maths from '../screens/AppScreen/KidScreen/Learning/English/Maths';
import General from '../screens/AppScreen/KidScreen/Learning/English/General';
import HindiLearning from '../screens/AppScreen/KidScreen/Learning/Hindi/HindiLearning';
import MarathiLearning from '../screens/AppScreen/KidScreen/Learning/Marathi/MarathiLearning';

import MarathiRhymes from '../screens/AppScreen/KidScreen/Learning/Marathi/Rhymes';
import MarathiStory from '../screens/AppScreen/KidScreen/Learning/Marathi/Story';
import MarathiAlphabet from '../screens/AppScreen/KidScreen/Learning/Marathi/Alphabet';
import MarathiMaths from '../screens/AppScreen/KidScreen/Learning/Marathi/Maths';
import MarathiGeneral from '../screens/AppScreen/KidScreen/Learning/Marathi/General';

import HindiRhymes from '../screens/AppScreen/KidScreen/Learning/Hindi/Rhymes';
import HindiStory from '../screens/AppScreen/KidScreen/Learning/Hindi/Story';
import HindiAlphabet from '../screens/AppScreen/KidScreen/Learning/Hindi/Alphabet';
import HindiMaths from '../screens/AppScreen/KidScreen/Learning/Hindi/Maths';
import HindiGeneral from '../screens/AppScreen/KidScreen/Learning/Hindi/General';
import VideoScreen from '../screens/AppScreen/KidScreen/Learning/English/VideoScreen';
import VideoScreenGeneral from '../screens/AppScreen/KidScreen/Learning/English/VideoScreenGeneral';
import VideoScreenAlphabet from '../screens/AppScreen/KidScreen/Learning/English/VideoScreenAlphabet';
import VideoScreenMaths from '../screens/AppScreen/KidScreen/Learning/English/VideoScreenMaths';
import VideoScreenMarathiRhyme from '../screens/AppScreen/KidScreen/Learning/Marathi/VideoScreenMarathiRhyme';
import VideoScreenMarathiRhymeStory from '../screens/AppScreen/KidScreen/Learning/Marathi/VideoScreenMarathiRhymeStory';
import VideoScreenMarathiMaths from '../screens/AppScreen/KidScreen/Learning/Marathi/VideoScreenMarathiMaths';
import VideoScreenMarathiGeneral from '../screens/AppScreen/KidScreen/Learning/Marathi/VideoScreenMarathiGeneral';
import VideoScreenHindiGeneral from '../screens/AppScreen/KidScreen/Learning/Hindi/VideoScreenHindiGeneral';
import VideoScreenHindiMaths from '../screens/AppScreen/KidScreen/Learning/Hindi/VideoScreenHindiMaths';
import VideoScreenHindiRhymes from '../screens/AppScreen/KidScreen/Learning/Hindi/VideoScreenHindiRhymes';
import VideoScreenHindiStory from '../screens/AppScreen/KidScreen/Learning/Hindi/VideoScreenHindiStory';

const Stack = createNativeStackNavigator();

const EnglishLearningStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EnglishLearning"
        component={EnglishLearning}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnglishRhymes"
        component={Rhymes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnglishStory"
        component={Story}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnglishAlphabet"
        component={Alphabet}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnglishMaths"
        component={Maths}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnglishGeneral"
        component={General}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnglishVideoScreen"
        component={VideoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnglishGeneralVideoScreen"
        component={VideoScreenGeneral}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnglishAlphabetVideoScreen"
        component={VideoScreenAlphabet}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnglishMathsVideoScreen"
        component={VideoScreenMaths}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const MarathiLearningStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MarathiLearning"
        component={MarathiLearning}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MarathiRhymes"
        component={MarathiRhymes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MarathiStory"
        component={MarathiStory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MarathiAlphabet"
        component={MarathiAlphabet}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MarathiMaths"
        component={MarathiMaths}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MarathiGeneral"
        component={MarathiGeneral}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoScreenMarathiRhyme"
        component={VideoScreenMarathiRhyme}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoScreenMarathiRhymeStory"
        component={VideoScreenMarathiRhymeStory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoScreenMarathiMaths"
        component={VideoScreenMarathiMaths}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoScreenMarathiGeneral"
        component={VideoScreenMarathiGeneral}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const HindiLearningStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HindiLearning"
        component={HindiLearning}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HindiRhymes"
        component={HindiRhymes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HindiStory"
        component={HindiStory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HindiAlphabet"
        component={HindiAlphabet}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HindiMaths"
        component={HindiMaths}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HindiGeneral"
        component={HindiGeneral}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoScreenHindiGeneral"
        component={VideoScreenHindiGeneral}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoScreenHindiMaths"
        component={VideoScreenHindiMaths}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoScreenHindiRhymes"
        component={VideoScreenHindiRhymes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoScreenHindiStory"
        component={VideoScreenHindiStory}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}


const KidsEducationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EnglishLearningStack"
        component={EnglishLearningStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HindiLearningStack"
        component={HindiLearningStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MarathiLearningStack"
        component={MarathiLearningStack}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="VideoScreenKid"
        component={VideoScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  )
}

export default KidsEducationStack