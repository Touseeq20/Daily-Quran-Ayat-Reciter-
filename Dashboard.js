// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';

// // const Dashboard = () => {
// //   const navigation = useNavigation();

// //   return (
// //     <View style={styles.container}>
// //       {/* Header with centered title and right-aligned search */}
// //       <View style={styles.header}>
// //         <View style={styles.headerSpacer} /> {/* left spacer */}
// //         <Text style={styles.title}>Dashboard</Text>
// //         <TouchableOpacity style={styles.searchButton}>
// //           <Text style={styles.searchIcon}>🔍</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Buttons shifted up */}
// //       <View style={styles.buttonContainer}>
// //               <TouchableOpacity
// //                   style={styles.button}
// //                   onPress={() => navigation.navigate('showAyat')}
// //               >
// //                   <Text style={styles.buttonText}>DAY EMOTION AYAT</Text>
// //               </TouchableOpacity>
        
// //         <TouchableOpacity style={styles.button}>
// //           <Text style={styles.buttonText}>SETTINGS</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8EDF9',
// //     paddingTop: 50,
// //     paddingHorizontal: 20,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 40,
// //   },
// //   headerSpacer: {
// //     width: 24, // same width as the icon for symmetry
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#000',
// //     textAlign: 'center',
// //     flex: 1,
// //   },
// //   searchButton: {
// //     padding: 4,
// //   },
// //   searchIcon: {
// //     fontSize: 22,
// //   },
// //   buttonContainer: {
// //     flex: 1,
// //     justifyContent: 'flex-start', // shift buttons up
// //     alignItems: 'center',
// //     paddingTop: 40, // adjust to control vertical position
// //   },
// //   button: {
// //     backgroundColor: '#C5A4F7',
// //     paddingVertical: 14,
// //     paddingHorizontal: 40,
// //     borderRadius: 30,
// //     elevation: 5,
// //     marginVertical: 10,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default Dashboard;

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const Dashboard = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       {/* Header with centered title and right-aligned search */}
//       <View style={styles.header}>
//         <View style={styles.headerSpacer} /> {/* left spacer */}
//         <Text style={styles.title}>Dashboard</Text>
//         <TouchableOpacity style={styles.searchButton}>
//           <Text style={styles.searchIcon}>🔍</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Buttons shifted up */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate('ShowAyat')} // Updated to match stack screen name
//         >
//           <Text style={styles.buttonText}>DAY EMOTION AYAT</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>SETTINGS</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8EDF9',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 40,
//   },
//   headerSpacer: {
//     width: 24, // same width as the icon for symmetry
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000',
//     textAlign: 'center',
//     flex: 1,
//   },
//   searchButton: {
//     padding: 4,
//   },
//   searchIcon: {
//     fontSize: 22,
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: 'flex-start', // shift buttons up
//     alignItems: 'center',
//     paddingTop: 40, // adjust to control vertical position
//   },
//   button: {
//     backgroundColor: '#C5A4F7',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     elevation: 5,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Dashboard;


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.title}>Dashboard</Text>

        {/* Search button (wrapped in <Text>) */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('Notification')} // Navigate to Notification screen
        >
          <Text style={styles.searchIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ShowAyat')}
        >
          <Text style={styles.buttonText}>DAILY QURAN AYAT</Text>
        </TouchableOpacity>


        
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Keyword')}
          >
            <Text style={styles.buttonText}>keyword</Text>
          </TouchableOpacity> */}

         {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>SETTINGS</Text>
        </TouchableOpacity>  */}


        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AppSettings')}
        >
          <Text style={styles.buttonText}>APP SETTINGS</Text>
        </TouchableOpacity>


        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Language')}
        >
          <Text style={styles.buttonText}>LANGUAGES</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.buttonText}>HISTORY</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.buttonText}>FAVORITES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Playlist')}
        >
          <Text style={styles.buttonText}>PLAYLIST</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EDF9',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  headerSpacer: {
    width: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  searchButton: {
    padding: 6,
  },
  searchIcon: {
    fontSize: 24,
    color: '#000',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  button: {
    backgroundColor: '#C5A4F7',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
